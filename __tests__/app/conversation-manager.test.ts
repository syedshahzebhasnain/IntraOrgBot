import Groq from 'groq-sdk';
import {
  createConversationManager,
  ConversationMangerDeps,
} from '../../src/app/conversation-manager';

// Mocking the external dependencies
jest.mock('groq-sdk', () => ({
  chat: {
    completions: {
      create: jest.fn(),
    },
  },
}));

describe('ConversationManager', () => {
  const mockGroq = {
    chat: {
      completions: {
        create: jest.fn(),
      },
    },
  };

  const mockFileHandler = {
    readFile: jest.fn(),
  };

  const deps: ConversationMangerDeps = {
    clients: {
      groq: mockGroq as unknown as Groq,
    },
    utils: {
      fileHandler: mockFileHandler,
    },
  };

  beforeEach(() => {
    mockGroq.chat.completions.create.mockReset();
    mockFileHandler.readFile.mockReset();
  });

  it('should handle user input correctly', async () => {
    const manager = createConversationManager(deps);
    const question = 'How to improve team productivity?';
    const mockFileContent = '{"team": "Engineering", "contact": "U123456"}';
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'Reach out to <@U123456> for more details.',
          },
        },
      ],
    };

    mockFileHandler.readFile.mockResolvedValue(mockFileContent);
    mockGroq.chat.completions.create.mockResolvedValue(mockResponse);

    const response = await manager.handleUserInput(question);

    expect(response).toContain('<@U123456>');
    expect(mockFileHandler.readFile).toHaveBeenCalledWith(
      'src/config/data.json'
    );
    expect(mockGroq.chat.completions.create).toHaveBeenCalledWith({
      messages: [
        {
          role: 'system',
          content: expect.any(String),
        },
        {
          role: 'user',
          content: question,
        },
      ],
      model: 'llama3-8b-8192',
    });
  });
});

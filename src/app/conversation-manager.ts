import Groq from 'groq-sdk';
import {FileHandler} from '../utils/fileHandler';

export interface ConversationManger {
  handleUserInput(question: string): Promise<string>;
}

export interface ConversationMangerDeps {
  clients: {
    groq: Groq;
  };
  utils: {
    fileHandler: FileHandler;
  };
}

export function createConversationManager(
  deps: ConversationMangerDeps
): ConversationManger {
  const {groq} = deps.clients;
  const {fileHandler} = deps.utils;
  return {
    async handleUserInput(question: string): Promise<string> {
      let content =
        'You are a bot that supposed to help people find out the right people for the job. Provide their contact details. Encourage to reach out. This is the companys structure in json object';
      const file = fileHandler.readFile('src/config/data.json');
      content = content + file;
      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: 'system',
            content: content,
          },
          {role: 'user', content: question},
        ],
        model: 'llama3-8b-8192',
      });
      return (
        convertSlackIdToClickable(
          chatCompletion.choices[0].message.content || ''
        ) || 'No Response at the moment'
      );
    },
  };
}

function convertSlackIdToClickable(text: string): string {
  // Regular expression to match Slack user IDs (format: U...)
  const slackIdRegex = /U[A-Z0-9]+/g;

  // Replace all occurrences of Slack IDs with clickable links
  const convertedText = text.replace(slackIdRegex, match => {
    const slackId = match;
    return `<a href="https://your_slack_workspace.slack.com/team/${slackId}">${slackId}</a>`;
  });

  return convertedText;
}

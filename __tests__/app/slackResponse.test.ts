import {createSlackResponse} from '../../src/app/slackResponse';

describe('SlackResponse', () => {
  it('should return "Hello!" when helloResponse is called', async () => {
    const slackRespone = createSlackResponse();
    const result = await slackRespone.helloResponse();
    expect(result).toBe('Hello!');
  });
});

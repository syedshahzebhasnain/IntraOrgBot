export interface SlackResponse {
  helloResponse(): Promise<string>;
}

const response: SlackResponse = {
  async helloResponse(): Promise<string> {
    return 'Hello!';
  },
};

export default response;

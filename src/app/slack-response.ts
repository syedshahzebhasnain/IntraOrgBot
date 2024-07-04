export interface SlackResponse {
  helloResponse(): Promise<string>;
}

export function createSlackResponse(): SlackResponse {
  return {
    async helloResponse(): Promise<string> {
      return 'Hello!';
    },
  };
}

export interface SlackConfig {
  signingSecret?: string;
  token?: string;
  appToken?: string;
}

export interface GroqConfig {
  apiKey: string;
}

export interface Config {
  slackConfig: SlackConfig;
  defaultPort: number;
  groqConfig: GroqConfig;
}

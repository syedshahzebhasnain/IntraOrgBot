import {App} from '@slack/bolt';
import {SlackResponse} from '../app/slackResponse';

export interface SlackCommandsDeps {
  slackApp: App;
  app: {
    slackResponse: SlackResponse;
  };
}

export function registerSlackCommands(deps: SlackCommandsDeps) {
  const {slackApp, app} = deps;

  slackApp.command('/hello', async ({ack, say}) => {
    const response = await app.slackResponse.helloResponse();
    await ack();
    await say(response);
  });
}

import {App, LogLevel} from '@slack/bolt';
import {SlackCommandsDeps, registerSlackCommands} from './slack/slackCommands';
import slackResponse from './app/slackResponse';
import loadConfig from './config/load';

const config = loadConfig();
const app = new App({
  token: config.slackConfig.token,
  signingSecret: config.slackConfig.signingSecret,
  appToken: config.slackConfig.appToken,
  logLevel: LogLevel.DEBUG,
  socketMode: true,
});

app.error((error: Error) => {
  console.error('Error occurred:', error);
  return Promise.resolve();
});

// Dependencies object
const deps: SlackCommandsDeps = {
  slackApp: app,
  app: {
    slackResponse: slackResponse,
  },
};

//Register bot commands
registerSlackCommands(deps);

export {app};

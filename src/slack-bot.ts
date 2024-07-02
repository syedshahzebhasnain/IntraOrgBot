import {App, LogLevel} from '@slack/bolt';
import {SlackCommandsDeps, registerSlackCommands} from './slack/slackCommands';
import loadConfig from './config/load';
import {createSlackResponse} from './app/slackResponse';

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
    slackResponse: createSlackResponse(),
  },
};

//Register bot commands
registerSlackCommands(deps);

export {app};

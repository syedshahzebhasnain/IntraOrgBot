import {App, LogLevel} from '@slack/bolt';
import {registerSlackCommands} from './slack/commands';
import loadConfig from './config/load';
import {createSlackResponse} from './app/slack-response';
import Groq from 'groq-sdk';
import {registerSlackEvents} from './slack/events';
import {createConversationManager} from './app/conversation-manager';
import {createFileHandler} from './utils/file-handler';

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

const groq = new Groq({apiKey: config.groqConfig.apiKey});

const fileHandler = createFileHandler();

const deps = {
  slackApp: app,
  app: {
    slackResponse: createSlackResponse(),
    conversationManager: createConversationManager({
      clients: {
        groq,
      },
      utils: {fileHandler: fileHandler},
    }),
  },
  clients: {
    groqAI: groq,
  },
};
//Register Slack Interactions
registerSlackCommands(deps);
registerSlackEvents(deps);

export {app};

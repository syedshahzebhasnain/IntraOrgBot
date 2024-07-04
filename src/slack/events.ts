import {App} from '@slack/bolt';
import {ConversationManger} from '../app/conversation-manager';

export interface SlackEventsDeps {
  slackApp: App;
  app: {
    conversationManager: ConversationManger;
  };
}

export function registerSlackEvents(deps: SlackEventsDeps) {
  const {slackApp, app} = deps;

  slackApp.event('app_mention', async ({event, say}) => {
    try {
      console.log('Received app_mention event');
      const messageText = event.text.replace(/<@[^>]+>/, '').trim();
      await say(`Hello, <@${event.user}>! How can I help you?`);
      const response =
        await app.conversationManager.handleUserInput(messageText);
      say(response);
    } catch (error) {
      console.error(error);
    }
  });
}

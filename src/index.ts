import {app} from './slack-bot';
import loadConfig from './config/load';

// Example usage: Assuming NODE_ENV is set to 'dev'
const config = loadConfig();

console.log(config.slackConfig);
(async () => {
  await app.start(process.env.PORT || 3000);
  console.log('⚡️⚡️⚡️⚡️ Intra Org Bot is running! ⚡️⚡️⚡️⚡️');
})();

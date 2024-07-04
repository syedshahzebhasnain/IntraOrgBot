import path = require('path');
import dotenv = require('dotenv');
import {Config} from './types';

// Load environment variables from .env file
dotenv.config();

export default function loadConfig(env = 'local'): Config {
  let configFileName = 'default';

  // Use NODE_ENV environment variable if provided
  if (process.env.NODE_ENV) {
    configFileName = process.env.NODE_ENV;
  } else {
    // Fallback to the provided 'env' argument
    configFileName = env;
  }

  const selectConfig = require(
    path.join(__dirname, `${configFileName}.json`)
  ) as Config;

  return {
    ...selectConfig,
    slackConfig: {
      signingSecret:
        process.env.SLACK_SIGNING_SECRET ||
        selectConfig.slackConfig.signingSecret,
      token: process.env.SLACK_TOKEN || selectConfig.slackConfig.token,
      appToken:
        process.env.SLACK_APP_TOKEN || selectConfig.slackConfig.appToken,
    },
    groqConfig: {
      apiKey: process.env.GROQ_API_KEY || selectConfig.groqConfig.apiKey,
    },
  };
}

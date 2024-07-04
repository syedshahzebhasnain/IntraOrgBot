import path = require('path');
import dotenv = require('dotenv');
import {Config} from './types';

// Load environment variables from .env file
dotenv.config();

export default function loadConfig(env = 'local'): Config {
  // Directly use NODE_ENV with fallback to 'env' argument
  // Else use local
  const config = process.env.NODE_ENV || env;
  console.log('Picking up environment:', config);
  const configPath = path.join(__dirname, `${config}.json`);
  const selectConfig = require(configPath) as Config;

  return {
    ...selectConfig,
  };
}

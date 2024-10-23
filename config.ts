/* eslint-disable n/no-process-env */
import path from 'path';
import dotenv from 'dotenv';


// Load environment files
if (!!process.env.NODE_ENV) {
  const result = dotenv.config({
    path: path.join(__dirname, `./config/.env.${process.env.NODE_ENV}`),
  });
  if (!!result?.error) {
    throw result.error;
  }
}


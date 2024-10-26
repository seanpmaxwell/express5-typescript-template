/* eslint-disable n/no-process-env */

import path from 'path';
import dotenv from 'dotenv';
import moduleAlias from 'module-alias';


// Load environment files
if (!!process.env.NODE_ENV) {
  const result = dotenv.config({
    path: path.join(__dirname, `./config/.env.${process.env.NODE_ENV}`),
  });
  if (!!result?.error) {
    throw result.error;
  }
}

// Configure moduleAlias
if (__filename.endsWith('js')) {
  moduleAlias.addAlias('@src', __dirname + '/dist');
}

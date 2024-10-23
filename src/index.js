import logger from 'jet-logger';
import EnvVars from '@src/common/EnvVars';
import server from './server';
var SERVER_START_MSG = ('Express server started on port: ' +
    EnvVars.Port.toString());
server.listen(EnvVars.Port, function () { return logger.info(SERVER_START_MSG); });

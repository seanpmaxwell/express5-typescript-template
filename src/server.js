import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import path from 'path';
import helmet from 'helmet';
import express from 'express';
import logger from 'jet-logger';
import BaseRouter from '@src/routes';
import Paths from '@src/common/Paths';
import EnvVars from '@src/common/EnvVars';
import HttpStatusCodes from '@src/common/HttpStatusCodes';
import { RouteError } from '@src/common/classes';
import { NodeEnvs } from '@src/common/constants';
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(EnvVars.CookieProps.Secret));
if (EnvVars.NodeEnv === NodeEnvs.Dev.valueOf()) {
    app.use(morgan('dev'));
}
if (EnvVars.NodeEnv === NodeEnvs.Production.valueOf()) {
    app.use(helmet());
}
app.use(Paths.Base, BaseRouter);
app.use(function (err, _, res, next) {
    if (EnvVars.NodeEnv !== NodeEnvs.Test.valueOf()) {
        logger.err(err, true);
    }
    var status = HttpStatusCodes.BAD_REQUEST;
    if (err instanceof RouteError) {
        status = err.status;
        res.status(status).json({ error: err.message });
    }
    return next(err);
});
var viewsDir = path.join(__dirname, 'views');
app.set('views', viewsDir);
var staticDir = path.join(__dirname, 'public');
app.use(express.static(staticDir));
app.get('/', function (_, res) {
    return res.redirect('/users');
});
app.get('/users', function (_, res) {
    return res.sendFile('users.html', { root: viewsDir });
});
export default app;

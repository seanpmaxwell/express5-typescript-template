import { Response } from 'supertest';
import { IUser } from '@src/models/User';


// API Response
export type TRes = Omit<Response, 'body'> & {
  body: {
    error?: string,
    user?: IUser,
    users?: IUser[],
  },
};

// API Callback
export type TApiCb = (res: TRes) => void;

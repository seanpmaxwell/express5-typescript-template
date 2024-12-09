import { isString } from 'jet-validators';

import schema from '@src/util/schema';
import { isRelationalKey } from '@src/util/validators';


export interface IUser {
  id: number;
  name: string;
  email: string;
  created: Date;
  address?: { street: string };
}

const User = schema<IUser>({
  id: isRelationalKey,
  name: isString,
  created: Date,
  email: isString,
  address: schema<IUser['address']>({
    street: isString,
  }, { optional: true }),
});


// **** Export default **** //

export default User;

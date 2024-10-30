import schema from '@src/util/schema';
import { isNum, isStr } from '@src/util/type-checks';


export interface IUser {
  id: number;
  name: string;
  email: string;
  created: Date;
  address?: { street: string };
}

const User = schema<IUser>({
  id: isNum,
  name: isStr,
  created: Date,
  email: isStr,
  address: schema({
    street: isStr,
  }, { optional: true }),
});


// **** Export default **** //

export default User;

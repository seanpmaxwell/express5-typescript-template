import { Type, type Static } from '@sinclair/typebox';
import { Value } from '@sinclair/typebox/value';


export type IUser = Static<typeof UserSchema>;

const UserSchema = Type.Object({                              
  id: Type.Number({ default: -1 }),                                  
  name: Type.String(),
  email: Type.String({ format: 'email '}),
  created: Type.Date(),
});


// **** Export default **** //

export default {
  new: (arg?: Partial<IUser>) => Value.Parse(UserSchema, arg),
  isValid: (arg: unknown) => Value.Check(UserSchema, arg),
};

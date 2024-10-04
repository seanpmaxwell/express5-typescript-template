import MI from 'model-initializer';


export interface IUser {
  id: number;
  name: string;
  email: string;
  created: Date;
}

const User = MI.init<IUser>({
  id: 'pk',
  name: 'string',
  email: 'email',
  created: 'date',
});


export default User;

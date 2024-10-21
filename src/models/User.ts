import { z } from 'zod';


export interface IUser extends z.infer<typeof User> {
  horse?: string;
}

const User = z.object({
  id: z.number().default(-1),
  name: z.string().default(''),
  email: z.string().email().or(z.literal('')).default(''),
  // eslint-disable-next-line max-len
  created: z.preprocess((arg => arg === undefined ? new Date() : arg), z.coerce.date()),
  address: z.object({ 
    street: z.string(),
  }).optional(),
});

export default {
  new: (arg?: Partial<IUser>) => User.parse(arg),
  isValid: (arg: unknown): arg is IUser => !!User.parse(arg),
} as const;

// Types
import { IUser } from './user';

export interface IUserContext {
  users: IUser[];
  dispatch: Function;
  selectingUserId?: string;
}

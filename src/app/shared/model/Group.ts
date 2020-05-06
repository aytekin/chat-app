import {GroupMessage} from './GroupMessage';
import {UserGroup} from './UserGroup';

export class Group {

  Id: number;
  Name: string;
  GroupMessages: GroupMessage[];
  UserGroups: UserGroup[];

}

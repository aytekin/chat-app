import {UserGroup} from './UserGroup';
import {Message} from './Message';

export class User {

  public UserId: number;
  public Username: string;
  public UserGroups: UserGroup[];
  public Messages:Message[];

}

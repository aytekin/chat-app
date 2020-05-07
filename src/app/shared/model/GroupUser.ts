import {Group} from "./Group";
import {User} from "./User";

export class GroupUser {
  public id: number;
  public groupId: number;
  public group: Group;
  public userId: number;
  public user: User;
}

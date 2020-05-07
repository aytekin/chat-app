export class Message {

  constructor(desc,to,from,group,date) {
    this.description = desc;
    this.fromName = from;
    this.toName = to;
    this.groupName = group;
    this.date = date;
  }

  public id: number;
  public description: string;
  public fromName: string;
  public toName: string;
  public groupName: string;
  public date: Date;
}

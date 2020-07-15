export class User {
  public userId: string;
  public firstName: string;
  public lastName: string;
  public userName: string; // no need for id and passWord because our addNewUser() in Spring doesn't require it
  public email: string;
  public profileImageUrl: string;
  public lastLoginDate: Date;
  public lastLoginDateDisplay: Date;
  public joinDate: Date;
  public role: string;
  public authorities: string[]; // [] or string[]
  public isActive: boolean;
  public isNotLocked: boolean;

  constructor() {
    this.userId = '';
    this.firstName = '';
    this.lastName = '';
    this.userName = '';
    this.email = '';
    this.profileImageUrl = '';
    this.lastLoginDate = null;
    this.lastLoginDateDisplay = null;
    this.joinDate = null;
    this.role = '';
    this.authorities = [];
    this.isActive = false;
    this.isNotLocked = false;
  }

}
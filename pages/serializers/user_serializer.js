export class UserSerializer {
  constructor(user) {
    delete user.password;
    this.user = user;
  }

  get to_json() {
    return this.user;
  }
}

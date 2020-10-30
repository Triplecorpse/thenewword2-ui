export class User {
  login: string;
  email?: string;
  token: string;

  constructor({login, email, token}: User) {
    this.login = login;
    this.email = email;
    this.token = token;
  }
}

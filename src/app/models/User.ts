export class User {
  login: string;
  email?: string;
  token: string;

  constructor({login, email, token}: User, saveSession: boolean) {
    this.login = login;
    this.email = email;
    this.token = token;

    if (saveSession) {
      localStorage.setItem('session', token);
    }
  }
}

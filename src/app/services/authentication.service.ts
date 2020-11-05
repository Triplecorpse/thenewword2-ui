import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {EMPTY, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IUserDto} from "../models/IUserDto";
import {map, switchMapTo, tap} from "rxjs/operators";
import {IUserLogin} from "../models/IUserLogin";
import {IUserRegister} from "../models/IUserRegister";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user?: User;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(loginForm: IUserLogin): Observable<User> {
    return this.httpClient.post<IUserDto>(`${environment.api}/user/login`, loginForm)
      .pipe(map(user => new User({login: user.login, email: user.email, token: user.token}, loginForm.saveSession)));
  }

  register(registerForm: IUserRegister): Observable<void> {
    return this.httpClient.post<IUserDto>(`${environment.api}/user/register`, registerForm)
      .pipe(switchMapTo(EMPTY));
  }

  deauthenticate(): Observable<void> {
    return of<void>().pipe(tap(() => {
      this.user = null;
    }));
  }

  getToken(): string {
    return this.user.token;
  }
}

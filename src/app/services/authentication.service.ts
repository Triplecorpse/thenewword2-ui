import {Injectable} from '@angular/core';
import {User} from "../models/User";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {IUserDto} from "../models/IUserDto";
import {map, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user?: User;

  constructor(private httpClient: HttpClient) {
  }

  authenticate(loginOrEmail: string, password: string): Observable<User> {
    const formData = new FormData();

    formData.append('login', loginOrEmail);
    formData.append('password', password);

    return this.httpClient.post<IUserDto>(`${environment.api}/user/login`, `login=${loginOrEmail}&password=${password}`, {
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
      .pipe(map(user => new User({login: user.login, email: user.email, token: user.token})));
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

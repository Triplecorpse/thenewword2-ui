import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor() { }

  private getBody(bodyObj: {[key: string]: string | number | boolean}): string {
    const fragments = [];

    Object.keys(bodyObj).forEach(key => {
      fragments.push(`${key}=${bodyObj[key]}`);
    });

    return fragments.join('&');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let newReq;
    let body;
    let setHeaders;

    if (req.method.toLowerCase() === 'post') {
      setHeaders = {'Content-Type': 'application/x-www-form-urlencoded'};
      body = this.getBody(req.body);
    }

    newReq = req.clone({setHeaders, body});

    return next.handle(newReq);
  }
}

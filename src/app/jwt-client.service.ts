import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class JwtClientService {
  constructor(private httpClient: HttpClient) {}

  public generateToken(request) {
    return this.httpClient.post<string>(
      'http://localhost:8080/authenticate',
      request,
      { responseType: 'text' as 'json' }
    );
  }

  public welcome(token) {
    let tokenStr = 'Bearer ' + token;
    //const headers = new HttpHeaders().set('Authorization', tokenStr);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Authorization', tokenStr);
    return this.httpClient.get<string>('http://localhost:8080/', {
      headers,
      responseType: 'text' as 'json',
    });
  }
}

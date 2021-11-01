import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}
  apiURL = 'http://localhost:8080';
  public authenticate(postData: any): Observable<any> {
    const url = `${this.apiURL}/authenticate`;
    return this.httpClient.post(url, postData);
  }

  public getToken1(token): Observable<any> {
    const url = `${this.apiURL}/user?email=${token.email}`;
    //let obj = JSON.parse(token);
    let tokenStr = 'Bearer ' + token.token;
    //const headers = new HttpHeaders().set('Authorization', tokenStr);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Authorization', tokenStr);
    let options = { headers: headers };
    return this.httpClient.get(url, options);
  }

  public addUser(postData: any): Observable<any> {
    const url = `${this.apiURL}/signup`;
    return this.httpClient.post(url, postData);
  }
  public verifyUser(postData: any): Observable<any> {
    const url = `${this.apiURL}/verifyUser`;
    return this.httpClient.post(url, postData);
  }

  public saveOrder(postData: any): Observable<any> {
    const url = `${this.apiURL}/order`;
    var tokenStr = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tokenStr);
    let options = { headers: headers };
    return this.httpClient.post(url, postData, options);
  }

  public getUserOrdersList(): Observable<any> {
    const url = `${this.apiURL}/user-orders-list?id=${localStorage.getItem(
      'userId'
    )}`;
    //let obj = JSON.parse(token);
    var tokenStr = 'Bearer ' + localStorage.getItem('token');
    //const headers = new HttpHeaders().set('Authorization', tokenStr);
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Authorization', tokenStr);
    let options = { headers: headers };
    return this.httpClient.get(url, options);
  }

  public getServiceManOrdersList(): Observable<any> {
    const url = `${this.apiURL}/orders-admin-list`;
    var tokenStr = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
    headers = headers.set('Authorization', tokenStr);
    let options = { headers: headers };
    return this.httpClient.get(url, options);
  }

  public updateStatus(postData: any,id): Observable<any> {
    const url = `${this.apiURL}/order-edit/${id}`;
       var tokenStr = 'Bearer ' + localStorage.getItem('token');
       let headers = new HttpHeaders();
       headers = headers.set('Authorization', tokenStr);
       let options = { headers: headers };
    return this.httpClient.put(url, postData, options);
  }
}

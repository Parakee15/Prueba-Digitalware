import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _httpClient: HttpClient) { }

  public getById(id: string): Observable<any> {
    return this._httpClient.get(`${ENV.API.USERS}/${id}`, { headers: this.httpHeaders });
  }

  public getByRole(id: string): Observable<any> {
    return this._httpClient.get(`${ENV.API.USERS}/role/${id}`, { headers: this.httpHeaders });
  }

  public get(): Observable<any> {
    return this._httpClient.get(`${ENV.API.USERS}`, { headers: this.httpHeaders });
  }

}

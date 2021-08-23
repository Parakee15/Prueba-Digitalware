import { Injectable } from '@angular/core';
import { environment as ENV } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _localStorageService: LocalStorageService, private _httpClient: HttpClient) { }

  public login(data: any): Observable<any> {
    const credential = btoa(`${ENV.CREDENTIAL.CLIENT_ID}:${ENV.CREDENTIAL.ANGULAR_APP}`);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${credential}`
    });

    console.log('credential :>> ', credential);

    let params = new URLSearchParams();
    params.set("grant_type", "password");
    params.set("username", data.username);
    params.set("password", data.password);
    return this._httpClient.post(ENV.API.AUTH, params.toString(), { headers: httpHeaders });
  }

  public isAuthenticated(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this._localStorageService.get(ENV.KEYS.AUTHINFO_KEY).then((resp) => {
        if (resp) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public setAuthInfo(data: any) {
    return new Promise((resolve, reject) => {
      this._localStorageService.set(ENV.KEYS.AUTHINFO_KEY, JSON.stringify(data)).then((resp) => {
        if (resp) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public getAuthInfo() {
    return JSON.parse(localStorage.getItem(ENV.KEYS.AUTHINFO_KEY));
  }

  public logOut() {
    return this._localStorageService.clear();
  }

}

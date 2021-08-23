import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { environment as ENV } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor(private _localStorageService: LocalStorageService) { }

  public setJwt(data: any) {
    return new Promise((resolve, reject) => {
      this._localStorageService.set(ENV.KEYS.JWT_KEY, JSON.stringify(data)).then((resp) => {
        if (resp) {
          resolve(true);
        } else {
          resolve(false);
        }
      });
    });
  }

  public getJwt() {
    return localStorage.getItem(ENV.KEYS.JWT_KEY);
  }
}

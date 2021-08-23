import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RentService {
  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _httpClient: HttpClient) { }

  public get(): Observable<any> {
    return this._httpClient.get(`${ENV.API.RENT}`, { headers: this.httpHeaders });
  }

  public save(data: any): Observable<any> {
    return this._httpClient.post(`${ENV.API.RENT}`, data, { headers: this.httpHeaders });
  }
}

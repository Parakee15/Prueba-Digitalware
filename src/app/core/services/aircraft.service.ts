import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment as ENV } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AircraftService {

  private httpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
  });

  constructor(private _httpClient: HttpClient) { }

  public get(): Observable<any> {
    return this._httpClient.get(`${ENV.API.AIRCRAFT}`, { headers: this.httpHeaders });
  }

  public delete(id: string): Observable<any> {
    return this._httpClient.delete(`${ENV.API.AIRCRAFT}/${id}`, { headers: this.httpHeaders });
  }

  public update(id: string, data: any): Observable<any> {
    return this._httpClient.put(`${ENV.API.AIRCRAFT}/${id}`, data, { headers: this.httpHeaders });
  }

  public save(data: any): Observable<any> {
    return this._httpClient.post(`${ENV.API.AIRCRAFT}`, data, { headers: this.httpHeaders });
  }

  public getByAvailable(available: string): Observable<any> {
    return this._httpClient.get(`${ENV.API.AIRCRAFT}/available/${available}`, { headers: this.httpHeaders });
  }

}

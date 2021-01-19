import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  constructor(private http: HttpClient) {}

  public getCurrentIp() {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  public searchIp(ip: string) {
    return this.http.get(
      `https://geo.ipify.org/api/v1?apiKey=${'at_UxnEpDuwl37XROS65B4viSprFqgpe'}&ipAddress=${ip}`
    );
  }
}

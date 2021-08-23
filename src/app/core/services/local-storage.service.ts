import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  get(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        resolve(localStorage.getItem(key));
      } catch (error) {
        reject(null);
      }
    });
  }

  set(key: string, value: any) {
    return new Promise((resolve, reject) => {
      if (value) {
        localStorage.setItem(key, value);
        resolve(true);
      } else {
        reject(false);
      }
    })
  }

  remove(key: string) {
    return new Promise((resolve, reject) => {
      if (key) {
        localStorage.removeItem(key);
        resolve(true);
      } else {
        reject(false);
      }
    });
  }

  clear() {
    return new Promise((resolve, reject) => {
      try {
        localStorage.clear();
        resolve(true);
      } catch (error) {
        reject(null);
      }
    });

  }
}

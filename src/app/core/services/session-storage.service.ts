import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';


@Injectable()
export class SessionStorageService {

    constructor(
        @Inject(SESSION_STORAGE) private storage: StorageService
    ) { }

    get(key: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                const value = (this.storage.has(key)) ? this.storage.get(key) : null;
                resolve(value);
            } catch (error) {
                reject();
            }
        });
    }

    set(key: string, value: any) {
        return new Promise((resolve, reject) => {
            if (value) {
                this.storage.set(key, value);
                resolve(true);
            } else {
                reject(false);
            }
        })
    }

    remove(key: string) {
        return new Promise((resolve, reject) => {
            if (key) {
                this.storage.remove(key);
                resolve(true);
            } else {
                reject(false);
            }
        });
    }
}




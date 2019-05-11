import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';

/*
@Injectable({
  providedIn: 'root'
})*/
@Injectable()
export class AuthService {
  // AUTH_SERVER_ADDRESS  =  'https://cors-anywhere.herokuapp.com/https://www.bloggoto.com/api';
  // AUTH_SERVER_ADDRESS  =  'http://localhost/bloggotoweb/api';
  AUTH_SERVER_ADDRESS  =  'https://www.bloggoto.com/api';
  authSubject  =  new  BehaviorSubject(false);

  constructor(private  httpClient:  HttpClient, private  storage:  Storage) { }

  login(user): Observable<any> {
    console.log(user);
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user);
    /*return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/login`, user).pipe(
      tap(async (res: any) => {
        if (res.status === 200) {
          if (res.user) {
            await this.storage.set('ACCESS_TOKEN', res.user.access_token);
            await this.storage.set('EXPIRES_IN', res.user.expires_in);
            this.authSubject.next(true);
          }
        } else {
          console.log(res.message);
        }
      })
    );*/
  }


  register(user): Observable<any> {
    return this.httpClient.post<any>(`${this.AUTH_SERVER_ADDRESS}/register`, user).pipe(
      tap(async (res:  any ) => {
        if (res.user) {
          await this.storage.set('ACCESS_TOKEN', res.user.access_token);
          await this.storage.set('EXPIRES_IN', res.user.expires_in);
          this.authSubject.next(true);
        }
      })
    );
  }

  getUserInfo() {

    return this.storage.get('USER_DATA');
    /*
    let storageValue;
    console.log('get data info');
    this.storage.get('USER_DATA').then((data) => {
      console.log(data);
      storageValue = data;
      return storageValue;
    });*/
  }

  removeUserInfo() {
    return this.storage.clear();
  }

}

import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import set = Reflect.set;

export interface User {
  name: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private subject = new BehaviorSubject('name');
  public state$ = this.subject.asObservable();

  constructor() { }

  changeMessage(text) {
    this.subject.next('');
    setTimeout(() => {
      this.subject.next(text);
    }, 20);
  }

}

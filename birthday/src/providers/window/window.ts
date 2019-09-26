import { Injectable } from '@angular/core';

/*
  Generated class for the WindowProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class WindowProvider {
  get windowRef() {
    return window
  }

  constructor() {
    console.log('Hello WindowProvider Provider');
  }

}

import { Injectable } from '@nestjs/common';
import Keyer from 'keyer';

@Injectable()
export class CacheManager {

  constructor (store) {
    this.store = store;
  }

  static load (options) {
    const store = new Keyer(options);
    return store.connect();
  }

  get (...args) {
    return this.store.get(...args);
  }

  set (...args) {
    return this.store.set(...args);
  }

}

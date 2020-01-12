import { Injectable } from '@nestjs/common';
import Keyer from 'keyer';

@Injectable()
export class CacheManager {

  constructor (store) {
    this.store = store;
  }

  static async register (options) {
    const store = new Keyer(options);
    await store.connect();
    return new this(store);
  }

  get (...args) {
    return this.store.get(...args);
  }

  set (...args) {
    return this.store.set(...args);
  }

}

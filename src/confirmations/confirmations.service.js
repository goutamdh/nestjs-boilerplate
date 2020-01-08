import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import * as DeliveryMethods from './delivery'

@Injectable()
@Dependencies(getModelToken('Confirmation'))
export class ConfirmationsService {
  
  constructor (confirmation) {
    this.confirmation = confirmation;
  }

  generateToken (length) {
    let token = '';
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; ++i) {
      token += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return token;
  }

  async getPendingConfirmations (user, filters) {
    return await this.confirmation.find({
      userId: user.id,
      ...filters,
    });
  }

  async create (user, type, expireTime, tokenGenerator) {
    if (!expireTime) expireTime = 86400;
    const token = typeof tokenGenerator === 'function' ? await tokenGenerator() : this.generateToken(128);
    const confirmation = new this.confirmation({
      userId: user.id,
      type,
      token,
      expiresAt: Date.now() + expireTime * 1000,
    });
    confirmation.save();
    return confirmation;
  }

  async send (confirmation, deliveryMethod, to) {
    const delivery = new DeliveryMethods[deliveryMethod](this);
    return delivery.send(confirmation, to);
  }

  async isConfirmed (user, type) {
    return !await this.confirmation.findOne({
      type,
      userId: user.id,
    });
  }

  async confirm (token) {
    const confirmation = await this.confirmation.findOne({
      token,
    });
    return await confirmation.remove();
  }

}

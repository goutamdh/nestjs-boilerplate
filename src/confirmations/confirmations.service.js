import { Injectable, Dependencies } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { EventEmitter } from 'events';
import { ConfirmedEvent } from './confirmed.event';
import ConfirmationsException from './confirmations.exception';

@Injectable()
@Dependencies(getModelToken('Confirmation'))
export class ConfirmationsService extends EventEmitter {
  
  constructor (confirmation, deliveryService) {
    super();
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
      user: user.id,
      ...filters,
    });
  }

  async create (user, type, expireTime, tokenGenerator) {
    if (!expireTime) expireTime = 86400;
    const token = typeof tokenGenerator === 'function' ? await tokenGenerator() : this.generateToken(128);
    const confirmation = new this.confirmation({
      user: user.id,
      type,
      token,
      expiresAt: Date.now() + expireTime * 1000,
    });
    confirmation.save();
    return confirmation;
  }

  async confirm (token) { // TODO: Add rate limit
    const confirmation = await this.confirmation.findOne({
      token,
    }).populate('user');
    if (!confirmation) {
      throw new ConfirmationsException('CONFIRMATION_NOT_FOUND');
    }
    await confirmation.remove();
    this.emit(`confirmed#${confirmation.type}`, new ConfirmedEvent(confirmation));
  }

}

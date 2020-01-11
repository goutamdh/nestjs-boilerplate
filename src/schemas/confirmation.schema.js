import { Schema, Types } from 'mongoose';

export const ConfirmationSchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    index: {
      expireAfterSeconds: 0,
    },
  },
}, {
  versionKey: false,
});

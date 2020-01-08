import { Schema, Types } from 'mongoose';

export const ConfirmationSchema = new Schema({
  userId: {
    type: Types.ObjectId,
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
  },
});

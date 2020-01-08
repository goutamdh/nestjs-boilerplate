import { Schema } from 'mongoose';

export const UserTotpSchema = new Schema({
  isActive: {
    type: Boolean,
    required: true,
  },
  key: {
    type: String,
    required: true,
  },
  period: {
    type: Number,
    required: true,
  },
  backupCodes: {
    type: [String],
    required: true,
  },
});

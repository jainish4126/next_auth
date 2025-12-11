import mongoose from 'mongoose';

const OtpSchema = new mongoose.Schema(
  {
    identifier: {
      type: String, 
      required: true,
      trim: true,
    },
    otp: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['forgot_password', 'verification', 'login'],
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      default: () => new Date(Date.now() + 10 * 60 * 1000), 
    },
    attempts: {
      type: Number,
      default: 0,
    },
    isUsed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

OtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
OtpSchema.index({ identifier: 1, type: 1 });

export default mongoose.models.Otp || mongoose.model('Otp', OtpSchema);

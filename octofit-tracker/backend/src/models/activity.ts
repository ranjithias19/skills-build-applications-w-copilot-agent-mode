import { Schema, model } from 'mongoose';

const ActivitySchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  distanceKm: { type: Number, default: 0 },
  durationMinutes: { type: Number, default: 0 },
  calories: { type: Number, default: 0 },
  recordedAt: { type: Date, default: () => new Date() },
});

export default model('Activity', ActivitySchema);

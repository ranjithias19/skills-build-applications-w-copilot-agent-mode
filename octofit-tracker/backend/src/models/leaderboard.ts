import { Schema, model } from 'mongoose';

const LeaderboardSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  score: { type: Number, default: 0 },
  rank: { type: Number, default: 0 },
  updatedAt: { type: Date, default: () => new Date() },
});

export default model('Leaderboard', LeaderboardSchema);

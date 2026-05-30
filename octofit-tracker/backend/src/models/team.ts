import { Schema, model } from 'mongoose';

const TeamSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, default: '' },
  createdAt: { type: Date, default: () => new Date() },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export default model('Team', TeamSchema);

import { Schema, model } from 'mongoose';

const WorkoutSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  exercises: [{ name: String, reps: Number, sets: Number, weightKg: Number }],
  durationMinutes: { type: Number, default: 0 },
  completedAt: { type: Date, default: () => new Date() },
});

export default model('Workout', WorkoutSchema);

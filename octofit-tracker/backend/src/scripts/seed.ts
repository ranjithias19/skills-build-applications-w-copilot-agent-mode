/**
 * Seed the octofit_db database with test data
 *
 * Seed the octofit_db database with test data
 */
import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';
import express from 'express';
import apiRouter from '../routes';

const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

async function seed() {
  console.log('Seed the octofit_db database with test data');
  await mongoose.connect(MONGO);

  // Clear existing data
  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({}),
  ]);

  // Create teams
  const teamA = await Team.create({ name: 'Lions', description: 'Morning runners' });
  const teamB = await Team.create({ name: 'Tigers', description: 'Evening cyclists' });

  // Create users
  const users = await User.create([
    { name: 'Alice Rivera', email: 'alice@example.com', passwordHash: 'hash1', team: teamA._id },
    { name: 'Bob Chen', email: 'bob@example.com', passwordHash: 'hash2', team: teamA._id },
    { name: 'Cara Singh', email: 'cara@example.com', passwordHash: 'hash3', team: teamB._id },
  ]);

  // Link members to teams
  teamA.members = [users[0]._id, users[1]._id];
  teamB.members = [users[2]._id];
  await teamA.save();
  await teamB.save();

  // Activities
  await Activity.create([
    { user: users[0]._id, type: 'run', distanceKm: 5.2, durationMinutes: 30, calories: 320 },
    { user: users[1]._id, type: 'bike', distanceKm: 20.5, durationMinutes: 60, calories: 800 },
    { user: users[2]._id, type: 'swim', distanceKm: 1.0, durationMinutes: 40, calories: 450 },
  ]);

  // Workouts
  await Workout.create([
    { user: users[0]._id, title: 'Leg Day', exercises: [{ name: 'Squat', reps: 8, sets: 3, weightKg: 80 }], durationMinutes: 45 },
    { user: users[1]._id, title: 'Cardio Blast', exercises: [{ name: 'Burpees', reps: 15, sets: 4 }], durationMinutes: 30 },
  ]);

  // Leaderboard
  await Leaderboard.create([
    { user: users[1]._id, score: 1500, rank: 1 },
    { user: users[0]._id, score: 1200, rank: 2 },
  ]);

  console.log('Seed data inserted. Summary:');
  const counts = await Promise.all([
    User.countDocuments(),
    Team.countDocuments(),
    Activity.countDocuments(),
    Workout.countDocuments(),
    Leaderboard.countDocuments(),
  ]);

  console.log({ users: counts[0], teams: counts[1], activities: counts[2], workouts: counts[3], leaderboard: counts[4] });

  // Start a temporary server to verify API route responses
  const app = express();
  app.use(express.json());
  app.use('/api', apiRouter);

  const PORT = 9000;
  const server = app.listen(PORT, async () => {
    console.log(`Temporary API server listening on http://localhost:${PORT}`);
    try {
      if (typeof fetch === 'undefined') {
        console.log('Global fetch not available in this Node runtime; skipping HTTP verification. You can verify by running the API server and querying /api endpoints.');
      } else {
        const endpoints = ['/api/users', '/api/teams', '/api/activities', '/api/leaderboard', '/api/workouts'];
        for (const ep of endpoints) {
          try {
            const res = await fetch(`http://localhost:${PORT}${ep}`);
            const json = await res.json();
            console.log(`GET ${ep} ->`, Array.isArray(json) ? `array(${json.length})` : json);
          } catch (err) {
            console.error(`Failed to fetch ${ep}:`, err);
          }
        }
      }
    } finally {
      server.close();
      await mongoose.disconnect();
      console.log('Verification complete. Database connection closed.');
    }
  });
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});

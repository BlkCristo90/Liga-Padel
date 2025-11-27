import mongoose from 'mongoose';

const matchSchema = new mongoose.Schema({
  player1: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  player2: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
  winner: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
  score: { type: String },
  playedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Match', matchSchema);

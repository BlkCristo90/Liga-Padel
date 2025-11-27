import Joi from 'joi';
import Match from '../models/match.model.js';
import Player from '../models/player.model.js';
import { eloUpdate } from '../utils/elo.js';

const createSchema = Joi.object({
  player1: Joi.string().required(),
  player2: Joi.string().required(),
  winner: Joi.string().required(),
  score: Joi.string().optional()
});

export async function listMatches(req, res) {
  const matches = await Match.find().sort({ playedAt: -1 }).populate('player1 player2 winner').lean();
  res.json(matches);
}

export async function createMatch(req, res) {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    const p1 = await Player.findById(value.player1);
    const p2 = await Player.findById(value.player2);
    if (!p1 || !p2) return res.status(400).json({ error: 'Jugadores inválidos' });

    const scoreA = (value.winner === value.player1) ? 1 : 0;
    const [newP1, newP2] = eloUpdate(p1.points, p2.points, scoreA, 20);

    p1.points = newP1;
    p2.points = newP2;
    await p1.save();
    await p2.save();

    const match = await Match.create({ player1: p1._id, player2: p2._id, winner: value.winner, score: value.score });
    res.json(match);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

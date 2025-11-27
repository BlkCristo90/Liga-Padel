import Joi from 'joi';
import Player from '../models/player.model.js';
import User from '../models/user.model.js';

const createSchema = Joi.object({
  name: Joi.string().min(2).required()
});

export async function listPlayers(req, res) {
  const players = await Player.find().sort({ points: -1 }).lean();
  res.json(players);
}

export async function createPlayer(req, res) {
  try {
    const { error, value } = createSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.message });

    // optional: link to current user
    const user = await User.findById(req.user.id);
    const player = await Player.create({ name: value.name, user: user?._id });
    res.json(player);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}

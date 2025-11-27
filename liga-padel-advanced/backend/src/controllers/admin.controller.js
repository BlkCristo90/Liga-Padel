import User from '../models/user.model.js';
import Player from '../models/player.model.js';

export async function listUsers(req, res) {
  const users = await User.find().select('-password').lean();
  res.json(users);
}

export async function deleteUser(req, res) {
  const id = req.params.id;
  await User.findByIdAndDelete(id);
  res.json({ ok: true });
}

export async function resetPoints(req, res) {
  await Player.updateMany({}, { points: 1000 });
  res.json({ ok: true });
}

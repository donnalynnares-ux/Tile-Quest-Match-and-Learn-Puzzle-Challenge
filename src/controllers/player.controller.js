const { matchedData } = require('express-validator');
const playerService = require('../services/player.service');

async function join(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const { nickname } = matchedData(req, { locations: ['body'] });
  const { session, player, created } = await playerService.join(code, nickname, req.user);

  res.status(created ? 201 : 200).json({
    player_id: player.player_id,
    nickname: player.nickname,
    score: player.score,
    rejoined: !created,
    session: {
      code: session.join_pin,
      status: session.status,
    },
  });
}

async function list(req, res) {
  const { code } = matchedData(req, { locations: ['params'] });
  const players = await playerService.listBySession(code);
  res.status(200).json(players);
}

module.exports = { join, list };
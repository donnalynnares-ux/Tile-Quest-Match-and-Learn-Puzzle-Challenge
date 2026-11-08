function getGameInfo(req, res) {
  res.json({
    slug: 'tile-quest-match-and-learn-puzzle-challenge',
    name: 'Tile Quest Match and Learn Puzzle Challenge',
    // ... leave your other existing fields here (group, developer, description, etc.)
  });
}

module.exports = { getGameInfo };
const { User, Level, Quiz } = require('../models');

// Get all levels with their associated quizzes
exports.getLevels = async (req, res) => {
  try {
    const levels = await Level.findAll({
      include: [{ model: Quiz, as: 'quizzes' }],
      order: [['levelNumber', 'ASC']]
    });
    res.json(levels);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Register or get player progress
exports.getOrCreatePlayer = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    let [user] = await User.findOrCreate({
      where: { username },
      defaults: { score: 0, currentLevel: 1 }
    });

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Submit quiz answer and update score / level progression
exports.submitQuizAnswer = async (req, res) => {
  try {
    const { userId, quizId, answer } = req.body;

    const quiz = await Quiz.findByPk(quizId, { include: ['level'] });
    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isCorrect = quiz.correctAnswer.trim().toLowerCase() === answer.trim().toLowerCase();
    
    if (isCorrect) {
      user.score += 10; // Award 10 points for a correct answer
      // Advance level if they completed the current level's quiz
      if (quiz.level.levelNumber >= user.currentLevel) {
        user.currentLevel += 1;
      }
      await user.save();
    }

    res.json({
      correct: isCorrect,
      correctAnswer: isCorrect ? null : quiz.correctAnswer,
      user
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
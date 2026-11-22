const express = require('express');
const app = express(); // 1. App must be defined first!

// Middleware (body parsers, cors, etc.)
app.use(express.json());

// Your Routes (e.g., app.use('/api/levels', levelRoutes));

// 2. Global Error Handler MUST go at the very bottom (after routes)
app.use((err, req, res, next) => {
  console.error("Unhandled Error Stack:", err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err : {}
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
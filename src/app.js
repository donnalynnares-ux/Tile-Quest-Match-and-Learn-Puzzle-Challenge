const createAuthService = require('./services/auth.service');
const createAuthController = require('./controllers/auth.controller');
const createAuthRoutes = require('./routes/auth.routes');

const authService = createAuthService(models);
const authController = createAuthController(authService);
app.use('/api/v1/auth', createAuthRoutes(authController));
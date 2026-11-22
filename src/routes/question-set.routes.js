const { Router } = require('express');
const controller = require('../controllers/question-set.controller');
const rules = require('../validators/question-set.validator');
const validate = require('../middlewares/validate');
const requireUser = require('../middlewares/require-user');

const router = Router();

router.use(requireUser('HOST', 'ADMIN'));

router.get('/', controller.list);
router.post('/', rules.createRules, validate, controller.create);
router.get('/:id', rules.idParam, validate, controller.get);
router.patch('/:id', rules.updateRules, validate, controller.update);
router.delete('/:id', rules.idParam, validate, controller.remove);
router.use('/question-sets', require('./question-set.routes'));

module.exports = router;
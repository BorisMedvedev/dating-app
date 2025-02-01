const express = require('express');
const router = express.Router();
const { createNutritionPlan } = require('../controllers/nutritionController');
const authMiddleware = require('../middleware/auth');

router.post('/create-plan', authMiddleware, createNutritionPlan);

module.exports = router;

// Расчет базового метаболизма
const calculateBMR = (weight, height, age, goal) => {
  const baseMetabolism = 10 * weight + 6.25 * height - 5 * age;
  const goalMultipliers = {
    lose: 0.8,
    gain: 1.2,
    maintain: 1.0,
  };
  return baseMetabolism * goalMultipliers[goal];
};

// Корректировка калорийности
const adjustCaloriesByGoal = (bmr, goal, activityLevel) => {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    high: 1.725,
  };

  let calories = bmr * activityMultipliers[activityLevel];

  switch (goal) {
    case 'lose':
      return calories - 300;
    case 'gain':
      return calories + 300;
    default:
      return calories;
  }
};

// Расчет макронутриентов
const calculateMacronutrients = (calories, goal) => {
  const macroDistribution = {
    lose: { protein: 0.4, fat: 0.3, carbs: 0.3 },
    gain: { protein: 0.3, fat: 0.3, carbs: 0.4 },
    maintain: { protein: 0.35, fat: 0.3, carbs: 0.35 },
  };

  const distribution = macroDistribution[goal];

  return {
    protein: Math.round((calories * distribution.protein) / 4),
    fat: Math.round((calories * distribution.fat) / 9),
    carbs: Math.round((calories * distribution.carbs) / 4),
  };
};

// Генерация meal plan
const generateMeals = (preferredFoods, dailyCalories) => {
  return [
    { name: 'Завтрак', calories: dailyCalories * 0.3 },
    { name: 'Обед', calories: dailyCalories * 0.4 },
    { name: 'Ужин', calories: dailyCalories * 0.3 },
  ];
};

// Основная функция создания плана питания
const createNutritionPlan = async (req, res) => {
  try {
    const { userId, age, weight, height, goal, activityLevel, preferredFoods } =
      req.body;

    // Расчет калорийности
    const bmr = calculateBMR(weight, height, age, goal);
    const dailyCalories = adjustCaloriesByGoal(bmr, goal, activityLevel);

    // Генерация плана питания
    const nutritionPlan = {
      dailyCalories,
      macronutrients: calculateMacronutrients(dailyCalories, goal),
      meals: generateMeals(preferredFoods, dailyCalories),
    };

    // Сохранение плана пользователю
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $push: {
          nutritionPlans: {
            date: new Date(),
            plan: nutritionPlan,
          },
        },
        preferredFoods,
      },
      { new: true }
    );

    res.status(201).json({
      message: 'План питания создан',
      plan: nutritionPlan,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Экспорт функций
module.exports = {
  createNutritionPlan,
  calculateBMR,
  adjustCaloriesByGoal,
  calculateMacronutrients,
  generateMeals,
};

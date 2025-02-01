// script.js - основной клиентский скрипт
document.addEventListener('DOMContentLoaded', () => {
  const foodGrid = document.querySelector('.food-grid');
  initFoodGrid(foodGrid);
});

// Функция для инициализации списка продуктов
function initFoodGrid(foodGrid) {
  const foodCategories = {
    'Белковые продукты': [
      'Курица',
      'Говядина',
      'Рыба',
      'Индейка',
      'Яйца',
      'Творог',
      'Сыр',
      'Тофу',
    ],
    Углеводы: [
      'Гречка',
      'Рис',
      'Киноа',
      'Овсянка',
      'Картофель',
      'Макароны',
      'Хлеб цельнозерновой',
    ],
    Овощи: [
      'Брокколи',
      'Шпинат',
      'Помидоры',
      'Огурцы',
      'Морковь',
      'Перец',
      'Капуста',
    ],
    Фрукты: ['Яблоки', 'Банан', 'Апельсин', 'Киви', 'Ягоды', 'Груша'],
  };

  Object.entries(foodCategories).forEach(([category, foods]) => {
    const categorySection = document.createElement('div');
    categorySection.classList.add('food-category');

    const categoryTitle = document.createElement('h3');
    categoryTitle.textContent = category;
    categorySection.appendChild(categoryTitle);

    const categoryGrid = document.createElement('div');
    categoryGrid.classList.add('category-grid');

    foods.forEach((food) => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      foodItem.innerHTML = `
                <input 
                    type="checkbox" 
                    id="${food.toLowerCase().replace(/\s+/g, '-')}" 
                    name="food" 
                    value="${food}"
                >
                <label for="${food.toLowerCase().replace(/\s+/g, '-')}">
                    ${food}
                </label>
            `;
      categoryGrid.appendChild(foodItem);
    });

    categorySection.appendChild(categoryGrid);
    foodGrid.appendChild(categorySection);
  });
}
const foodGrid = document.querySelector('.food-grid');
const nutritionForm = document.getElementById('nutrition-form');

// initFoodGrid(foodGrid);

nutritionForm.addEventListener('submit', function (event) {
  event.preventDefault();
  calculateNutritionPlan();
});

function calculateNutritionPlan() {
  // Собираем данные из формы
  const age = parseInt(document.getElementById('age').value);
  const height = parseFloat(document.getElementById('height').value);
  const weight = parseFloat(document.getElementById('weight').value);
  const gender = document.getElementById('gender').value;
  const activityLevel = document.getElementById('activity-level').value;

  // Расчет базовых показателей
  const bmr = calculateBMR(age, height, weight, gender);
  const tdee = calculateTDEE(bmr, activityLevel);
  const bmi = calculateBMI(height, weight);

  // Расчет макронутриентов
  const macronutrients = calculateMacronutrients(tdee);

  // Собираем выбранные продукты
  const selectedFoods = getSelectedFoods();

  // Создаем и показываем модальное окно с результатами
  showResultsModal({
    bmr,
    tdee,
    bmi,
    macronutrients,
    selectedFoods,
  });
}

function calculateBMR(age, height, weight, gender) {
  // Формула Миффлина-Сан Жеора
  if (gender === 'male') {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161;
  }
}

function calculateTDEE(bmr, activityLevel) {
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    'very-active': 1.9,
  };
  return bmr * activityMultipliers[activityLevel];
}

function calculateBMI(height, weight) {
  // Расчет индекса массы тела
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);
  return bmi.toFixed(1);
}

function calculateMacronutrients(tdee) {
  // Стандартное распределение БЖУ
  return {
    protein: Math.round((tdee * 0.3) / 4), // 30% от калорий, 1г белка = 4 ккал
    fats: Math.round((tdee * 0.25) / 9), // 25% от калорий, 1г жира = 9 ккал
    carbs: Math.round((tdee * 0.45) / 4), // 45% от калорий, 1г углеводов = 4 ккал
  };
}

function getSelectedFoods() {
  const selectedCheckboxes = document.querySelectorAll(
    'input[name="food"]:checked'
  );
  return Array.from(selectedCheckboxes).map((checkbox) => checkbox.value);
}

function showResultsModal(results) {
  // Создаем модальное окно
  const modal = document.createElement('div');
  modal.classList.add('nutrition-modal');
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close-modal">&times;</span>
      <h2>Ваш персональный план питания</h2>
      
      <div class="results-section">
        <h3>Базовые показатели</h3>
        <p>Базовый обмен веществ (BMR): ${results.bmr.toFixed(0)} ккал</p>
        <p>Суточная норма калорий (TDEE): ${results.tdee.toFixed(0)} ккал</p>
        <p>Индекс массы тела (BMI): ${results.bmi}</p>
      </div>
      
      <div class="results-section">
        <h3>Рекомендуемые макронутриенты</h3>
        <p>Белки: ${results.macronutrients.protein} г</p>
        <p>Жиры: ${results.macronutrients.fats} г</p>
        <p>Углеводы: ${results.macronutrients.carbs} г</p>
      </div>
      
      <div class="results-section">
        <h3>Выбранные продукты</h3>
        <p>${results.selectedFoods.join(', ')}</p>
      </div>
    </div>
  `;

  // Добавляем модальное окно в документ
  document.body.appendChild(modal);
  // Закрытие модального окна
  const closeButton = modal.querySelector('.close-modal');
  closeButton.addEventListener('click', () => {
    document.body.removeChild(modal);
  });
}

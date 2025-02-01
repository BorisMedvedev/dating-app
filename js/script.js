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

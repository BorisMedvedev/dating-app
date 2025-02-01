class NutritionPlanner {
  constructor() {
    this.foodDatabase = [
      // Список продуктов с БЖУ
      { name: 'Курица', protein: 25, fat: 3, carbs: 0 },
      { name: 'Говядина', protein: 26, fat: 12, carbs: 0 },
      // Добавьте больше продуктов
    ];

    this.initForm();
  }

  initForm() {
    const form = document.getElementById('nutrition-form');
    const foodGrid = document.querySelector('.food-grid');

    // Генерация списка продуктов

    this.foodDatabase.forEach((food) => {
      const foodItem = document.createElement('div');
      foodItem.classList.add('food-item');
      foodItem.innerHTML = `
                <input type="checkbox" name="food" value="${food.name}">
                <label>${food.name}</label>
            `;
      foodGrid.appendChild(foodItem);
    });

    form.addEventListener('submit', this.handleSubmit.bind(this));
  }

  calculateBMR(weight, height, age, gender, goal) {
    // Формула Миффлина-Сан Жеора
    const bmr = 10 * weight + 6.25 * height - 5 * age;
    const multiplier = {
      lose: 0.8,
      gain: 1.2,
      maintain: 1.0,
    };
    return bmr * multiplier[goal];
  }

  generateNutritionPlan(formData) {
    const selectedFoods = formData.getAll('food');
    const dailyCalories = this.calculateBMR(
      formData.get('weight'),
      formData.get('height'),
      formData.get('age'),
      formData.get('goal')
    );

    // Логика распределения БЖУ и составления плана
    const nutritionPlan = {
      dailyCalories,
      foods: selectedFoods,
      // Weitere Logik hinzufügen
    };

    return nutritionPlan;
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const nutritionPlan = this.generateNutritionPlan(formData);

    // Отправка данных на сервер или в личный кабинет
    this.sendDataToAdmin(nutritionPlan);
  }

  sendDataToAdmin(data) {
    // В реальном проекте используйте fetch или axios
    console.log('Данные отправлены администратору:', data);
    alert('Анкета отправлена! Ожидайте персональный план.');
  }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  new NutritionPlanner();
});

// Math Learning App - Fixed Version
class MathApp {
  constructor() {
    console.log('🎓 MathApp constructor called');
    
    // In-memory data storage (localStorage simulation blocked in sandbox)
    this.storageData = {
      mathApp_userData: null,
      mathApp_settings: null,
      mathApp_version: '1.0'
    };
    
    // Initialize core properties with proper validation
    this.users = [];
    this.currentUser = null;
    this.currentLanguage = 'he';
    
    // Data persistence configuration
    this.saveDebounceMs = 1000;
    this.saveTimeout = null;
    
    // Language and translation data
    this.languages = {
      en: { code: "en", name: "English", flag: "🇺🇸", direction: "ltr" },
      ru: { code: "ru", name: "Русский", flag: "🇷🇺", direction: "ltr" },
      he: { code: "he", name: "עברית", flag: "🇮🇱", direction: "rtl" }
    };
    
    // Difficulty levels configuration
    this.difficultyLevels = {
      easy: {
        level: 1,
        color: "#4CAF50",
        stars: 1,
        icon: "⭐",
        multiplication: { min_factor1: 1, max_factor1: 5, min_factor2: 1, max_factor2: 5 },
        subtraction: { min_minuend: 5, max_minuend: 20, min_subtrahend: 1, max_subtrahend: 10 },
        division: { dividends: [2, 4, 6, 8, 10, 12, 15, 16, 18, 20], divisors: [1, 2, 3, 4, 5] },
        addition: { min_addend1: 1, max_addend1: 9, min_addend2: 1, max_addend2: 9 }
      },
      medium: {
        level: 2,
        color: "#FF9800",
        stars: 2,
        icon: "⭐⭐",
        multiplication: { min_factor1: 1, max_factor1: 10, min_factor2: 1, max_factor2: 10 },
        subtraction: { min_minuend: 10, max_minuend: 50, min_subtrahend: 1, max_subtrahend: 25 },
        division: { min_dividend: 1, max_dividend: 100, min_divisor: 1, max_divisor: 10 },
        addition: { min_addend1: 10, max_addend1: 89, min_addend2: 5, max_addend2: 49 }
      },
      hard: {
        level: 3,
        color: "#F44336",
        stars: 3,
        icon: "⭐⭐⭐",
        multiplication: { min_factor1: 10, max_factor1: 999, min_factor2: 10, max_factor2: 99 },
        subtraction: { min_minuend: 100, max_minuend: 9999, min_subtrahend: 50, max_subtrahend: 999 },
        division: { min_quotient: 10, max_quotient: 200, min_divisor: 12, max_divisor: 99 },
        addition: { min_addend1: 100, max_addend1: 999, min_addend2: 50, max_addend2: 999 }
      }
    };
    
    // Pre-generated hard division problems to ensure exact results
    this.hardDivisionProblems = [
      [1024, 16, 64], [1488, 24, 62], [2304, 48, 48], [1764, 36, 49], [936, 12, 78],
      [1680, 35, 48], [2016, 42, 48], [1890, 27, 70], [2112, 33, 64], [1560, 26, 60],
      [2088, 29, 72], [1944, 54, 36], [2352, 56, 42], [1728, 32, 54], [2280, 38, 60],
      [1650, 25, 66], [2268, 63, 36], [1800, 45, 40], [2016, 28, 72], [1512, 21, 72],
      [2340, 39, 60], [1872, 52, 36], [2205, 45, 49], [1596, 28, 57], [2080, 65, 32],
      [1755, 39, 45], [2108, 44, 47], [1848, 33, 56], [2275, 35, 65], [1632, 24, 68]
    ];
    
    this.currentDifficulty = 'easy';
    
    this.translations = {
      en: {
        app_title: "🎓 Math Adventure! 🎓",
        welcome: "Choose your profile or create a new one!",
        create_user: "Create New User",
        select_user: "Select User",
        enter_name: "Enter your name",
        start_learning: "Start Learning!",
        multiplication: "Multiplication",
        subtraction: "Subtraction",
        division: "Division",
        addition: "Addition",
        start_exercise: "Start Exercise",
        daily_progress: "Today's Progress",
        success_rate: "Success Rate",
        current_streak: "Current Streak",
        choose_exercise: "Choose Your Exercise",
        your_achievements: "Your Achievements",
        view_progress: "View Detailed Progress",
        your_score: "Your Score",
        settings: "Settings",
        language: "Language",
        switch_user: "Switch User",
        download_app: "Download App",
        back: "← Back",
        next: "Next",
        finish: "Finish",
        solve_problem: "Solve the problem:",
        solve_addition_problem: "Solve the addition problem:",
        enter_answer: "Your answer",
        submit: "Submit",
        correct: "Correct!",
        incorrect: "Try again!",
        great_job: "Great job!",
        excellent_work: "Excellent Work!",
        correct_answers: "Correct",
        incorrect_answers: "Incorrect",
        try_again: "Try Again",
        different_exercise: "Try Different Exercise",
        back_to_dashboard: "Back to Dashboard",
        your_progress: "Your Progress",
        overall_stats: "Overall Statistics",
        total_exercises: "Total Exercises",
        total_correct: "Total Correct",
        best_streak: "Best Streak",
        days_practiced: "Days Practiced",
        exercise_breakdown: "Exercise Type Breakdown",
        exercises_completed: "exercises completed",
        completed_all: "You've completed all",
        exercises_for_today: "exercises for today! Try a different type.",
        difficulty: "Difficulty",
        difficulty_easy: "Easy",
        difficulty_medium: "Medium",
        difficulty_hard: "Hard",
        difficulty_description_easy: "Perfect for beginners! Simple single-digit problems.",
        difficulty_description_medium: "Great for students with some experience.",
        difficulty_description_hard: "Advanced multi-digit problems for math experts!",
        expert_level: "Expert Level Problems!",
        multi_digit_warning: "Get ready for multi-digit challenges!",
        good_job_easy: "Great start! You're learning fast!",
        good_job_medium: "Excellent work! You're getting stronger!",
        good_job_hard: "Amazing! You're tackling expert-level math!",
        select_difficulty: "Select Difficulty Level",
        change_difficulty: "Change Difficulty",
        current_difficulty: "Current Level",
        completed_on: "Completed on",
        mastered: "Mastered!",
        try_harder: "Ready for a challenge? Try the next level!",
        good_job_easy: "Great start! You're learning fast!",
        good_job_medium: "Excellent work! You're getting stronger!",
        good_job_hard: "Amazing! You're a math champion!",
        great_addition_skills: "Great addition skills!",
        addition_master: "Addition Master!"
      },
      ru: {
        app_title: "🎓 Изучение математики! 🎓",
        welcome: "Выберите профиль или создайте новый!",
        create_user: "Создать нового пользователя",
        select_user: "Выберите пользователя",
        enter_name: "Введите ваше имя",
        start_learning: "Начать обучение!",
        multiplication: "Умножение",
        subtraction: "Вычитание",
        division: "Деление",
        addition: "Сложение",
        start_exercise: "Начать упражнение",
        daily_progress: "Ежедневный прогресс",
        success_rate: "Процент успеха",
        current_streak: "Текущая серия",
        choose_exercise: "Выберите упражнение",
        your_achievements: "Ваши достижения",
        view_progress: "Просмотр подробного прогресса",
        your_score: "Ваш результат",
        settings: "Настройки",
        language: "Язык",
        switch_user: "Сменить пользователя",
        download_app: "Скачать приложение",
        back: "← Назад",
        next: "Далее",
        finish: "Завершить",
        solve_problem: "Решите пример:",
        solve_addition_problem: "Решите пример на сложение:",
        enter_answer: "Ваш ответ",
        submit: "Отправить",
        correct: "Правильно!",
        incorrect: "Попробуйте ещё!",
        great_job: "Отличная работа!",
        excellent_work: "Превосходная работа!",
        correct_answers: "Правильные",
        incorrect_answers: "Неправильные",
        try_again: "Попробовать снова",
        different_exercise: "Другое упражнение",
        back_to_dashboard: "Назад к панели",
        your_progress: "Ваш прогресс",
        overall_stats: "Общая статистика",
        total_exercises: "Всего упражнений",
        total_correct: "Всего правильных",
        best_streak: "Лучшая серия",
        days_practiced: "Дней занятий",
        exercise_breakdown: "Разбивка по типам упражнений",
        exercises_completed: "упражнений выполнено",
        completed_all: "Вы выполнили все",
        exercises_for_today: "упражнения на сегодня! Попробуйте другой тип.",
        difficulty: "Сложность",
        difficulty_easy: "Лёгкий",
        difficulty_medium: "Средний",
        difficulty_hard: "Сложный",
        difficulty_description_easy: "Идеально для начинающих! Простые примеры с одной цифрой.",
        difficulty_description_medium: "Отлично для учеников с некоторым опытом.",
        difficulty_description_hard: "Продвинутые многозначные примеры для экспертов математики!",
        expert_level: "Экспертные задачи!",
        multi_digit_warning: "Готовьтесь к многозначным испытаниям!",
        good_job_easy: "Отличное начало! Вы быстро учитесь!",
        good_job_medium: "Превосходная работа! Вы становитесь сильнее!",
        good_job_hard: "Потрясающе! Вы решаете задачи экспертного уровня!",
        select_difficulty: "Выберите уровень сложности",
        change_difficulty: "Изменить сложность",
        current_difficulty: "Текущий уровень",
        completed_on: "Завершено на",
        mastered: "Освоено!",
        try_harder: "Готовы к испытанию? Попробуйте следующий уровень!",
        good_job_easy: "Отличное начало! Вы быстро учитесь!",
        good_job_medium: "Превосходная работа! Вы становитесь сильнее!",
        good_job_hard: "Потрясающе! Вы чемпион по математике!",
        great_addition_skills: "Отличные навыки сложения!",
        addition_master: "Мастер сложения!"
      },
      he: {
        app_title: "🎓 הרפתקת מתמטיקה! 🎓",
        welcome: "בחר פרופיל או צור חדש!",
        create_user: "צור משתמש חדש",
        select_user: "בחר משתמש",
        enter_name: "הכנס את שמך",
        start_learning: "התחל ללמוד!",
        multiplication: "כפל",
        subtraction: "חיסור",
        division: "חילוק",
        addition: "חיבור",
        start_exercise: "התחל תרגיל",
        daily_progress: "התקדמות יומית",
        success_rate: "אחוז הצלחה",
        current_streak: "רצף נוכחי",
        choose_exercise: "בחר תרגיל",
        your_achievements: "ההישגים שלך",
        view_progress: "צפה בהתקדמות מפורטת",
        your_score: "הציון שלך",
        settings: "הגדרות",
        language: "שפה",
        switch_user: "החלף משתמש",
        download_app: "הורד אפליקציה",
        back: "חזור ←",
        next: "הבא",
        finish: "סיים",
        solve_problem: "פתור את הבעיה:",
        solve_addition_problem: "פתור את בעיית החיבור:",
        enter_answer: "התשובה שלך",
        submit: "שלח",
        correct: "נכון!",
        incorrect: "נסה שוב!",
        great_job: "עבודה מצוינת!",
        excellent_work: "עבודה מצוינת!",
        correct_answers: "נכונות",
        incorrect_answers: "שגויות",
        try_again: "נסה שוב",
        different_exercise: "תרגיל אחר",
        back_to_dashboard: "חזור ללוח הבקרה",
        your_progress: "ההתקדמות שלך",
        overall_stats: "סטטיסטיקות כלליות",
        total_exercises: "סך התרגילים",
        total_correct: "סך הנכונות",
        best_streak: "הרצף הטוב ביותר",
        days_practiced: "ימי תרגול",
        exercise_breakdown: "פילוח לפי סוגי תרגילים",
        exercises_completed: "תרגילים הושלמו",
        completed_all: "השלמת את כל",
        exercises_for_today: "התרגילים ליום! נסה סוג אחר.",
        difficulty: "רמת קושי",
        difficulty_easy: "קל",
        difficulty_medium: "בינוני",
        difficulty_hard: "קשה",
        difficulty_description_easy: "מושלם למתחילים! בעיות פשוטות עם ספרה אחת.",
        difficulty_description_medium: "נהדר לתלמידים עם קצת ניסיון.",
        difficulty_description_hard: "בעיות מתקדמות מרובות ספרות למומחי מתמטיקה!",
        expert_level: "בעיות ברמת מומחה!",
        multi_digit_warning: "התכונן לאתגרים רב-ספרתיים!",
        good_job_easy: "התחלה נהדרת! אתה לומד מהר!",
        good_job_medium: "עבודה מצוינת! אתה נעשה חזק יותר!",
        good_job_hard: "מדהים! אתה פותר בעיות ברמת מומחה!",
        select_difficulty: "בחר רמת קושי",
        change_difficulty: "שנה רמת קושי",
        current_difficulty: "רמה נוכחית",
        completed_on: "הושלם ברמה",
        mastered: "שולט!",
        try_harder: "מוכן לאתגר? נסה את הרמה הבאה!",
        good_job_easy: "התחלה נהדרת! אתה לומד מהר!",
        good_job_medium: "עבודה מצוינת! אתה נעשה חזק יותר!",
        good_job_hard: "מדהים! אתה אלוף במתמטיקה!",
        great_addition_skills: "כישורי חיבור מעולים!",
        addition_master: "מומחה חיבור!"
      }
    };
    this.currentExercise = {
      type: null,
      questions: [],
      currentQuestion: 0,
      answers: [],
      startTime: null
    };
    
    // App configuration
    this.exerciseTypes = {
      multiplication: { name: 'Multiplication', symbol: '×', color: '#FF6B6B', range: [1, 12] },
      subtraction: { name: 'Subtraction', symbol: '−', color: '#4ECDC4', range: [1, 100] },
      division: { name: 'Division', symbol: '÷', color: '#45B7D1', range: [1, 12] },
      addition: { name: 'Addition', symbol: '+', color: '#9C27B0', range: [1, 20] }
    };
    
    this.avatars = ['🐱', '🐶', '🐼', '🦁', '🐸', '🐙', '🦄', '🐧'];
    
    this.achievements = {
      first_steps: {
        en: { name: 'First Steps', description: 'Complete your first exercise' },
        ru: { name: 'Первые шаги', description: 'Выполните ваше первое упражнение' },
        he: { name: 'צעדים ראשונים', description: 'השלם את התרגיל הראשון שלך' },
        icon: '🌟'
      },
      easy_master: {
        en: { name: 'Easy Master', description: 'Complete 50 easy exercises with 90%+ accuracy' },
        ru: { name: 'Мастер лёгкого уровня', description: 'Выполните 50 лёгких упражнений с точностью 90%+' },
        he: { name: 'שולט ברמה הקלה', description: 'השלם 50 תרגילים קלים עם דיוק של 90%+' },
        icon: '🍏'
      },
      medium_master: {
        en: { name: 'Medium Master', description: 'Complete 50 medium exercises with 90%+ accuracy' },
        ru: { name: 'Мастер среднего уровня', description: 'Выполните 50 средних упражнений с точностью 90%+' },
        he: { name: 'שולט ברמה הבינונית', description: 'השלם 50 תרגילים בינוניים עם דיוק של 90%+' },
        icon: '🥉'
      },
      hard_master: {
        en: { name: 'Hard Master', description: 'Complete 50 hard exercises with 90%+ accuracy' },
        ru: { name: 'Мастер сложного уровня', description: 'Выполните 50 сложных упражнений с точностью 90%+' },
        he: { name: 'שולט ברמה הקשה', description: 'השלם 50 תרגילים קשים עם דיוק של 90%+' },
        icon: '🔥'
      },
      daily_warrior: {
        en: { name: 'Daily Warrior', description: 'Complete all daily exercises' },
        ru: { name: 'Ежедневный воин', description: 'Выполните все ежедневные упражнения' },
        he: { name: 'לוחם יומי', description: 'השלם את כל התרגילים היומיים' },
        icon: '🏆'
      },
      perfect_score: {
        en: { name: 'Perfect Score', description: 'Get 100% on an exercise set' },
        ru: { name: 'Идеальный результат', description: 'Получите 100% в наборе упражнений' },
        he: { name: 'ציון מושלם', description: 'קבל 100% בסט תרגילים' },
        icon: '💯'
      },
      week_streak: {
        en: { name: 'Week Streak', description: 'Practice for 7 days in a row' },
        ru: { name: 'Недельная серия', description: 'Занимайтесь 7 дней подряд' },
        he: { name: 'רצף שבועי', description: 'תרגל 7 ימים ברצף' },
        icon: '🔥'
      },
      addition_beginner: {
        en: { name: 'Addition Beginner', description: 'Complete 10 easy addition exercises' },
        ru: { name: 'Новичок в сложении', description: 'Выполните 10 лёгких упражнений на сложение' },
        he: { name: 'מתחיל בחיבור', description: 'השלם 10 תרגילי חיבור קלים' },
        icon: '➕'
      },
      addition_expert: {
        en: { name: 'Addition Expert', description: 'Complete 50 hard addition exercises with 80%+ accuracy' },
        ru: { name: 'Эксперт сложения', description: 'Выполните 50 сложных упражнений на сложение с точностью 80%+' },
        he: { name: 'מומחה חיבור', description: 'השלם 50 תרגילי חיבור קשים עם דיוק של 80%+' },
        icon: '🎯'
      }
    };
    
    this.encouragingMessagesByDifficulty = {
      easy: {
        correct: {
          en: ["Great start!", "You're learning!", "Keep it up!", "Nice work!", "Well done!"],
          ru: ["Отличное начало!", "Вы учитесь!", "Продолжайте!", "Хорошая работа!", "Молодец!"],
          he: ["התחלה נהדרת!", "אתה לומד!", "המשך כך!", "עבודה יפה!", "כל הכבוד!"]
        },
        incorrect: {
          en: ["Try again!", "You can do it!", "Almost there!", "Keep trying!", "Don't give up!"],
          ru: ["Попробуйте снова!", "У вас получится!", "Почти!", "Продолжайте стараться!", "Не сдавайтесь!"],
          he: ["נסה שוב!", "אתה יכול!", "כמעט שם!", "המשך לנסות!", "אל תוותר!"]
        }
      },
      medium: {
        correct: {
          en: ["Excellent work!", "You're getting stronger!", "Great progress!", "Impressive!", "Keep going!"],
          ru: ["Отличная работа!", "Вы становитесь сильнее!", "Отличный прогресс!", "Впечатляюще!", "Продолжайте!"],
          he: ["עבודה מצוינת!", "אתה נעשה חזק יותר!", "התקדמות נהדרת!", "מרשים!", "המשך!"]
        },
        incorrect: {
          en: ["Close!", "Try once more!", "You're improving!", "Almost got it!", "Keep practicing!"],
          ru: ["Близко!", "Попробуйте ещё раз!", "Вы улучшаетесь!", "Почти получилось!", "Продолжайте тренироваться!"],
          he: ["קרוב!", "נסה עוד פעם!", "אתה משתפר!", "כמעט הצלחת!", "המשך להתאמן!"]
        }
      },
      hard: {
        correct: {
          en: ["Incredible calculation!", "Math genius!", "Expert level work!", "Outstanding problem solving!", "You're mastering complex math!"],
          ru: ["Невероятные вычисления!", "Гений математики!", "Работа экспертного уровня!", "Выдающееся решение задач!", "Вы осваиваете сложную математику!"],
          he: ["חישוב בלתי רגיל!", "גאון במתמטיקה!", "עבודה ברמת מומחה!", "פתרון בעיות יוצא מן הכלל!", "אתה שולט במתמטיקה מורכבת!"]
        },
        incorrect: {
          en: ["Complex problem - try again!", "Multi-digit math is challenging!", "You're tackling expert problems!", "Keep working on it!", "Advanced math takes practice!"],
          ru: ["Сложная задача - попробуйте снова!", "Многозначная математика сложна!", "Вы решаете экспертные задачи!", "Продолжайте работать!", "Продвинутая математика требует практики!"],
          he: ["בעיה מורכבת - נסה שוב!", "מתמטיקה רב-ספרתית מאתגרת!", "אתה מתמודד עם בעיות מומחה!", "המשך לעבוד על זה!", "מתמטיקה מתקדמת דורשת תרגול!"]
        },
        addition: {
          correct: {
            en: ["Excellent addition!", "Great addition skills!", "You're an addition expert!", "Perfect work!", "Accurate addition!"],
            ru: ["Отличное сложение!", "Прекрасные навыки сложения!", "Вы эксперт по сложению!", "Идеальная работа!", "Точное сложение!"],
            he: ["חיבור מצוין!", "כישורי חיבור נהדרים!", "אתה מומחה בחיבור!", "עבודה מושלמת!", "חיבור מדויק!"]
          },
          incorrect: {
            en: ["Try the addition again!", "Addition needs practice!", "Almost got it!", "Keep practicing addition!", "Don't give up on addition!"],
            ru: ["Попробуйте сложение снова!", "Сложение требует практики!", "Почти получилось!", "Продолжайте тренировать сложение!", "Не сдавайтесь в сложении!"],
            he: ["נסה שוב את החיבור!", "חיבור דורש תרגול!", "כמעט הצלחת!", "המשך לתרגל חיבור!", "אל תוותר על החיבור!"]
          }
        }
      }
    };
    
    this.currentScreen = 'user-selection';
    
    console.log('MathApp constructor completed, starting initialization...');
    this.init();
  }
  
  validateMethods() {
    console.log('Validating methods...');
    
    const requiredMethods = [
      'saveToStorage', 'getFromStorage', 'loadUsersFromStorage',
      'createUser', 'createUserWithFullStructure', 'bindEvents',
      'showScreen', 'updateLanguage', 'translate'
    ];
    
    const missingMethods = requiredMethods.filter(method => {
      const exists = typeof this[method] === 'function';
      if (!exists) {
        console.error(`⚠️ Method ${method} is not defined or not a function`);
      }
      return !exists;
    });
    
    if (missingMethods.length > 0) {
      throw new Error(`Missing required methods: ${missingMethods.join(', ')}`);
    }
    
    console.log('✅ All required methods validated successfully');
  }
  
  init() {
    console.log('Initializing Math App...');
    
    try {
      this.showLoadingIndicator();
      
      setTimeout(() => {
        try {
          console.log('Starting initialization sequence...');
          
          this.detectLanguage();
          console.log('Language detected:', this.currentLanguage);
          
          this.bindEvents();
          console.log('Events bound successfully');
          
          this.loadUsersFromStorage();
          console.log('Users loaded, count:', this.users.length);
          
          this.showScreen('user-selection');
          console.log('Screen shown: user-selection');
          
          this.renderUserSelection();
          console.log('User selection rendered');
          
          this.renderAvatarSelection();
          console.log('Avatar selection rendered');
          
          this.updateLanguage();
          console.log('Language updated');
          
          this.hideLoadingIndicator();
          console.log('Loading indicator hidden');
          
          // Show welcome message if returning user
          if (this.users.length > 0) {
            this.showDataRestoredMessage();
            console.log('Welcome message shown for returning user');
          }
          
          console.log('✅ Math App initialized successfully!');
          
        } catch (error) {
          console.error('⚠️ Error during initialization:', error);
          this.hideLoadingIndicator();
          
          const errorMsg = this.currentLanguage === 'he' ? 'שגיאה באיניציאליזציה' :
                          this.currentLanguage === 'ru' ? 'Ошибка инициализации' :
                          'Initialization error';
          alert(errorMsg + ': ' + error.message);
        }
      }, 500); // Simulate loading time
      
    } catch (error) {
      console.error('⚠️ Critical initialization error:', error);
      alert('Critical error starting the app: ' + error.message);
    }
  }
  
  showLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
      indicator.style.display = 'block';
    }
  }
  
  hideLoadingIndicator() {
    const indicator = document.getElementById('loading-indicator');
    if (indicator) {
      indicator.style.display = 'none';
    }
  }
  
  detectLanguage() {
    // Set Hebrew as default language, with fallback to browser language
    this.currentLanguage = 'he';
    // Uncomment below for auto-detection based on browser language
    // const browserLang = navigator.language.substring(0, 2);
    // if (this.languages[browserLang]) {
    //   this.currentLanguage = browserLang;
    // } else {
    //   this.currentLanguage = 'he';
    // }
  }
  
  setLanguage(langCode) {
    if (this.languages[langCode]) {
      this.currentLanguage = langCode;
      this.updateLanguage();
      this.saveToStorage(); // Save language preference
    }
  }
  
  updateLanguage() {
    const lang = this.languages[this.currentLanguage];
    const translations = this.translations[this.currentLanguage];
    
    // Set document direction
    document.documentElement.dir = lang.direction;
    document.documentElement.lang = lang.code;
    
    // Update all elements with data-i18n attributes
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[key]) {
        element.textContent = translations[key];
      }
    });
    
    // Update placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (translations[key]) {
        element.placeholder = translations[key];
      }
    });
    
    // Update language selectors
    document.querySelectorAll('#language-select, #main-language-select').forEach(select => {
      select.value = this.currentLanguage;
    });
    
    // Update page title
    document.title = translations.app_title || 'Math Adventure';
    
    // Update exercise type names in data structures
    this.exerciseTypes.multiplication.name = translations.multiplication;
    this.exerciseTypes.subtraction.name = translations.subtraction;
    this.exerciseTypes.division.name = translations.division;
  }
  
  translate(key) {
    return this.translations[this.currentLanguage][key] || key;
  }
  
  // Load users from storage simulation or start with empty array
  loadUsersFromStorage() {
    try {
      const savedData = this.getFromStorage('mathApp_userData');
      if (savedData && savedData.users && Array.isArray(savedData.users)) {
        // Validate and clean each user object
        this.users = savedData.users.filter(user => {
          return user && user.id && user.name;
        }).map(user => {
          // Ensure all required properties exist with fallbacks
          return {
            ...user,
            id: user.id || Date.now().toString(),
            createdDate: user.createdDate || user.createdAt || new Date().toISOString(),
            language: user.language || 'he',
            currentDifficulty: user.currentDifficulty || user.difficultyPreference || 'easy',
            stats: user.stats || {
              totalExercises: 0,
              totalCorrect: 0,
              currentStreak: 0,
              bestStreak: 0,
              daysPracticed: 0,
              lastPracticeDate: null
            },
            exerciseStats: user.exerciseStats || {
              multiplication: { total: 0, correct: 0 },
              subtraction: { total: 0, correct: 0 },
              division: { total: 0, correct: 0 },
              addition: { total: 0, correct: 0 }
            },
            dailyProgress: user.dailyProgress || {
              date: this.getTodayString(),
              multiplication: 0,
              subtraction: 0,
              division: 0,
              addition: 0
            },
            achievements: user.achievements || [],
            difficultyStats: user.difficultyStats || {
              easy: { total: 0, correct: 0 },
              medium: { total: 0, correct: 0 },
              hard: { total: 0, correct: 0 }
            },
            exerciseHistory: user.exerciseHistory || []
          };
        });
        
        // Restore last active user if exists
        if (savedData.appSettings && savedData.appSettings.lastActiveUser) {
          this.currentUser = this.users.find(u => u && u.id === savedData.appSettings.lastActiveUser);
          if (this.currentUser) {
            this.currentDifficulty = this.currentUser.difficultyPreference || this.currentUser.currentDifficulty || 'easy';
          }
        }
        
        console.log(`✅ Loaded ${this.users.length} users from storage`);
      } else {
        // Start with empty user list - force users to create their own profiles
        this.users = [];
        console.log('🆕 Starting with empty user list - create your first user!');
      }
    } catch (error) {
      console.warn('⚠️ Error loading user data, starting fresh:', error);
      this.users = [];
    }
    
    this.validateAndCleanupData();
  }
  
  bindEvents() {
    console.log('Binding events...');
    
    // User selection events with proper error handling
    const createUserBtn = document.getElementById('create-user-btn');
    if (createUserBtn) {
      createUserBtn.addEventListener('click', (e) => {
        console.log('Create user button clicked');
        try {
          this.createUser();
        } catch (error) {
          console.error('❌ Error in createUser:', error);
          const errorMsg = this.currentLanguage === 'he' ? 'שגיאה ביצירת משתמש' :
                          this.currentLanguage === 'ru' ? 'Ошибка создания пользователя' :
                          'Error creating user';
          alert(errorMsg + ': ' + error.message);
        }
      });
    } else {
      console.warn('⚠️ Create user button not found');
    }
    
    const switchUserBtn = document.getElementById('switch-user-btn');
    if (switchUserBtn) {
      switchUserBtn.addEventListener('click', () => this.showScreen('user-selection'));
    }
    
    // Dashboard events
    document.querySelectorAll('.exercise-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.startExercise(e.currentTarget.dataset.type));
    });
    
    // Difficulty selection events
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.addEventListener('click', (e) => this.selectDifficulty(e.currentTarget.dataset.difficulty));
    });
    document.getElementById('change-difficulty-btn')?.addEventListener('click', () => this.showDifficultySelector());
    document.getElementById('view-progress-btn').addEventListener('click', () => this.showScreen('progress'));
    
    // Exercise events
    document.getElementById('back-to-dashboard').addEventListener('click', () => this.showScreen('dashboard'));
    document.getElementById('submit-answer').addEventListener('click', () => this.submitAnswer());
    document.getElementById('next-question').addEventListener('click', () => this.nextQuestion());
    document.getElementById('answer-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.submitAnswer();
    });
    
    // Results events
    document.getElementById('try-again-btn').addEventListener('click', () => this.retryExercise());
    document.getElementById('different-exercise-btn').addEventListener('click', () => this.showScreen('dashboard'));
    document.getElementById('back-dashboard-btn').addEventListener('click', () => this.showScreen('dashboard'));
    
    // Progress events
    document.getElementById('back-from-progress').addEventListener('click', () => this.showScreen('dashboard'));
    
    // Language selection events
    document.getElementById('language-select')?.addEventListener('change', (e) => this.setLanguage(e.target.value));
    document.getElementById('main-language-select')?.addEventListener('change', (e) => this.setLanguage(e.target.value));
    
    // Download app event
    document.getElementById('download-app-btn')?.addEventListener('click', () => this.downloadApp());
    
    // Avatar selection events
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('avatar-option')) {
        document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
        e.target.classList.add('selected');
      }
      if (e.target.classList.contains('user-card')) {
        const userId = e.target.dataset.userId;
        if (userId) {
          this.selectUser(userId);
        } else {
          console.error('❌ User ID not found on user card');
        }
      }
    });
  }
  
  showScreen(screenName) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenName).classList.add('active');
    this.currentScreen = screenName;
    
    // Update screen-specific content
    if (screenName === 'dashboard' && this.currentUser) {
      this.updateDashboard();
    } else if (screenName === 'progress' && this.currentUser) {
      this.updateProgressScreen();
    } else if (screenName === 'exercise' && this.currentUser) {
      this.updateDifficultyDisplay();
    }
    
    // Re-apply translations when switching screens
    this.updateLanguage();
  }
  
  renderUserSelection() {
    const container = document.getElementById('existing-users');
    if (!container) {
      console.error('❌ existing-users container not found');
      return;
    }
    
    container.innerHTML = '';
    
    if (!this.users || this.users.length === 0) {
      // Show "no users" message when starting fresh
      const noUsersMessage = document.createElement('div');
      noUsersMessage.className = 'no-users-message';
      noUsersMessage.style.cssText = `
        text-align: center;
        padding: 40px 20px;
        background: var(--color-bg-2);
        border-radius: var(--radius-lg);
        border: 2px dashed var(--color-border);
        margin: 20px 0;
      `;
      
      const noUsersTitle = this.currentLanguage === 'he' ? 'אין משתמשים' :
                           this.currentLanguage === 'ru' ? 'Нוт пользоватוлוй' :
                           'No Users';
      const createFirstUser = this.currentLanguage === 'he' ? 'צור את המשתמש הראשון שלך' :
                              this.currentLanguage === 'ru' ? 'Создайтו своוго пוрвого пользоватוля' :
                              'Create Your First User';
      
      noUsersMessage.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 16px;">👤✨</div>
        <h3 style="margin-bottom: 8px; color: var(--color-text);">${noUsersTitle}</h3>
        <p style="color: var(--color-text-secondary); margin-bottom: 0;">${createFirstUser}</p>
      `;
      
      container.appendChild(noUsersMessage);
    } else {
      // Show existing users
      this.users.filter(user => user && user.id && user.name).forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.dataset.userId = user.id;
        
        const userStats = user.stats || { totalExercises: 0, totalCorrect: 0, currentStreak: 0 };
        const successRate = userStats.totalExercises > 0 
          ? Math.round((userStats.totalCorrect / userStats.totalExercises) * 100)
          : 0;
        
        const streakText = this.currentLanguage === 'he' ? 'רצף' :
                          this.currentLanguage === 'ru' ? 'Сוрия' :
                          'Streak';
        const successText = this.currentLanguage === 'he' ? 'אחוז הצלחה' :
                           this.currentLanguage === 'ru' ? 'Успוх' :
                           'Success Rate';
        const daysText = this.currentLanguage === 'he' ? 'ימים' :
                        this.currentLanguage === 'ru' ? 'днוй' :
                        'days';
        
        userCard.innerHTML = `
          <div class="user-avatar">${user.avatar}</div>
          <div class="user-name">${user.name}</div>
          <div class="user-stats">
            ${successText}: ${successRate}%<br>
            ${streakText}: ${userStats.currentStreak || 0} ${daysText}
          </div>
        `;
        
        container.appendChild(userCard);
      });
    }
  }
  
  renderAvatarSelection() {
    const container = document.getElementById('avatar-selection');
    container.innerHTML = '';
    
    this.avatars.forEach(avatar => {
      const avatarDiv = document.createElement('div');
      avatarDiv.className = 'avatar-option';
      avatarDiv.textContent = avatar;
      container.appendChild(avatarDiv);
    });
  }
  
  createUser() {
    console.log('Creating user...');
    
    const nameInput = document.getElementById('new-user-name');
    const selectedAvatar = document.querySelector('.avatar-option.selected');
    
    if (!nameInput || !nameInput.value.trim()) {
      const enterNameMsg = this.currentLanguage === 'he' ? 'אנא הכנס שם!' : 
                          this.currentLanguage === 'ru' ? 'Пожалуйста, введите имя!' : 
                          'Please enter a name!';
      alert(enterNameMsg);
      return;
    }
    
    if (!selectedAvatar) {
      const chooseAvatarMsg = this.currentLanguage === 'he' ? 'אנא בחר אווטר!' : 
                             this.currentLanguage === 'ru' ? 'Пожалуйста, выберите аватар!' : 
                             'Please choose an avatar!';
      alert(chooseAvatarMsg);
      return;
    }
    
    try {
      const userName = nameInput.value.trim();
      const userAvatar = selectedAvatar.textContent;
      
      if (!userName || !userAvatar) {
        throw new Error('User name and avatar are required');
      }
      
      const newUser = this.createUserWithFullStructure(userName, userAvatar);
      
      if (!newUser || !newUser.id) {
        throw new Error('Failed to create user object with required properties');
      }
      
      this.users.push(newUser);
      
      // Save user data immediately
      this.saveToStorage();
      
      // Show success message
      const successMsg = this.currentLanguage === 'he' ? 'משתמש נוצר בהצלחה!' :
                        this.currentLanguage === 'ru' ? 'Пользователь успешно создан!' :
                        'User created successfully!';
      console.log(successMsg, 'User ID:', newUser.id);
      
      this.selectUser(newUser.id);
      
      // Clear form
      nameInput.value = '';
      document.querySelectorAll('.avatar-option').forEach(opt => opt.classList.remove('selected'));
      
    } catch (error) {
      const errorMsg = this.currentLanguage === 'he' ? 'שגיאה ביצירת משתמש:' :
                      this.currentLanguage === 'ru' ? 'Ошибка создания пользователя:' :
                       'Error creating user:';
      console.error(errorMsg, error);
      alert(errorMsg + ' ' + error.message);
    }
  }
  
  selectUser(userId) {
    if (!userId) {
      console.error('User ID is required');
      return;
    }
    
    this.currentUser = this.users.find(user => user && user.id === userId);
    if (this.currentUser && this.currentUser.id) {
      this.currentDifficulty = this.currentUser.difficultyPreference || 'easy';
      this.saveToStorage(); // Save last active user
      this.showScreen('dashboard');
      console.log('✅ User selected successfully:', this.currentUser.name);
    } else {
      console.error('❌ User not found or invalid:', userId);
      const errorMsg = this.currentLanguage === 'he' ? 'משתמש לא נמצא' :
                      this.currentLanguage === 'ru' ? 'Пользователь не найден' :
                      'User not found';
      alert(errorMsg);
    }
  }
  
  selectDifficulty(difficulty) {
    this.currentDifficulty = difficulty;
    if (this.currentUser) {
      this.currentUser.difficultyPreference = difficulty;
      this.saveToStorage(); // Save difficulty change
    }
    
    // Update UI
    this.updateDifficultyDisplay();
    this.hideDifficultySelector();
  }
  
  showDifficultySelector() {
    const selector = document.querySelector('.difficulty-selector');
    const currentDisplay = document.querySelector('.current-difficulty-display');
    if (selector && currentDisplay) {
      selector.style.display = 'grid';
      currentDisplay.style.display = 'none';
    }
  }
  
  hideDifficultySelector() {
    const selector = document.querySelector('.difficulty-selector');
    const currentDisplay = document.querySelector('.current-difficulty-display');
    if (selector && currentDisplay) {
      selector.style.display = 'none';
      currentDisplay.style.display = 'flex';
    }
  }
  
  updateDifficultyDisplay() {
    const difficultyConfig = this.difficultyLevels[this.currentDifficulty];
    const difficultyText = this.translate(`difficulty_${this.currentDifficulty}`);
    const difficultyBadge = `${difficultyText} ${difficultyConfig.icon}`;
    
    // Update current difficulty display
    const currentDifficultyText = document.getElementById('current-difficulty-text');
    if (currentDifficultyText) {
      currentDifficultyText.textContent = difficultyBadge;
      currentDifficultyText.className = `difficulty-badge ${this.currentDifficulty}`;
    }
    
    // Update exercise screen difficulty indicator
    const exerciseDifficultyBadge = document.getElementById('exercise-difficulty-badge');
    if (exerciseDifficultyBadge) {
      exerciseDifficultyBadge.textContent = difficultyBadge;
      exerciseDifficultyBadge.className = `difficulty-badge ${this.currentDifficulty}`;
    }
    
    // Update results screen difficulty indicator
    const resultsDifficultyBadge = document.getElementById('results-difficulty-badge');
    if (resultsDifficultyBadge) {
      resultsDifficultyBadge.textContent = difficultyBadge;
      resultsDifficultyBadge.className = `difficulty-badge ${this.currentDifficulty}`;
    }
    
    // Update difficulty selector buttons
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
      btn.classList.remove('selected');
      if (btn.dataset.difficulty === this.currentDifficulty) {
        btn.classList.add('selected');
      }
    });
  }
  
  updateDashboard() {
    if (!this.currentUser) return;
    
    // Update user info
    document.getElementById('current-user-avatar').textContent = this.currentUser.avatar;
    const welcomeText = this.currentLanguage === 'he' ? 
      `ברוך הבא, ${this.currentUser.name}!` :
      this.currentLanguage === 'ru' ?
      `Добро пожаловать, ${this.currentUser.name}!` :
      `Welcome, ${this.currentUser.name}!`;
    document.getElementById('current-user-name').textContent = welcomeText;
    
    // Add expert streak indicator for advanced users
    const streakCard = document.getElementById('streak-card');
    const expertStreakBadge = document.getElementById('expert-streak-badge');
    if (this.currentDifficulty === 'hard' && this.currentUser.stats.currentStreak >= 5) {
      if (streakCard) streakCard.classList.add('hard-focus');
      if (expertStreakBadge) expertStreakBadge.style.display = 'block';
    } else {
      if (streakCard) streakCard.classList.remove('hard-focus');
      if (expertStreakBadge) expertStreakBadge.style.display = 'none';
    }
    
    // Update difficulty system
    this.currentDifficulty = this.currentUser.difficultyPreference || 'easy';
    this.updateDifficultyDisplay();
    this.hideDifficultySelector();
    
    // Update daily progress
    this.updateDailyProgressIfNeeded();
    const todayTotal = this.currentUser.dailyProgress.multiplication + 
                      this.currentUser.dailyProgress.subtraction + 
                      this.currentUser.dailyProgress.division +
                      this.currentUser.dailyProgress.addition;
    const dailyProgressPercent = Math.round((todayTotal / 40) * 100); // 40 total (10 per type)
    document.getElementById('daily-progress').innerHTML = `<span class="progress-text">${dailyProgressPercent}%</span>`;
    
    // Update progress circle with difficulty-specific styling
    const progressCircle = document.getElementById('daily-progress');
    const progressCard = document.getElementById('progress-card');
    const angle = (dailyProgressPercent / 100) * 360;
    
    if (this.currentDifficulty === 'hard') {
      progressCircle.classList.add('hard-level');
      progressCard.classList.add('hard-focus');
      progressCircle.style.background = `conic-gradient(var(--color-difficulty-hard) ${angle}deg, var(--color-bg-4) ${angle}deg)`;
    } else {
      progressCircle.classList.remove('hard-level');
      progressCard.classList.remove('hard-focus');
      progressCircle.style.background = `conic-gradient(var(--color-primary) ${angle}deg, var(--color-bg-1) ${angle}deg)`;
    }
    
    // Update success rate
    const successRate = this.currentUser.stats.totalExercises > 0 
      ? Math.round((this.currentUser.stats.totalCorrect / this.currentUser.stats.totalExercises) * 100)
      : 0;
    document.getElementById('success-rate').textContent = `${successRate}%`;
    
    // Update streak
    document.getElementById('current-streak').textContent = `${this.currentUser.stats.currentStreak} 🔥`;
    
    // Update exercise progress with proper translations
    const todayText = this.currentLanguage === 'he' ? 'היום' :
                     this.currentLanguage === 'ru' ? 'сוгодня' :
                     'today';
    
    document.getElementById('mult-progress').textContent = `${this.currentUser.dailyProgress.multiplication}/10 ${todayText}`;
    document.getElementById('sub-progress').textContent = `${this.currentUser.dailyProgress.subtraction}/10 ${todayText}`;
    document.getElementById('div-progress').textContent = `${this.currentUser.dailyProgress.division}/10 ${todayText}`;
    document.getElementById('add-progress').textContent = `${this.currentUser.dailyProgress.addition}/10 ${todayText}`;
    
    // Update achievements
    this.renderAchievements();
  }
  
  updateDailyProgressIfNeeded() {
    const today = this.getTodayString();
    if (this.currentUser.dailyProgress.date !== today) {
      // Reset daily progress for new day
      this.currentUser.dailyProgress = {
        date: today,
        multiplication: 0,
        subtraction: 0,
        division: 0,
        addition: 0
      };
      
      // Increment days practiced counter
      if (this.currentUser.stats.lastPracticeDate !== today) {
        this.currentUser.stats.daysPracticed++;
      }
      
      // Save the daily progress reset
      this.saveToStorage();
    }
  }
  
  renderAchievements() {
    const container = document.getElementById('achievements-list');
    container.innerHTML = '';
    
    Object.keys(this.achievements).forEach(achievementId => {
      const achievement = this.achievements[achievementId];
      const achievementCard = document.createElement('div');
      achievementCard.className = 'achievement-card';
      
      const isEarned = this.currentUser.achievements.includes(achievementId);
      if (isEarned) {
        achievementCard.classList.add('earned');
      }
      
      const localized = achievement[this.currentLanguage];
      achievementCard.innerHTML = `
        <div class="achievement-icon">${achievement.icon}</div>
        <div class="achievement-name">${localized.name}</div>
        <div class="achievement-description">${localized.description}</div>
      `;
      
      container.appendChild(achievementCard);
    });
  }
  
  startExercise(type) {
    this.updateDailyProgressIfNeeded();
    
    // Check if daily limit reached
    if (this.currentUser.dailyProgress[type] >= 10) {
      const completedMsg = `${this.translate('completed_all')} ${this.translate(type).toLowerCase()} ${this.translate('exercises_for_today')}`;
      alert(completedMsg);
      return;
    }
    
    // Save state before starting exercise
    this.saveToStorage();
    
    this.currentExercise = {
      type: type,
      questions: this.generateQuestions(type, 10),
      currentQuestion: 0,
      answers: [],
      startTime: new Date()
    };
    
    document.getElementById('exercise-title').textContent = this.translate(type);
    document.getElementById('total-questions').textContent = '10';
    
    this.showScreen('exercise');
    this.displayCurrentQuestion();
  }
  
  generateQuestions(type, count) {
    const questions = [];
    const typeConfig = this.exerciseTypes[type];
    const difficultyConfig = this.difficultyLevels[this.currentDifficulty][type];
    
    for (let i = 0; i < count; i++) {
      let question;
      
      if (type === 'multiplication') {
        const a = this.randomInt(difficultyConfig.min_factor1, difficultyConfig.max_factor1);
        const b = this.randomInt(difficultyConfig.min_factor2, difficultyConfig.max_factor2);
        const answer = a * b;
        question = {
          text: `${this.formatNumber(a)} ${typeConfig.symbol} ${this.formatNumber(b)} = ?`,
          answer: answer,
          operands: [a, b],
          difficulty: this.currentDifficulty
        };
      } else if (type === 'subtraction') {
        let minuend, subtrahend, result;
        
        if (this.currentDifficulty === 'easy') {
          // For easy, ensure positive results
          subtrahend = this.randomInt(difficultyConfig.min_subtrahend, difficultyConfig.max_subtrahend);
          result = this.randomInt(0, difficultyConfig.max_minuend - subtrahend);
          minuend = result + subtrahend;
        } else if (this.currentDifficulty === 'hard') {
          // For hard, ensure challenging multi-digit problems with positive results
          minuend = this.randomInt(difficultyConfig.min_minuend, difficultyConfig.max_minuend);
          subtrahend = this.randomInt(difficultyConfig.min_subtrahend, Math.min(difficultyConfig.max_subtrahend, minuend - 1));
          result = minuend - subtrahend;
        } else {
          // For medium, generate within ranges ensuring positive results
          minuend = this.randomInt(difficultyConfig.min_minuend, difficultyConfig.max_minuend);
          subtrahend = this.randomInt(difficultyConfig.min_subtrahend, Math.min(difficultyConfig.max_subtrahend, minuend));
          result = minuend - subtrahend;
        }
        
        question = {
          text: `${this.formatNumber(minuend)} ${typeConfig.symbol} ${this.formatNumber(subtrahend)} = ?`,
          answer: result,
          operands: [minuend, subtrahend],
          difficulty: this.currentDifficulty
        };
      } else if (type === 'division') {
        let dividend, divisor, quotient;
        
        if (this.currentDifficulty === 'easy') {
          // Use predefined easy division problems
          dividend = difficultyConfig.dividends[this.randomInt(0, difficultyConfig.dividends.length - 1)];
          const possibleDivisors = difficultyConfig.divisors.filter(d => dividend % d === 0);
          divisor = possibleDivisors[this.randomInt(0, possibleDivisors.length - 1)];
          quotient = dividend / divisor;
        } else if (this.currentDifficulty === 'hard') {
          // Use pre-generated hard division problems to ensure exact results
          const problemIndex = this.randomInt(0, this.hardDivisionProblems.length - 1);
          const problem = this.hardDivisionProblems[problemIndex];
          dividend = problem[0];
          divisor = problem[1];
          quotient = problem[2];
        } else {
          // Generate medium division problems that result in whole numbers
          divisor = this.randomInt(difficultyConfig.min_divisor, difficultyConfig.max_divisor);
          quotient = this.randomInt(1, Math.floor(difficultyConfig.max_dividend / divisor));
          dividend = divisor * quotient;
        }
        
        question = {
          text: `${this.formatNumber(dividend)} ${typeConfig.symbol} ${this.formatNumber(divisor)} = ?`,
          answer: quotient,
          operands: [dividend, divisor],
          difficulty: this.currentDifficulty
        };
      } else if (type === 'addition') {
        const a = this.randomInt(difficultyConfig.min_addend1, difficultyConfig.max_addend1);
        const b = this.randomInt(difficultyConfig.min_addend2, difficultyConfig.max_addend2);
        const answer = a + b;
        question = {
          text: `${this.formatNumber(a)} ${typeConfig.symbol} ${this.formatNumber(b)} = ?`,
          answer: answer,
          operands: [a, b],
          difficulty: this.currentDifficulty
        };
      }
      
      questions.push(question);
    }
    
    return questions;
  }
  
  displayCurrentQuestion() {
    const question = this.currentExercise.questions[this.currentExercise.currentQuestion];
    
    document.getElementById('math-problem').textContent = question.text;
    document.getElementById('current-question').textContent = this.currentExercise.currentQuestion + 1;
    document.getElementById('answer-input').value = '';
    document.getElementById('answer-input').focus();
    
    // Display appropriate question instruction based on exercise type
    const questionInstruction = document.querySelector('.question-instruction');
    if (questionInstruction) {
      const instructionKey = this.currentExercise.type === 'addition' ? 'solve_addition_problem' : 'solve_problem';
      questionInstruction.textContent = this.translate(instructionKey);
    }
    
    // Show time indicator for hard problems
    const timeIndicator = document.getElementById('time-indicator');
    if (this.currentDifficulty === 'hard') {
      timeIndicator.style.display = 'block';
      timeIndicator.classList.add('hard-time');
      this.startQuestionTimer();
    } else {
      timeIndicator.style.display = 'none';
    }
    
    // Update progress bar
    const progressPercent = ((this.currentExercise.currentQuestion) / this.currentExercise.questions.length) * 100;
    document.getElementById('exercise-progress-fill').style.width = `${progressPercent}%`;
    
    // Hide feedback
    document.getElementById('feedback').classList.add('hidden');
  }
  
  startQuestionTimer() {
    // Give more time for hard problems: 90 seconds
    let timeLeft = 90;
    const timeDisplay = document.getElementById('time-remaining');
    
    const timer = setInterval(() => {
      timeLeft--;
      if (timeDisplay) {
        timeDisplay.textContent = timeLeft;
        
        // Change color when time is running low
        const timeIndicator = document.getElementById('time-indicator');
        if (timeLeft <= 20) {
          timeIndicator.style.background = 'var(--color-bg-4)';
          timeIndicator.style.color = 'var(--color-error)';
          timeIndicator.style.borderColor = 'var(--color-error)';
        }
      }
      
      if (timeLeft <= 0) {
        clearInterval(timer);
        this.handleTimeOut();
      }
    }, 1000);
    
    // Store timer to clear it when question changes
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
    }
    this.questionTimer = timer;
  }
  
  handleTimeOut() {
    const timeUpMessage = this.currentLanguage === 'he' ? 
      '⏰ הזמן נגמר! בואו ננסה את השאלה הבאה.' :
      this.currentLanguage === 'ru' ?
      '⏰ Время вышло! Попробуем следующий вопрос.' :
      '⏰ Time\'s up! Let\'s try the next question.';
      
    alert(timeUpMessage);
    this.nextQuestion();
  }
  
  submitAnswer() {
    const input = document.getElementById('answer-input');
    const userAnswer = parseInt(input.value);
    const question = this.currentExercise.questions[this.currentExercise.currentQuestion];
    
    if (isNaN(userAnswer)) {
      const enterNumberText = this.currentLanguage === 'he' ? 
        'אנא הכנס מספר!' :
        this.currentLanguage === 'ru' ?
        'Пожалуйста, введите число!' :
        'Please enter a number!';
      alert(enterNumberText);
      return;
    }
    
    const isCorrect = userAnswer === question.answer;
    
    this.currentExercise.answers.push({
      question: question,
      userAnswer: userAnswer,
      correct: isCorrect,
      timestamp: new Date()
    });
    
    this.showFeedback(isCorrect, question.answer);
  }
  
  showFeedback(isCorrect, correctAnswer) {
    const feedback = document.getElementById('feedback');
    const message = document.getElementById('feedback-message');
    
    // Clear question timer if exists
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
    }
    
    feedback.classList.remove('hidden', 'correct', 'incorrect', 'hard-level');
    
    if (isCorrect) {
      feedback.classList.add('correct');
      message.textContent = this.getDifficultyBasedMessage('correct');
      feedback.classList.add('bounce');
      
      // Special celebration for hard problems
      if (this.currentDifficulty === 'hard') {
        feedback.classList.add('hard-level');
        this.showCelebrationEffect();
      }
    } else {
      feedback.classList.add('incorrect');
      const formattedAnswer = this.formatNumber(correctAnswer);
      const correctAnswerText = this.currentLanguage === 'he' ? 
        `${this.getDifficultyBasedMessage('incorrect')} התשובה הנכונה היא ${formattedAnswer}.` :
        this.currentLanguage === 'ru' ?
        `${this.getDifficultyBasedMessage('incorrect')} Правильный ответ: ${formattedAnswer}.` :
        `${this.getDifficultyBasedMessage('incorrect')} The correct answer is ${formattedAnswer}.`;
      message.textContent = correctAnswerText;
      feedback.classList.add('shake');
      
      if (this.currentDifficulty === 'hard') {
        feedback.classList.add('hard-level');
      }
    }
    
    setTimeout(() => {
      feedback.classList.remove('bounce', 'shake');
    }, 1000);
  }
  
  showCelebrationEffect() {
    const celebrationEl = document.getElementById('celebration-effect');
    if (celebrationEl) {
      const celebrations = ['🎉', '⭐', '🏆', '💫', '🌟', '🎊'];
      const randomCelebration = celebrations[Math.floor(Math.random() * celebrations.length)];
      
      celebrationEl.textContent = randomCelebration;
      celebrationEl.style.display = 'block';
      celebrationEl.style.animation = 'none';
      
      setTimeout(() => {
        celebrationEl.style.animation = 'celebrate 2s ease-out';
      }, 10);
      
      setTimeout(() => {
        celebrationEl.style.display = 'none';
      }, 2000);
    }
  }
  
  getDifficultyBasedMessage(type) {
    // For addition exercises, use addition-specific messages if available
    // let messageSource = this.currentExercise.type === 'addition' 
    //   ? this.encouragingMessagesByDifficulty.addition
    //   : this.encouragingMessagesByDifficulty[this.currentDifficulty];
      let messageSource = this.encouragingMessagesByDifficulty[this.currentDifficulty];
    
    const messages = messageSource[type][this.currentLanguage];
    return messages[Math.floor(Math.random() * messages.length)];
  }
  
  nextQuestion() {
    // Clear any existing timer
    if (this.questionTimer) {
      clearInterval(this.questionTimer);
    }
    
    this.currentExercise.currentQuestion++;
    
    if (this.currentExercise.currentQuestion >= this.currentExercise.questions.length) {
      this.finishExercise();
    } else {
      this.displayCurrentQuestion();
    }
  }
  
  finishExercise() {
    const correctAnswers = this.currentExercise.answers.filter(a => a.correct).length;
    const totalQuestions = this.currentExercise.answers.length;
    const scorePercent = Math.round((correctAnswers / totalQuestions) * 100);
    
    // Update user stats
    this.currentUser.stats.totalExercises += totalQuestions;
    this.currentUser.stats.totalCorrect += correctAnswers;
    this.currentUser.exerciseStats[this.currentExercise.type].total += totalQuestions;
    this.currentUser.exerciseStats[this.currentExercise.type].correct += correctAnswers;
    this.currentUser.dailyProgress[this.currentExercise.type] += totalQuestions;
    
    // Update difficulty-specific stats
    if (!this.currentUser.difficultyStats) {
      this.currentUser.difficultyStats = {
        easy: { total: 0, correct: 0 },
        medium: { total: 0, correct: 0 },
        hard: { total: 0, correct: 0 }
      };
    }
    this.currentUser.difficultyStats[this.currentDifficulty].total += totalQuestions;
    this.currentUser.difficultyStats[this.currentDifficulty].correct += correctAnswers;
    
    // Add exercise history entry
    if (!this.currentUser.exerciseHistory) {
      this.currentUser.exerciseHistory = [];
    }
    
    this.currentExercise.answers.forEach((answer, index) => {
      this.currentUser.exerciseHistory.push({
        date: new Date().toISOString(),
        operation: this.currentExercise.type,
        difficulty: this.currentDifficulty,
        problem: answer.question.text,
        userAnswer: answer.userAnswer,
        correctAnswer: answer.question.answer,
        isCorrect: answer.correct,
        timeSpent: answer.timestamp - this.currentExercise.startTime
      });
    });
    
    // Keep only last 1000 exercise history entries for performance
    if (this.currentUser.exerciseHistory.length > 1000) {
      this.currentUser.exerciseHistory = this.currentUser.exerciseHistory.slice(-1000);
    }
    
    // Update streak and practice date
    const today = this.getTodayString();
    const lastPractice = this.currentUser.stats.lastPracticeDate;
    
    if (lastPractice === today) {
      // Already practiced today, no streak change
    } else if (this.isConsecutiveDay(lastPractice, today)) {
      this.currentUser.stats.currentStreak++;
    } else {
      this.currentUser.stats.currentStreak = 1;
    }
    
    this.currentUser.stats.lastPracticeDate = today;
    this.currentUser.stats.bestStreak = Math.max(this.currentUser.stats.bestStreak, this.currentUser.stats.currentStreak);
    
    // Update days practiced if this is a new day
    const uniquePracticeDates = new Set();
    if (this.currentUser.exerciseHistory) {
      this.currentUser.exerciseHistory.forEach(exercise => {
        uniquePracticeDates.add(exercise.date.split('T')[0]);
      });
    }
    uniquePracticeDates.add(today);
    this.currentUser.stats.daysPracticed = uniquePracticeDates.size;
    
    // Check achievements
    const newAchievements = this.checkAchievements();
    
    // Save all progress immediately after exercise completion
    this.saveToStorage();
    
    // Show achievement notifications
    if (newAchievements.length > 0) {
      this.showAchievementNotifications(newAchievements);
    }
    
    // Show results
    this.showResults(correctAnswers, totalQuestions - correctAnswers, scorePercent);
    
    // Check for difficulty progression suggestions
    this.checkDifficultyProgression(scorePercent);
  }
  
  checkAchievements() {
    const user = this.currentUser;
    const newAchievements = [];
    
    // First Steps - Complete first exercise
    if (user.stats.totalExercises > 0 && !user.achievements.includes('first_steps')) {
      user.achievements.push('first_steps');
      newAchievements.push('first_steps');
    }
    
    // Perfect Score - Get 100%
    const lastExerciseCorrect = this.currentExercise.answers.filter(a => a.correct).length;
    const lastExerciseTotal = this.currentExercise.answers.length;
    if (lastExerciseCorrect === lastExerciseTotal && !user.achievements.includes('perfect_score')) {
      user.achievements.push('perfect_score');
      newAchievements.push('perfect_score');
    }
    
    // Daily Warrior - Complete all daily exercises (40 total)
    const todayTotal = user.dailyProgress.multiplication + user.dailyProgress.subtraction + user.dailyProgress.division + user.dailyProgress.addition;
    if (todayTotal >= 40 && !user.achievements.includes('daily_warrior')) {
      user.achievements.push('daily_warrior');
      newAchievements.push('daily_warrior');
    }
    
    // Week Streak - 7 days in a row
    if (user.stats.currentStreak >= 7 && !user.achievements.includes('week_streak')) {
      user.achievements.push('week_streak');
      newAchievements.push('week_streak');
    }
    
    // Difficulty-specific mastery achievements
    ['easy', 'medium', 'hard'].forEach(difficulty => {
      const achievementKey = `${difficulty}_master`;
      if (!user.achievements.includes(achievementKey)) {
        const diffStats = user.difficultyStats[difficulty];
        const accuracy = diffStats.total > 0 ? (diffStats.correct / diffStats.total) * 100 : 0;
        if (diffStats.total >= 50 && accuracy >= 90) {
          user.achievements.push(achievementKey);
          newAchievements.push(achievementKey);
        }
      }
    });
    
    // Addition-specific achievements
    const addStats = user.exerciseStats.addition;
    if (addStats.total >= 10 && !user.achievements.includes('addition_beginner')) {
      user.achievements.push('addition_beginner');
      newAchievements.push('addition_beginner');
    }
    
    if (addStats.total >= 50 && !user.achievements.includes('addition_expert')) {
      const addAccuracy = (addStats.correct / addStats.total) * 100;
      if (addAccuracy >= 80) {
        user.achievements.push('addition_expert');
        newAchievements.push('addition_expert');
      }
    }
    
    return newAchievements;
  }
  
  showAchievementNotifications(achievements) {
    achievements.forEach((achievementId, index) => {
      setTimeout(() => {
        this.showSingleAchievementNotification(achievementId);
      }, index * 1000); // Stagger notifications
    });
  }
  
  showSingleAchievementNotification(achievementId) {
    const achievement = this.achievements[achievementId];
    if (!achievement) return;
    
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 80px;
      right: 20px;
      background: linear-gradient(135deg, var(--color-warning) 0%, var(--color-primary) 100%);
      color: white;
      padding: 16px 20px;
      border-radius: 12px;
      box-shadow: var(--shadow-lg);
      z-index: 1001;
      transform: translateX(100%);
      transition: transform 0.3s ease;
      max-width: 280px;
      border: 2px solid rgba(255, 255, 255, 0.3);
    `;
    
    const localized = achievement[this.currentLanguage];
    const unlockedText = this.currentLanguage === 'he' ? '🏆 הישג חדש!' :
                        this.currentLanguage === 'ru' ? '🏆 Новоו достижוниו!' :
                        '🏆 Achievement Unlocked!';
    
    notification.innerHTML = `
      <div style="font-weight: bold; margin-bottom: 4px; font-size: 14px;">${unlockedText}</div>
      <div style="display: flex; align-items: center; gap: 8px;">
        <span style="font-size: 20px;">${achievement.icon}</span>
        <div>
          <div style="font-weight: bold; font-size: 13px;">${localized.name}</div>
          <div style="font-size: 11px; opacity: 0.9;">${localized.description}</div>
        </div>
      </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
      notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Click to dismiss
    notification.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => document.body.removeChild(notification), 300);
    });
    
    // Auto-dismiss after 5 seconds
    setTimeout(() => {
      if (notification.parentNode) {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
          if (notification.parentNode) {
            document.body.removeChild(notification);
          }
        }, 300);
      }
    }, 5000);
  }
  
  showResults(correct, incorrect, scorePercent) {
    document.getElementById('correct-count').textContent = correct;
    document.getElementById('incorrect-count').textContent = incorrect;
    document.getElementById('final-score').textContent = `${scorePercent}%`;
    
    // Update difficulty-specific results display
    this.updateDifficultyDisplay();
    
    // Show expert achievement notice for hard level
    const expertNotice = document.getElementById('expert-achievement-notice');
    if (this.currentDifficulty === 'hard' && scorePercent >= 70) {
      if (expertNotice) {
        expertNotice.style.display = 'flex';
        expertNotice.innerHTML = `
          <span>🏆 ${this.translate('expert_level')}</span>
        `;
      }
    } else if (expertNotice) {
      expertNotice.style.display = 'none';
    }
    
    // Update difficulty progress bar
    const progressFill = document.getElementById('difficulty-progress-fill');
    if (progressFill) {
      const progressWidth = this.currentDifficulty === 'easy' ? 33 : 
                           this.currentDifficulty === 'medium' ? 66 : 100;
      progressFill.style.width = `${progressWidth}%`;
    }
    
    // Set emoji based on performance
    let emoji = '🎉';
    if (scorePercent === 100) emoji = '🏆';
    else if (scorePercent >= 80) emoji = '🌟';
    else if (scorePercent >= 60) emoji = '👍';
    else emoji = '💪';
    
    document.getElementById('results-emoji').textContent = emoji;
    
    // Set difficulty-specific encouragement message
    let encouragement = this.getDifficultySpecificEncouragement(scorePercent);
    document.getElementById('encouragement-message').textContent = encouragement;
    
    this.showScreen('results');
  }
  
  getDifficultySpecificEncouragement(scorePercent) {
    const difficultyKey = `good_job_${this.currentDifficulty}`;
    
    if (scorePercent === 100) {
      return this.translate(difficultyKey) + ' ' + (this.currentLanguage === 'he' ? '🏆' :
        this.currentLanguage === 'ru' ? '🏆' : '🏆');
    } else if (scorePercent >= 80) {
      return this.translate(difficultyKey);
    } else if (scorePercent >= 60) {
      const practiceMsg = this.currentLanguage === 'he' ? 
        'המשך להתאמן ותשתפר!' :
        this.currentLanguage === 'ru' ?
        'Продолжай тренироваться и ты улучшишься!' :
        'Keep practicing and you\'ll improve!';
      return practiceMsg + ' 📈';
    } else {
      const effortMsg = this.currentLanguage === 'he' ? 
        'מאמץ נהדר! כל טעות מלמדת אותנו!' :
        this.currentLanguage === 'ru' ?
        'Отличные усилия! Каждая ошибка нас учит!' :
        'Great effort! Every mistake teaches us something!';
      return effortMsg + ' 💪';
    }
  }
  
  checkDifficultyProgression(scorePercent) {
    const progressMsg = document.getElementById('difficulty-progress-message');
    if (!progressMsg) return;
    
    const difficultyStats = this.currentUser.difficultyStats[this.currentDifficulty];
    const accuracy = difficultyStats.total > 0 ? (difficultyStats.correct / difficultyStats.total) * 100 : 0;
    
    let message = '';
    
    if (this.currentDifficulty === 'easy' && accuracy >= 85 && difficultyStats.total >= 20) {
      message = this.translate('try_harder');
    } else if (this.currentDifficulty === 'medium' && accuracy >= 85 && difficultyStats.total >= 20) {
      message = this.translate('try_harder');
    } else if (this.currentDifficulty === 'hard' && accuracy >= 70 && difficultyStats.total >= 25) {
      // Different mastery criteria for hard level (70% instead of 90%)
      message = this.translate('expert_level');
    } else if (accuracy >= 90 && difficultyStats.total >= 50) {
      message = this.translate('mastered');
    }
    
    progressMsg.textContent = message;
  }
  
  retryExercise() {
    this.startExercise(this.currentExercise.type);
  }
  
  updateProgressScreen() {
    if (!this.currentUser) return;
    
    const user = this.currentUser;
    
    // Update overall statistics
    document.getElementById('total-exercises').textContent = user.stats.totalExercises;
    document.getElementById('total-correct').textContent = user.stats.totalCorrect;
    document.getElementById('best-streak').textContent = user.stats.bestStreak;
    document.getElementById('days-practiced').textContent = user.stats.daysPracticed;
    
    // Update exercise type breakdown
    const multAccuracy = user.exerciseStats.multiplication.total > 0 
      ? Math.round((user.exerciseStats.multiplication.correct / user.exerciseStats.multiplication.total) * 100)
      : 0;
    const subAccuracy = user.exerciseStats.subtraction.total > 0 
      ? Math.round((user.exerciseStats.subtraction.correct / user.exerciseStats.subtraction.total) * 100)
      : 0;
    const divAccuracy = user.exerciseStats.division.total > 0 
      ? Math.round((user.exerciseStats.division.correct / user.exerciseStats.division.total) * 100)
      : 0;
    const addAccuracy = user.exerciseStats.addition.total > 0 
      ? Math.round((user.exerciseStats.addition.correct / user.exerciseStats.addition.total) * 100)
      : 0;
    
    document.getElementById('mult-accuracy').textContent = `${multAccuracy}%`;
    document.getElementById('mult-total').textContent = user.exerciseStats.multiplication.total;
    
    document.getElementById('sub-accuracy').textContent = `${subAccuracy}%`;
    document.getElementById('sub-total').textContent = user.exerciseStats.subtraction.total;
    
    document.getElementById('div-accuracy').textContent = `${divAccuracy}%`;
    document.getElementById('div-total').textContent = user.exerciseStats.division.total;
    
    document.getElementById('add-accuracy').textContent = `${addAccuracy}%`;
    document.getElementById('add-total').textContent = user.exerciseStats.addition.total;
  }
  
  downloadApp() {
    // Create a downloadable HTML file containing the entire application
    const htmlContent = this.generateDownloadableHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'math-learning-app.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
  
  generateDownloadableHTML() {
    // Get current HTML structure
    const currentHTML = document.documentElement.outerHTML;
    
    // Create a complete standalone HTML file
    return `<!DOCTYPE html>
<html lang="${this.currentLanguage}" dir="${this.languages[this.currentLanguage].direction}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${this.translate('app_title')}</title>
    <style>
        ${this.getInlineCSS()}
    </style>
</head>
<body>
    ${document.body.innerHTML}
    <script>
        ${this.getInlineJS()}
    </script>
</body>
</html>`;
  }
  
  getInlineCSS() {
    // Get CSS from the current stylesheet
    let css = '';
    for (const sheet of document.styleSheets) {
      try {
        for (const rule of sheet.cssRules) {
          css += rule.cssText + '\n';
        }
      } catch (e) {
        // Handle CORS issues with external stylesheets
        console.log('Cannot access stylesheet:', e);
      }
    }
    return css;
  }
  
  getInlineJS() {
    // Return a simplified version of the app code
    return `
    // Math Learning App - Standalone Version
    // This is a simplified version for offline use
    console.log('Math Learning App loaded successfully!');
    
    // Create a message for offline use
    const offlineMessage = document.createElement('div');
    offlineMessage.style.cssText = 'position: fixed; top: 10px; right: 10px; background: #4CAF50; color: white; padding: 10px; border-radius: 5px; z-index: 1000;';
    offlineMessage.textContent = 'App downloaded successfully! This is an offline version.';
    document.body.appendChild(offlineMessage);
    
    setTimeout(() => {
      offlineMessage.remove();
    }, 5000);
    `;
  }
  
  // Number formatting function
  formatNumber(num) {
    if (this.currentDifficulty === 'hard' && num >= 1000) {
      return num.toLocaleString();
    }
    return num.toString();
  }
  
  // Utility functions
  randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  getTodayString() {
    return new Date().toISOString().split('T')[0];
  }
  
  isConsecutiveDay(lastDate, currentDate) {
    if (!lastDate) return false;
    
    const last = new Date(lastDate);
    const current = new Date(currentDate);
    const diffTime = current - last;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    
    return diffDays === 1;
  }
  
  // ===============================================
  // STORAGE SIMULATION METHODS
  // ===============================================
  // These methods simulate persistent storage functionality using in-memory storage
  // since browser storage APIs are blocked in the sandboxed environment
  
  saveToStorage() {
    console.log('Saving data to storage...');
    
    // Debounce saves to prevent performance issues
    if (this.saveTimeout) {
      clearTimeout(this.saveTimeout);
    }
    
    this.saveTimeout = setTimeout(() => {
      try {
        // Validate users array before processing
        const validatedUsers = (this.users || []).map(user => {
          // Ensure user object exists and has all required properties
          if (!user) {
            console.warn('⚠️ Null user found, skipping');
            return null;
          }
          
          return {
            id: user.id || Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: user.name || '',
            avatar: user.avatar || '🐱',
            createdDate: user.createdDate || user.createdAt?.toISOString?.() || new Date().toISOString(),
            language: user.language || 'he',
            currentDifficulty: user.currentDifficulty || user.difficultyPreference || 'easy',
            statistics: {
              totalExercises: user.stats?.totalExercises || 0,
              correctAnswers: user.stats?.totalCorrect || 0,
              totalScore: user.stats?.totalCorrect || 0,
              streakDays: user.stats?.currentStreak || 0,
              lastActiveDate: user.stats?.lastPracticeDate || new Date().toISOString().split('T')[0],
              averageTimePerExercise: this.calculateAverageTime(user)
            },
            exerciseHistory: user.exerciseHistory || [],
            dailyProgress: this.formatDailyProgress(user.dailyProgress),
            achievements: (user.achievements || []).map(achievementId => ({
              id: achievementId,
              unlockedDate: new Date().toISOString().split('T')[0],
              progress: 100
            })),
            preferences: {
              difficulty: user.difficultyPreference || user.currentDifficulty || 'easy',
              language: user.language || this.currentLanguage,
              soundEnabled: true,
              theme: 'default'
            }
          };
        }).filter(user => user !== null); // Remove null entries
        
        const dataToSave = {
          users: validatedUsers,
          appSettings: {
            lastActiveUser: this.currentUser && this.currentUser.id ? this.currentUser.id : null,
            defaultLanguage: this.currentLanguage
          }
        };
        
        // Store data in memory (simulating persistent storage)
        this.storageData.mathApp_userData = JSON.stringify(dataToSave);
        this.storageData.mathApp_settings = JSON.stringify({
          language: this.currentLanguage,
          lastSaveDate: new Date().toISOString()
        });
        
        console.log('✅ Data saved successfully to simulated storage');
        console.log('Saved users:', validatedUsers.length);
        this.showDataSavedIndicator();
        
      } catch (error) {
        console.error('⚠️ Error saving data:', error);
        const errorMsg = this.currentLanguage === 'he' ? 'שגיאה בשמירת נתונים' :
                        this.currentLanguage === 'ru' ? 'Ошибка сохранения данных' :
                        'Data saving error';
        alert(errorMsg + ': ' + error.message);
        this.handleStorageError(error);
      }
    }, this.saveDebounceMs);
  }
  
  getFromStorage(key) {
    try {
      console.log('Reading from storage:', key);
      
      if (!key || !this.storageData) {
        console.warn('⚠️ Invalid key or storage data');
        return null;
      }
      
      // Retrieve from in-memory storage simulation
      const data = this.storageData[key];
      const result = data ? JSON.parse(data) : null;
      console.log('Retrieved from storage:', result ? 'data found' : 'no data');
      return result;
    } catch (error) {
      console.error('⚠️ Error reading from storage:', error);
      const errorMsg = this.currentLanguage === 'he' ? 'שגיאה בטעינת נתונים' :
                      this.currentLanguage === 'ru' ? 'Ошибка загрузки данных' :
                       'Data loading error';
      console.error(errorMsg + ':', error);
      return null;
    }
  }
  
  calculateAverageTime(user) {
    if (!user || !user.exerciseHistory || user.exerciseHistory.length === 0) return 0;
    const totalTime = user.exerciseHistory.reduce((sum, exercise) => {
      return sum + (exercise && exercise.timeSpent ? exercise.timeSpent : 0);
    }, 0);
    return Math.round(totalTime / user.exerciseHistory.length);
  }
  
  formatDailyProgress(progress) {
    const today = this.getTodayString();
    return {
      [today]: {
        multiplication: { completed: progress?.multiplication || 0, correct: progress?.multiplication || 0 },
        addition: { completed: progress?.addition || 0, correct: progress?.addition || 0 },
        subtraction: { completed: progress?.subtraction || 0, correct: progress?.subtraction || 0 },
        division: { completed: progress?.division || 0, correct: progress?.division || 0 }
      }
    };
  }

  
  validateAndCleanupData() {
    // Validate and clean up user data structure
    this.users = (this.users || []).filter(user => {
      if (!user || !user.id || !user.name) {
        console.warn('⚠️ Invalid user found, removing:', user);
        return false;
      }
      
      // Ensure createdDate exists (fix createdAt vs createdDate inconsistency)
      if (!user.createdDate) {
        user.createdDate = user.createdAt?.toISOString?.() || new Date().toISOString();
      }
      
      // Ensure required properties exist
      if (!user.stats) {
        user.stats = {
          totalExercises: 0,
          totalCorrect: 0,
          currentStreak: 0,
          bestStreak: 0,
          daysPracticed: 0,
          lastPracticeDate: null
        };
      }
      
      if (!user.exerciseStats) {
        user.exerciseStats = {
          multiplication: { total: 0, correct: 0 },
          subtraction: { total: 0, correct: 0 },
          division: { total: 0, correct: 0 },
          addition: { total: 0, correct: 0 }
        };
      }
      
      if (!user.dailyProgress) {
        user.dailyProgress = {
          date: this.getTodayString(),
          multiplication: 0,
          subtraction: 0,
          division: 0,
          addition: 0
        };
      }
      
      if (!user.achievements) {
        user.achievements = [];
      }
      
      if (!user.difficultyStats) {
        user.difficultyStats = {
          easy: { total: 0, correct: 0 },
          medium: { total: 0, correct: 0 },
          hard: { total: 0, correct: 0 }
        };
      }
      
      if (!user.exerciseHistory) {
        user.exerciseHistory = [];
      }
      
      // Ensure language and difficulty preferences exist
      if (!user.language) {
        user.language = this.currentLanguage || 'he';
      }
      
      if (!user.difficultyPreference && !user.currentDifficulty) {
        user.difficultyPreference = 'easy';
        user.currentDifficulty = 'easy';
      }
      
      return true;
    });
    
    console.log(`✅ Validated ${this.users.length} users with proper data structures`);
  }
  
  handleStorageError(error) {
    const errorMessage = this.currentLanguage === 'he' ? 
      '⚠️ שגיאה בשמירת הנתונים' :
      this.currentLanguage === 'ru' ?
      '⚠️ Ошибка сохранения данных' :
      '⚠️ Data saving error';
      
    console.warn(errorMessage, error);
  }
  
  showDataSavedIndicator() {
    try {
      // Create a subtle indicator that data was saved
      const indicator = document.createElement('div');
      indicator.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--color-success);
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 12px;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
        pointer-events: none;
      `;
      
      const saveMessage = this.currentLanguage === 'he' ? 
        '✅ נתונים נשמרו בהצלחה' :
        this.currentLanguage === 'ru' ?
        '✅ Данные успешно сохранены' :
        '✅ Data saved successfully';
        
      indicator.textContent = saveMessage;
      document.body.appendChild(indicator);
      
      // Show and hide the indicator
      setTimeout(() => indicator.style.opacity = '1', 100);
      setTimeout(() => {
        if (indicator.parentNode) {
          indicator.style.opacity = '0';
          setTimeout(() => {
            if (indicator.parentNode) {
              document.body.removeChild(indicator);
            }
          }, 300);
        }
      }, 2000);
    } catch (error) {
      console.error('⚠️ Error showing save indicator:', error);
    }
  }
  
  showDataRestoredMessage() {
    // Show welcome back message for returning users
    const welcomeMessage = document.createElement('div');
    welcomeMessage.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--color-bg-1);
      border: 2px solid var(--color-primary);
      padding: 24px;
      border-radius: 12px;
      text-align: center;
      z-index: 1000;
      box-shadow: var(--shadow-lg);
      max-width: 300px;
    `;
    
    const welcomeText = this.currentLanguage === 'he' ? 
      '🎉 ברוך השב!<br>💾 התקדמותך שוחזרה' :
      this.currentLanguage === 'ru' ?
      '🎉 Добро пожаловать обратно!<br>💾 Прогресс восстановлен' :
      '🎉 Welcome Back!<br>💾 Progress Restored';
    
    welcomeMessage.innerHTML = `
      <div style="margin-bottom: 16px; font-weight: bold;">${welcomeText}</div>
      <button onclick="this.parentElement.remove()" style="
        background: var(--color-primary);
        color: white;
        border: none;
        padding: 8px 16px;
        border-radius: 6px;
        cursor: pointer;
      ">OK</button>
    `;
    
    document.body.appendChild(welcomeMessage);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (welcomeMessage.parentNode) {
        welcomeMessage.remove();
      }
    }, 5000);
  }
  
  // Enhanced user creation with full data structure
  createUserWithFullStructure(name, avatar) {
    console.log('Creating user structure for:', name, avatar);
    
    if (!name || !avatar) {
      throw new Error('Name and avatar are required');
    }
    
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const now = new Date().toISOString();
    const today = this.getTodayString();
    
    const newUser = {
      id: userId,
      name: name,
      avatar: avatar,
      createdDate: now, // Use createdDate consistently, not createdAt
      language: this.currentLanguage,
      currentDifficulty: 'easy',
      statistics: {
        totalExercises: 0,
        correctAnswers: 0,
        totalScore: 0,
        streakDays: 0,
        lastActiveDate: today,
        averageTimePerExercise: 0
      },
      stats: {
        totalExercises: 0,
        totalCorrect: 0,
        currentStreak: 0,
        bestStreak: 0,
        daysPracticed: 0,
        lastPracticeDate: null
      },
      exerciseHistory: [],
      exerciseStats: {
        multiplication: { total: 0, correct: 0 },
        subtraction: { total: 0, correct: 0 },
        division: { total: 0, correct: 0 },
        addition: { total: 0, correct: 0 }
      },
      dailyProgress: {
        date: today,
        multiplication: 0,
        subtraction: 0,
        division: 0,
        addition: 0
      },
      achievements: [],
      difficultyPreference: 'easy',
      difficultyStats: {
        easy: { total: 0, correct: 0 },
        medium: { total: 0, correct: 0 },
        hard: { total: 0, correct: 0 }
      },
      preferences: {
        difficulty: 'easy',
        language: this.currentLanguage,
        soundEnabled: true,
        theme: 'default'
      }
    };
    
    console.log('✅ User structure created successfully:', newUser);
    return newUser;
  }
}

// Initialize the app when the page loads
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded - Starting Math App...');
  
  try {
    window.mathApp = new MathApp();
    console.log('Math App instance created successfully');
  } catch (error) {
    console.error('Fatal error creating Math App:', error);
    
    // Create a simple error display
    const errorDiv = document.createElement('div');
    errorDiv.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #f44336;
      color: white;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;
    errorDiv.innerHTML = `
      <h3>App Loading Error</h3>
      <p>${error.message}</p>
      <button onclick="location.reload()" style="
        background: white;
        color: #f44336;
        border: none;
        padding: 8px 16px;
        border-radius: 4px;
        cursor: pointer;
      ">Reload Page</button>
    `;
    document.body.appendChild(errorDiv);
  }
});
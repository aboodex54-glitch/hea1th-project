/* =====================================
   التنقل بين الصفحات
===================================== */

const pages = document.querySelectorAll(".page");

function showPage(id) {
  pages.forEach(page => {
    page.classList.remove("active");
  });

  const page = document.getElementById(id);

  if (page) {
    page.classList.add("active");
  }

  window.scrollTo(0, 0);
}


/* =====================================
   الأصوات
===================================== */

let audioContext;

function initAudio() {
  if (!audioContext) {
    audioContext = new (
      window.AudioContext ||
      window.webkitAudioContext
    )();
  }

  if (audioContext.state === "suspended") {
    audioContext.resume();
  }
}

function playTone(frequency, duration, type = "sine") {
  initAudio();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.type = type;
  oscillator.frequency.value = frequency;

  gain.gain.setValueAtTime(0.001, audioContext.currentTime);

  gain.gain.exponentialRampToValueAtTime(
    0.15,
    audioContext.currentTime + 0.02
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + duration
  );

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.start();
  oscillator.stop(audioContext.currentTime + duration);
}

function clickSound() {
  playTone(600, 0.08);
}

function correctSound() {
  playTone(800, 0.12);

  setTimeout(() => {
    playTone(1100, 0.15);
  }, 100);
}

function wrongSound() {
  playTone(180, 0.25, "sawtooth");
}


/* =====================================
   الموسيقى
===================================== */

const music = document.getElementById("backgroundMusic");

music.volume = 0.25;


/* =====================================
   شاشة التحميل
===================================== */

window.addEventListener("load", () => {

  setTimeout(() => {
    showPage("startPage");
  }, 2200);

});


/* =====================================
   زر الدخول
===================================== */

document
  .getElementById("startButton")
  .addEventListener("click", () => {

    initAudio();

    music.play().catch(() => {});

    showPage("planetsPage");

  });


/* =====================================
   معلومات الفضاء
===================================== */

const spaceInfo = {

  sun: {
    icon: "☀️",
    title: "الشمس",
    description:
      "الشمس نجم يقع في مركز النظام الشمسي وتدور حوله الكواكب.",
    extra:
      "الشمس هي المصدر الرئيسي للضوء والطاقة للأرض."
  },

  mercury: {
    icon: "🌑",
    title: "عطارد",
    description:
      "أقرب كوكب إلى الشمس وأصغر كواكب النظام الشمسي.",
    extra:
      "عطارد لا يمتلك أقمارًا معروفة."
  },

  venus: {
    icon: "🟠",
    title: "الزهرة",
    description:
      "ثاني كوكب من الشمس ويشبه الأرض في الحجم.",
    extra:
      "الزهرة هو أكثر كواكب النظام الشمسي حرارة على سطحه."
  },

  earth: {
    icon: "🌍",
    title: "الأرض",
    description:
      "كوكبنا الذي نعيش عليه، وهو الكوكب الوحيد المعروف بوجود حياة عليه.",
    extra:
      "يمتلك الأرض قمرًا طبيعيًا واحدًا."
  },

  mars: {
    icon: "🔴",
    title: "المريخ",
    description:
      "رابع كواكب النظام الشمسي ويُعرف بالكوكب الأحمر.",
    extra:
      "للمريخ قمران صغيران هما فوبوس وديموس."
  },

  jupiter: {
    icon: "🟤",
    title: "المشتري",
    description:
      "أكبر كواكب النظام الشمسي.",
    extra:
      "يتميز بعواصف ضخمة مثل البقعة الحمراء العظيمة."
  },

  saturn: {
    icon: "🪐",
    title: "زحل",
    description:
      "سادس كوكب من الشمس ويشتهر بحلقاته.",
    extra:
      "حلقات زحل تتكون بشكل أساسي من الجليد والصخور."
  },

  uranus: {
    icon: "🔵",
    title: "أورانوس",
    description:
      "سابع كواكب النظام الشمسي.",
    extra:
      "أورانوس يدور وهو مائل بشكل كبير مقارنة بمعظم الكواكب."
  },

  neptune: {
    icon: "🔵",
    title: "نبتون",
    description:
      "أبعد كوكب معروف في النظام الشمسي.",
    extra:
      "نبتون معروف برياحه شديدة السرعة."
  },

  moon: {
    icon: "🌙",
    title: "القمر",
    description:
      "القمر هو القمر الطبيعي الوحيد للأرض.",
    extra:
      "يؤثر القمر في ظاهرة المد والجزر."
  },

  star: {
    icon: "⭐",
    title: "النجم",
    description:
      "النجم جسم فضائي ينتج الضوء والطاقة من داخله.",
    extra:
      "الشمس نفسها نجم."
  },

  meteor: {
    icon: "☄️",
    title: "الشهاب",
    description:
      "يظهر الشهاب عندما يدخل جسم صخري صغير الغلاف الجوي ويحترق.",
    extra:
      "الضوء الذي نراه ينتج عن احتراق الجسم في الغلاف الجوي."
  },

  asteroidMeteor: {
    icon: "🪨",
    title: "النيزك",
    description:
      "النيزك هو جزء من جسم فضائي يصل إلى سطح الأرض.",
    extra:
      "بعض النيازك تأتي من أجسام كانت موجودة في النظام الشمسي منذ وقت مبكر."
  },

  comet: {
    icon: "☄️",
    title: "المذنب",
    description:
      "جسم يتكون من الجليد والغبار والصخور ويدور حول الشمس.",
    extra:
      "يمكن أن يظهر للمذنب ذيل عندما يقترب من الشمس."
  },

  milkyway: {
    icon: "🌌",
    title: "درب التبانة",
    description:
      "المجرة التي يوجد فيها النظام الشمسي.",
    extra:
      "درب التبانة تحتوي على عدد هائل من النجوم."
  },

  blackhole: {
    icon: "🕳️",
    title: "الثقب الأسود",
    description:
      "منطقة في الفضاء تكون جاذبيتها قوية جدًا.",
    extra:
      "لا يستطيع الضوء الإفلات بعد تجاوز أفق الحدث."
  },

  asteroid: {
    icon: "🪨",
    title: "الكويكب",
    description:
      "جسم صخري صغير يدور حول الشمس.",
    extra:
      "توجد أعداد كبيرة من الكويكبات في النظام الشمسي."
  }

};


/* =====================================
   فتح معلومات الأجسام
===================================== */

document.querySelectorAll("[data-space]").forEach(card => {

  card.addEventListener("click", () => {

    const key = card.dataset.space;
    const info = spaceInfo[key];

    if (!info) return;

    clickSound();

    document.getElementById("modalIcon").textContent =
      info.icon;

    document.getElementById("modalTitle").textContent =
      info.title;

    document.getElementById("modalDescription").textContent =
      info.description;

    document.getElementById("modalExtra").textContent =
      info.extra;

    document
      .getElementById("infoModal")
      .classList.add("show");

  });

});


document
  .getElementById("closeModal")
  .addEventListener("click", () => {

    document
      .getElementById("infoModal")
      .classList.remove("show");

  });


document
  .getElementById("infoModal")
  .addEventListener("click", event => {

    if (event.target.id === "infoModal") {

      document
        .getElementById("infoModal")
        .classList.remove("show");

    }

  });


/* =====================================
   الاختبار
===================================== */

const questions = [

  {
    question: "ما أقرب كوكب إلى الشمس؟",
    answers: ["عطارد", "الأرض", "المريخ", "نبتون"],
    correct: 0
  },

  {
    question: "ما أكبر كوكب في النظام الشمسي؟",
    answers: ["زحل", "المشتري", "الأرض", "أورانوس"],
    correct: 1
  },

  {
    question: "ما الكوكب المعروف بالكوكب الأحمر؟",
    answers: ["الزهرة", "المريخ", "عطارد", "نبتون"],
    correct: 1
  },

  {
    question: "ما الكوكب الذي يشتهر بحلقاته؟",
    answers: ["المشتري", "المريخ", "زحل", "الأرض"],
    correct: 2
  },

  {
    question: "ما اسم المجرة التي يوجد فيها النظام الشمسي؟",
    answers: [
      "أندروميدا",
      "درب التبانة",
      "مجرة سومبريرو",
      "مجرة المثلث"
    ],
    correct: 1
  },

  {
    question: "ما القمر الطبيعي للأرض؟",
    answers: ["القمر", "فوبوس", "ديموس", "أوروبا"],
    correct: 0
  },

  {
    question: "ما أبعد كوكب عن الشمس؟",
    answers: ["زحل", "أورانوس", "نبتون", "المشتري"],
    correct: 2
  },

  {
    question: "ما النجم الموجود في مركز النظام الشمسي؟",
    answers: ["الشمس", "سيريوس", "بولاريس", "فيغا"],
    correct: 0
  },

  {
    question: "أي كوكب قريب من الأرض في الحجم؟",
    answers: ["الزهرة", "المشتري", "نبتون", "زحل"],
    correct: 0
  },

  {
    question: "ما الجسم الذي يمكن أن يظهر له ذيل عند الاقتراب من الشمس؟",
    answers: ["الكويكب", "المذنب", "القمر", "النجم"],
    correct: 1
  }

];

let currentQuestion = 0;
let quizScore = 0;

function startQuiz() {

  currentQuestion = 0;
  quizScore = 0;

  showPage("quizPage");

  loadQuestion();
}


function loadQuestion() {

  const question = questions[currentQuestion];

  document.getElementById("questionNumber").textContent =
    `السؤال ${currentQuestion + 1} من ${questions.length}`;

  document.getElementById("quizScore").textContent =
    `النقاط: ${quizScore}`;

  document.getElementById("questionText").textContent =
    question.question;

  const container =
    document.getElementById("answersContainer");

  container.innerHTML = "";

  question.answers.forEach((answer, index) => {

    const button = document.createElement("button");

    button.className = "answer";
    button.textContent = answer;

    button.addEventListener("click", () => {

      checkAnswer(button, index);

    });

    container.appendChild(button);

  });

}


function checkAnswer(button, index) {

  const question = questions[currentQuestion];

  const buttons =
    document.querySelectorAll(".answer");

  buttons.forEach(btn => {
    btn.disabled = true;
  });

  if (index === question.correct) {

    button.classList.add("correct");

    quizScore++;

    correctSound();

  } else {

    button.classList.add("wrong");

    buttons[question.correct]
      .classList.add("correct");

    wrongSound();

  }

  document.getElementById("quizScore").textContent =
    `النقاط: ${quizScore}`;

  setTimeout(() => {

    currentQuestion++;

    if (currentQuestion >= questions.length) {

      showQuizResult();

    } else {

      loadQuestion();

    }

  }, 1000);

}


function showQuizResult() {

  showPage("resultPage");

  document.getElementById("finalScore").textContent =
    `${quizScore} / 10`;

  let message;

  if (quizScore === 10) {
    message = "🔥 ممتاز! أنت خبير فضاء!";
  } else if (quizScore >= 8) {
    message = "🚀 رائع جدًا! معلوماتك قوية!";
  } else if (quizScore >= 5) {
    message = "🌟 جيد! عندك معرفة جميلة بالفضاء.";
  } else {
    message = "🪐 حاول مرة ثانية وبتتحسن!";
  }

  document.getElementById("resultMessage").textContent =
    message;

}


document
  .getElementById("quizButton")
  .addEventListener("click", startQuiz);

document
  .getElementById("retryQuiz")
  .addEventListener("click", startQuiz);

document
  .getElementById("homeFromQuiz")
  .addEventListener("click", () => {

    showPage("planetsPage");

  });


/* =====================================
   AI - أسئلة أكثر
===================================== */

document
  .getElementById("aiButton")
  .addEventListener("click", () => {

    showPage("aiPage");

  });


document
  .getElementById("backFromAI")
  .addEventListener("click", () => {

    showPage("resultPage");

  });


document
  .getElementById("askAI")
  .addEventListener("click", askAI);


function askAI() {

  const input =
    document.getElementById("aiInput")
      .value
      .trim()
      .toLowerCase();

  const answer =
    document.getElementById("aiAnswer");

  if (!input) {

    answer.textContent =
      "اكتب سؤالك أولًا 🚀";

    return;

  }


  /* الشمس */

  if (
    input.includes("شمس") ||
    input.includes("الشمس")
  ) {

    answer.textContent =
      "☀️ الشمس نجم يقع في مركز النظام الشمسي، وتدور حوله الكواكب. وهي مصدر الضوء والطاقة الرئيسي للأرض.";

  }


  /* عطارد */

  else if (
    input.includes("عطارد")
  ) {

    answer.textContent =
      "🌑 عطارد هو أقرب كوكب إلى الشمس وأصغر كواكب النظام الشمسي.";

  }


  /* الزهرة */

  else if (
    input.includes("الزهرة")
  ) {

    answer.textContent =
      "🟠 الزهرة هو ثاني كوكب من الشمس، وهو قريب من الأرض في الحجم، ويتميز بغلاف جوي كثيف جدًا.";

  }


  /* الأرض */

  else if (
    input.includes("ارض") ||
    input.includes("الأرض")
  ) {

    answer.textContent =
      "🌍 الأرض هي الكوكب الذي نعيش عليه، وهي الكوكب الوحيد المعروف حاليًا بوجود حياة عليه.";

  }


  /* المريخ */

  else if (
    input.includes("مريخ") ||
    input.includes("المريخ") ||
    input.includes("احمر") ||
    input.includes("أحمر")
  ) {

    answer.textContent =
      "🔴 المريخ هو رابع كواكب النظام الشمسي ويُعرف بالكوكب الأحمر. وله قمران صغيران هما فوبوس وديموس.";

  }


  /* المشتري */

  else if (
    input.includes("مشتري") ||
    input.includes("المشتري")
  ) {

    answer.textContent =
      "🟤 المشتري هو أكبر كواكب النظام الشمسي، ويتميز بالبقعة الحمراء العظيمة وهي عاصفة ضخمة.";

  }


  /* زحل */

  else if (
    input.includes("زحل") ||
    input.includes("حلقات")
  ) {

    answer.textContent =
      "🪐 زحل سادس كواكب النظام الشمسي، ويشتهر بنظام الحلقات الجميل المكون من الجليد والصخور والغبار.";

  }


  /* أورانوس */

  else if (
    input.includes("اورانوس") ||
    input.includes("أورانوس")
  ) {

    answer.textContent =
      "🔵 أورانوس هو سابع كواكب النظام الشمسي، ويمتاز بميل محوره بشكل كبير.";

  }


  /* نبتون */

  else if (
    input.includes("نبتون")
  ) {

    answer.textContent =
      "🔵 نبتون هو أبعد كوكب عن الشمس، ويتميز بلونه الأزرق ورياحه القوية جدًا.";

  }


  /* القمر */

  else if (
    input.includes("قمر") ||
    input.includes("القمر")
  ) {

    answer.textContent =
      "🌙 القمر هو القمر الطبيعي الوحيد للأرض. وتؤثر جاذبيته في ظاهرة المد والجزر.";

  }


  /* الكواكب */

  else if (
    input.includes("كم كوكب") ||
    input.includes("عدد الكواكب")
  ) {

    answer.textContent =
      "🪐 يوجد 8 كواكب معترف بها في النظام الشمسي: عطارد، الزهرة، الأرض، المريخ، المشتري، زحل، أورانوس ونبتون.";

  }


  /* ترتيب الكواكب */

  else if (
    input.includes("ترتيب") ||
    input.includes("رتب الكواكب")
  ) {

    answer.textContent =
      "☀️ ترتيب الكواكب من الأقرب إلى الأبعد عن الشمس: عطارد، الزهرة، الأرض، المريخ، المشتري، زحل، أورانوس، نبتون.";

  }


  /* أكبر كوكب */

  else if (
    input.includes("اكبر كوكب") ||
    input.includes("أكبر كوكب")
  ) {

    answer.textContent =
      "🟤 أكبر كوكب في النظام الشمسي هو المشتري.";

  }


  /* أصغر كوكب */

  else if (
    input.includes("اصغر كوكب") ||
    input.includes("أصغر كوكب")
  ) {

    answer.textContent =
      "🌑 أصغر كوكب في النظام الشمسي هو عطارد.";

  }


  /* أبعد كوكب */

  else if (
    input.includes("ابعد كوكب") ||
    input.includes("أبعد كوكب")
  ) {

    answer.textContent =
      "🔵 أبعد كوكب معروف في النظام الشمسي هو نبتون.";

  }


  /* أقرب كوكب */

  else if (
    input.includes("اقرب كوكب") ||
    input.includes("أقرب كوكب")
  ) {

    answer.textContent =
      "🌑 أقرب كوكب إلى الشمس هو عطارد.";

  }


  /* النجوم */

  else if (
    input.includes("نجم") ||
    input.includes("نجوم")
  ) {

    answer.textContent =
      "⭐ النجوم أجسام ضخمة تنتج الضوء والطاقة من داخلها. الشمس نفسها تعتبر نجمًا.";

  }


  /* المذنب */

  else if (
    input.includes("مذنب") ||
    input.includes("المذنب")
  ) {

    answer.textContent =
      "☄️ المذنب جسم مكون من الجليد والغبار والصخور، ويمكن أن يظهر له ذيل عندما يقترب من الشمس.";

  }


  /* الكويكب */

  else if (
    input.includes("كويكب") ||
    input.includes("الكويكب")
  ) {

    answer.textContent =
      "🪨 الكويكب جسم صخري صغير يدور حول الشمس، وتوجد أعداد كبيرة منه في النظام الشمسي.";

  }


  /* الشهاب */

  else if (
    input.includes("شهاب") ||
    input.includes("الشهاب")
  ) {

    answer.textContent =
      "☄️ الشهاب هو الضوء الذي نراه عندما يدخل جسم صغير الغلاف الجوي ويحترق.";

  }


  /* النيزك */

  else if (
    input.includes("نيزك") ||
    input.includes("النيزك")
  ) {

    answer.textContent =
      "🪨 النيزك هو جزء من جسم فضائي يصل إلى سطح الأرض.";

  }


  /* درب التبانة */

  else if (
    input.includes("درب التبانة") ||
    input.includes("مجرة")
  ) {

    answer.textContent =
      "🌌 درب التبانة هي المجرة التي يوجد فيها النظام الشمسي، وتحتوي على عدد هائل من النجوم.";

  }


  /* الثقب الأسود */

  else if (
    input.includes("ثقب اسود") ||
    input.includes("ثقب أسود") ||
    input.includes("الثقب الأسود")
  ) {

    answer.textContent =
      "🕳️ الثقب الأسود منطقة في الفضاء تكون جاذبيتها قوية جدًا، ولا يستطيع الضوء الإفلات بعد تجاوز أفق الحدث.";

  }


  /* بلوتو */

  else if (
    input.includes("بلوتو")
  ) {

    answer.textContent =
      "🪐 بلوتو يصنف حاليًا ككوكب قزم، وليس واحدًا من الكواكب الثمانية الرئيسية.";

  }


  /* الحياة خارج الأرض */

  else if (
    input.includes("حياة") ||
    input.includes("كائنات فضائية")
  ) {

    answer.textContent =
      "👽 حتى الآن لا يوجد دليل علمي مؤكد على وجود حياة خارج الأرض، لكن العلماء يواصلون البحث عن بيئات قد تكون مناسبة للحياة.";

  }


  /* الفضاء */

  else if (
    input.includes("فضاء") ||
    input.includes("الفضاء")
  ) {

    answer.textContent =
      "🌌 الفضاء منطقة شاسعة تحتوي على النجوم والكواكب والمجرات والسدم والثقوب السوداء وغيرها من الأجرام.";

  }


  /* الجاذبية */

  else if (
    input.includes("جاذبية")
  ) {

    answer.textContent =
      "🌍 الجاذبية قوة تجعل الأجسام تتجاذب. وهي السبب في بقاء الكواكب في مداراتها حول الشمس.";

  }


  /* القمر والمهمات */

  else if (
    input.includes("ابولو") ||
    input.includes("أبولو") ||
    input.includes("هبوط")
  ) {

    answer.textContent =
      "🚀 برنامج أبولو التابع لناسا حقق أول هبوط بشري على سطح القمر عام 1969.";

  }


  /* سؤال عام */

  else if (
    input.includes("كيف") ||
    input.includes("ليش") ||
    input.includes("لماذا") ||
    input.includes("ما هو") ||
    input.includes("وش")
  ) {

    answer.textContent =
      "🌠 سؤال جميل! أقدر أجاوبك عن الكواكب، الشمس، القمر، النجوم، المذنبات، الكويكبات، المجرات، الثقوب السوداء والجاذبية.";

  }


  /* سؤال غير معروف */

  else {

    answer.textContent =
      "🤖 ما عندي إجابة جاهزة لهذا السؤال حاليًا. جرب تسألني عن كوكب، الشمس، القمر، النجوم، المذنب، الكويكب، المجرات أو الثقوب السوداء.";

  }

}


/* =====================================
   اللعبة
===================================== */

let gameScore = 0;
let totalGameScore = 0;
let gameTime = 30;

let gameTimer = null;
let gameIntervals = [];

let currentStage = 1;

let rocketPosition = 50;
let rocketElement = null;

const gameArea =
  document.getElementById("gameArea");

const gameScoreElement =
  document.getElementById("gameScore");

const gameTimeElement =
  document.getElementById("gameTime");

const stageTitle =
  document.getElementById("stageTitle");

const countdownElement =
  document.getElementById("countdown");


function clearGameTimers() {

  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }

  gameIntervals.forEach(timer => {
    clearInterval(timer);
  });

  gameIntervals = [];

  gameArea.innerHTML = "";

}


function updateGameUI() {

  gameScoreElement.textContent =
    Math.max(0, gameScore);

  gameTimeElement.textContent =
    Math.max(0, gameTime);

}


function startGame() {

  totalGameScore = 0;
  currentStage = 1;

  showPage("gamePage");

  startStage(1);

}


function startStage(stage) {

  clearGameTimers();

  currentStage = stage;

  if (stage === 1) {

    gameScore = 0;
    gameTime = 30;

    stageTitle.textContent =
      "☄️ المرحلة الأولى: اصطد النيازك";

  }

  if (stage === 2) {

    gameScore = 0;
    gameTime = 35;

    stageTitle.textContent =
      "🚀 المرحلة الثانية: تجنب النيازك";

  }

  if (stage === 3) {

    gameScore = 0;
    gameTime = 35;

    stageTitle.textContent =
      "🚀 المرحلة الثالثة: اجمع البطاريات";

  }

  updateGameUI();

  showCountdown(() => {

    if (stage === 1) {
      runStage1();
    }

    if (stage === 2) {
      runStage2();
    }

    if (stage === 3) {
      runStage3();
    }

  });

}


function showCountdown(callback) {

  const numbers = [
    "3",
    "2",
    "1",
    "🚀 انطلق!"
  ];

  let index = 0;

  countdownElement.textContent =
    numbers[index];

  const timer = setInterval(() => {

    index++;

    if (index >= numbers.length) {

      clearInterval(timer);

      countdownElement.textContent = "";

      callback();

      return;

    }

    countdownElement.textContent =
      numbers[index];

  }, 700);

  gameIntervals.push(timer);

}


/* =====================================
   المرحلة الأولى
===================================== */

function runStage1() {

  gameArea.innerHTML = "";

  gameTimer = setInterval(() => {

    gameTime--;

    updateGameUI();

    if (gameTime <= 0) {
      finishStage1();
    }

  }, 1000);


  const meteorSpawner = setInterval(() => {

    if (gameTime <= 0) return;

    createStage1Meteor();

  }, 650);

  gameIntervals.push(meteorSpawner);

}


function createStage1Meteor() {

  const meteor =
    document.createElement("div");

  meteor.className =
    "game-object game-meteor";

  meteor.textContent = "☄️";

  meteor.style.left =
    `${Math.random() * 88}%`;

  meteor.style.top =
    `${Math.random() * 82}%`;

  meteor.addEventListener("click", () => {

    if (meteor.dataset.clicked) return;

    meteor.dataset.clicked = "true";

    gameScore++;

    clickSound();

    updateGameUI();

    meteor.remove();

    if (gameScore >= 30) {
      finishStage1();
    }

  });

  gameArea.appendChild(meteor);

  setTimeout(() => {

    if (meteor.isConnected) {
      meteor.remove();
    }

  }, 1000);

}


function finishStage1() {

  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }

  totalGameScore +=
    Math.min(gameScore, 30);

  clearGameTimers();

  setTimeout(() => {
    startStage(2);
  }, 500);

}


/* =====================================
   المرحلة الثانية
===================================== */

function runStage2() {

  gameArea.innerHTML = "";

  rocketPosition = 50;

  createRocket();

  gameTimer = setInterval(() => {

    gameTime--;

    /*
      نقطة كل ثانية بدون اصطدام
    */

    gameScore++;

    if (gameScore > 35) {
      gameScore = 35;
    }

    updateGameUI();

    if (gameTime <= 0 || gameScore >= 35) {
      finishStage2();
    }

  }, 1000);


  const meteorSpawner = setInterval(() => {

    if (gameTime <= 0) return;

    createFallingMeteor();

  }, 900);

  gameIntervals.push(meteorSpawner);

}


function createRocket() {

  rocketElement =
    document.createElement("div");

  rocketElement.className =
    "game-object game-rocket";

  rocketElement.textContent = "🚀";

  rocketElement.style.bottom = "20px";

  rocketElement.style.left =
    `${rocketPosition}%`;

  rocketElement.style.transform =
    "translateX(-50%)";

  gameArea.appendChild(rocketElement);

}


function moveRocket(direction) {

  if (!rocketElement) return;

  rocketPosition += direction * 7;

  rocketPosition =
    Math.max(
      7,
      Math.min(93, rocketPosition)
    );

  rocketElement.style.left =
    `${rocketPosition}%`;

}


function createFallingMeteor() {

  const meteor =
    document.createElement("div");

  meteor.className =
    "game-object game-meteor";

  meteor.textContent = "☄️";

  meteor.style.left =
    `${Math.random() * 90 + 5}%`;

  meteor.style.top = "-55px";

  gameArea.appendChild(meteor);

  let position = -55;

  const fallTimer = setInterval(() => {

    position += 5;

    meteor.style.top =
      `${position}px`;

    checkMeteorCollision(
      meteor,
      fallTimer
    );

    if (position > gameArea.clientHeight) {

      clearInterval(fallTimer);

      meteor.remove();

    }

  }, 50);

  gameIntervals.push(fallTimer);

}


function checkMeteorCollision(meteor, timer) {

  if (!rocketElement || !meteor.isConnected) {
    return;
  }

  const meteorRect =
    meteor.getBoundingClientRect();

  const rocketRect =
    rocketElement.getBoundingClientRect();

  const collision =
    meteorRect.left < rocketRect.right &&
    meteorRect.right > rocketRect.left &&
    meteorRect.top < rocketRect.bottom &&
    meteorRect.bottom > rocketRect.top;

  if (collision) {

    clearInterval(timer);

    meteor.remove();

    gameScore -= 2;
    gameTime -= 2;

    if (gameScore < 0) {
      gameScore = 0;
    }

    if (gameTime < 0) {
      gameTime = 0;
    }

    wrongSound();

    updateGameUI();

    if (gameTime <= 0) {
      finishStage2();
    }

  }

}


function finishStage2() {

  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }

  totalGameScore +=
    Math.min(
      Math.max(gameScore, 0),
      35
    );

  clearGameTimers();

  setTimeout(() => {
    startStage(3);
  }, 500);

}


/* =====================================
   المرحلة الثالثة
   البطاريات الآن تنزل من الأعلى
===================================== */

function runStage3() {

  gameArea.innerHTML = "";

  rocketPosition = 50;

  createRocket();

  gameTimer = setInterval(() => {

    gameTime--;

    updateGameUI();

    if (gameTime <= 0) {
      finishStage3();
    }

  }, 1000);


  /* البطاريات */

  const batterySpawner = setInterval(() => {

    if (gameTime <= 0) return;

    createFallingBattery();

  }, 850);


  /* النيازك */

  const meteorSpawner = setInterval(() => {

    if (gameTime <= 0) return;

    createStage3Meteor();

  }, 1100);


  gameIntervals.push(batterySpawner);
  gameIntervals.push(meteorSpawner);

}


/*
   🔋 البطارية تبدأ من فوق
   وتنزل تدريجيًا إلى أسفل
*/

function createFallingBattery() {

  const battery =
    document.createElement("div");

  battery.className =
    "game-object game-battery";

  battery.textContent = "🔋";

  const startX =
    Math.random() * 88 + 5;

  battery.style.left =
    `${startX}%`;

  battery.style.top =
    "-50px";

  gameArea.appendChild(battery);

  let position = -50;

  let clicked = false;

  const fallTimer = setInterval(() => {

    if (!battery.isConnected) {

      clearInterval(fallTimer);

      return;

    }

    position += 3;

    battery.style.top =
      `${position}px`;


    /* فحص جمع البطارية */

    if (!clicked && rocketElement) {

      const batteryRect =
        battery.getBoundingClientRect();

      const rocketRect =
        rocketElement.getBoundingClientRect();

      const collected =
        batteryRect.left < rocketRect.right &&
        batteryRect.right > rocketRect.left &&
        batteryRect.top < rocketRect.bottom &&
        batteryRect.bottom > rocketRect.top;

      if (collected) {

        clicked = true;

        gameScore += 2;

        if (gameScore > 35) {
          gameScore = 35;
        }

        correctSound();

        updateGameUI();

        clearInterval(fallTimer);

        battery.remove();

      }

    }


    if (position > gameArea.clientHeight) {

      clearInterval(fallTimer);

      battery.remove();

    }

  }, 50);

  gameIntervals.push(fallTimer);

}


/*
   نيازك المرحلة الثالثة
*/

function createStage3Meteor() {

  const meteor =
    document.createElement("div");

  meteor.className =
    "game-object game-meteor";

  meteor.textContent = "☄️";

  meteor.style.left =
    `${Math.random() * 90 + 5}%`;

  meteor.style.top = "-55px";

  gameArea.appendChild(meteor);

  let position = -55;

  const fallTimer = setInterval(() => {

    position += 5;

    meteor.style.top =
      `${position}px`;

    checkMeteorCollision(
      meteor,
      fallTimer
    );

    if (position > gameArea.clientHeight) {

      clearInterval(fallTimer);

      meteor.remove();

    }

  }, 50);

  gameIntervals.push(fallTimer);

}


function finishStage3() {

  if (gameTimer) {
    clearInterval(gameTimer);
    gameTimer = null;
  }

  totalGameScore +=
    Math.min(
      Math.max(gameScore, 0),
      35
    );

  if (totalGameScore > 100) {
    totalGameScore = 100;
  }

  clearGameTimers();

  setTimeout(() => {
    showGameResult();
  }, 500);

}


/* =====================================
   أزرار الصاروخ
===================================== */

document
  .getElementById("leftButton")
  .addEventListener("click", () => {

    moveRocket(-1);

  });


document
  .getElementById("rightButton")
  .addEventListener("click", () => {

    moveRocket(1);

  });


document.addEventListener("keydown", event => {

  if (
    !document
      .getElementById("gamePage")
      .classList.contains("active")
  ) {
    return;
  }

  if (event.key === "ArrowLeft") {
    moveRocket(-1);
  }

  if (event.key === "ArrowRight") {
    moveRocket(1);
  }

});


/* =====================================
   نتيجة اللعبة
===================================== */

function showGameResult() {

  showPage("gameResultPage");

  document
    .getElementById("gameFinalScore")
    .textContent =
    totalGameScore;

  let message;

  if (totalGameScore >= 90) {

    message =
      "🔥 أسطوري! مستكشف فضاء محترف!";

  } else if (totalGameScore >= 70) {

    message =
      "🚀 ممتاز! أداء قوي جدًا!";

  } else if (totalGameScore >= 50) {

    message =
      "🌟 جيد! حاول تحطم رقمك.";

  } else {

    message =
      "🪐 حاول مرة ثانية وطور مهاراتك!";

  }

  document
    .getElementById("gameResultMessage")
    .textContent =
    message;

}


document
  .getElementById("gameButton")
  .addEventListener("click", startGame);


document
  .getElementById("restartGame")
  .addEventListener("click", startGame);


document
  .getElementById("homeFromGame")
  .addEventListener("click", () => {

    showPage("planetsPage");

  });
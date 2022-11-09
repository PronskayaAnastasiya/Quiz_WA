const questions = [
	{
		question: "Какой язык работает в браузере?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Что означает CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Что означает HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В каком году был создан JavaScript?",
		answers: ["1996", "1995", "1994", "все ответы неверные"],
		correct: 2,
	},
];

//Находим элементы
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

//Переменные игры
let score = 0;//количество правильных ответов
let questionIndex = 0;//текущий вопрос

clearPage();
showQuestion();

submitBtn.onclick = checkAnswer;

//Очистка HTML
function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {

	//Вопрос
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	//Варианты ответа
	for ([index, answerText] of questions[questionIndex]['answers'].entries()) {

		const questionTempate =
			`<li>
					<label>
						<input value="%number%" type="radio" class="answer" name="answer" />
						<span>%answer%</span>
					</label>
			</li>`;

		const answerHTML = questionTempate
			.replace('%answer%', answerText)
			.replace('%number%', index + 1);
		listContainer.innerHTML += answerHTML;
	}
}

function checkAnswer() {

	//Находим выбранную радиокнопку
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	//Если ответ не выбран ничего не делаем и выходим из функции
	if (!checkedRadio) {
		submitBtn.blur();
		return;
	}

	//Узнаем номер ответа пользователя
	const userAnswer = parseInt(checkedRadio.value);

	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}

	if (questionIndex !== questions.length - 1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		sowrResults();
	}
}

function sowrResults() {

	const resultTemlate = `
			<h2 class="title">%title%</h2>
			<h3 class="summary">%message%</h3>
			<p class="result">%result%</p>
			`;

	let title, message;
	//варианты заголовков и текста
	if (score == questions.length) {
		title = 'Поздравляем! 🎉';
		message = 'Вы ответили верно на все вопросы! 😎👍';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Неплохой результат! 🙂';
		message = 'Вы далиболее половины правильныхответов! 👍';
	} else {
		title = 'Стоит постараться! 🙂';
		message = 'Пока у вас меньшеполовины правилных ответов! 👍';
	}

	//Результат
	let result = `${score} из ${questions.length}`;

	//Финальный ответ
	const finalMessage = resultTemlate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result);
	headerContainer.innerHTML = finalMessage;

	//Меняем кнопку на играть снова
	submitBtn.blur();
	submitBtn.innerText = 'Начать заново';
	submitBtn.onclick = () => { history.go() };
}


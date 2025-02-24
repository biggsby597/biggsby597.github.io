// This file is now using Firebase objects from the global scope, as defined in webpage.html


const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();


// JavaScript Part (yourScript.js)

let sessionData;

document.getElementById("startButton").addEventListener("click", () => {
  console.log("Start Test button clicked");
  startTest();
});

function startTest() {
  document.getElementById('startButtonDiv').style.display = 'none'; // Hide the start button
  document.getElementById('test').style.display = 'block'; // Show the test area
  
  sessionData = { questionsAnswered: 0, correctAnswers: 0 };

  // Start the test by asking the first question
  askQuestion();

  // End the session after 5 minutes (200000 milliseconds)
  setTimeout(endSession, 10000); // 5 minutes
}

let currentQuestion;

function askQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  currentQuestion = { num1, num2 };
  document.getElementById('question').innerText = `What is ${num1} x ${num2}?`;
  document.getElementById('answer').value = '';
  document.getElementById('feedback').innerText = '';
}

document.getElementById('submitAnswer').addEventListener('click', handleAnswerSubmission);
document.getElementById('answer').addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    handleAnswerSubmission();
  }
});

function handleAnswerSubmission() {
  const userAnswer = parseInt(document.getElementById('answer').value);
  const correctAnswer = currentQuestion.num1 * currentQuestion.num2;
  sessionData.questionsAnswered++;

  if (userAnswer === correctAnswer) {
    sessionData.correctAnswers += 1;
    document.getElementById('feedback').innerText = "Correct!";
  } else {
    document.getElementById('feedback').innerText = `Wrong! The correct answer was ${correctAnswer}.`;
  }

  // Ask a new question
  askQuestion();
}

// End session function to display results
function endSession() {
  // Calculate the result and display it
  const percentageCorrect = (sessionData.correctAnswers / sessionData.questionsAnswered) * 100;
  document.getElementById('test').style.display = 'none';
  document.getElementById('result').style.display = 'block';

  document.getElementById('score').innerText = `You answered ${sessionData.correctAnswers} out of ${sessionData.questionsAnswered} questions correctly. (${percentageCorrect.toFixed(2)}%)`;
}

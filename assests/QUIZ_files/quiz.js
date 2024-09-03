document.addEventListener("DOMContentLoaded", () => {
  const questionElement = document.getElementById("question");
  const optionsList = document.getElementById("options");
  const scoreElement = document.getElementById("score");
  const progressBarFull = document.getElementById("progressBarFull");
  const timerElement = document.getElementById("timer");
  const timerAudio = document.getElementById("timerAudio");

  let currentQuestionIndex = 0;
  let quizData = [];
  let timer;
  let timeLeft = 5; // Timer countdown time in seconds

  // Fetch the JSON data
  fetch("quiz.json")
    .then((response) => response.json())
    .then((data) => {
      quizData = data.quiz;
      loadQuestion();
      startTimer(); // Start the timer when quiz data is loaded
    })
    .catch((error) => console.error("Error fetching the JSON data:", error));

  // Load the current question and its options
  function loadQuestion() {
    if (currentQuestionIndex >= quizData.length) {
      endQuiz();
      return;
    }

    const question = quizData[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsList.innerHTML = ""; // Clear previous options

    question.options.forEach((option) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.addEventListener("click", () => {
        handleAnswerClick(button, question.answer);
      });
      optionsList.appendChild(button);
    });
  }

  // Handle the answer click event
  function handleAnswerClick(selectedButton, correctAnswer) {
    const buttons = optionsList.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.textContent === correctAnswer) {
        button.classList.add("correct");
      } else if (button === selectedButton) {
        button.classList.add("incorrect");
      }
      button.disabled = true; // Disable all buttons after selection
    });

    // Move to the next question after a short delay
    setTimeout(() => {
      currentQuestionIndex++;
      loadQuestion();
    }, 1000); // 1 second delay for the user to see the feedback
  }

  // Start the timer
  function startTimer() {
    timer = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;

      // Play the sound every second
      timerAudio.play();

      if (timeLeft <= 0) {
        clearInterval(timer); // Stop the timer
        endQuiz(); // End the quiz when time is up
      }
    }, 1000); // Update every second
  }

  // End the quiz and stop the timer and sound
  function endQuiz() {
    questionElement.textContent = "Quiz Completed!";
    optionsList.innerHTML = "";
    clearInterval(timer); // Stop the timer
    timerElement.textContent = "0";
    timerAudio.pause(); // Stop the sound
    timerAudio.currentTime = 0; // Reset sound to the start
  }
});

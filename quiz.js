document.addEventListener("DOMContentLoaded", () => {
  const questionElement = document.getElementById("question");
  const optionsList = document.getElementById("options");
  const scoreElement = document.getElementById("score");
  const progressBarFull = document.getElementById("progressBarFull");
  const progressText = document.getElementById("progressText");
  const timerElement = document.getElementById("timer");
  const timerAudio = document.getElementById("timerAudio");

  let currentQuestionIndex = 0;
  let quizData = [];
  let score = 0;
  let timer;
  let timeLeft = 90; // Timer countdown time in seconds

  // Function to shuffle the questions array
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    return array;
  }

  // Fetch the JSON data and shuffle to pick 10 random questions
  fetch("quiz.json")
    .then((response) => response.json())
    .then((data) => {
      // Shuffle the questions and pick the first 10
      quizData = shuffleArray(data.quiz).slice(0, 10);
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

    // Update the HUD with progress
    progressText.textContent = `Question ${currentQuestionIndex + 1}/${
      quizData.length
    }`;
    progressBarFull.style.width = `${
      ((currentQuestionIndex + 1) / quizData.length) * 100
    }%`;
  }

  // Handle the answer click event
  function handleAnswerClick(selectedButton, correctAnswer) {
    const buttons = optionsList.querySelectorAll("button");
    buttons.forEach((button) => {
      if (button.textContent === correctAnswer) {
        button.classList.add("correct");
        // Only add score if the selected answer is correct
        if (selectedButton.textContent === correctAnswer) {
          score += 10;
          scoreElement.textContent = score;
        }
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
    clearInterval(timer); // Stop the timer
    timerAudio.pause(); // Stop the sound

    // Redirect to score.html with the score
    window.location.href = `score.html?score=${score}`;
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const finalScoreElement = document.getElementById("finalScore");
  const playAgainButton = document.getElementById("playAgainButton");
  const goHomeButton = document.getElementById("goHomeButton");
  const cheerAudio = document.getElementById("cheerAudio");
  const booAudio = document.getElementById("booAudio");

  // Get the score from the query string (URL parameter)
  const urlParams = new URLSearchParams(window.location.search);
  const score = parseInt(urlParams.get("score")) || 0; // Default to 0 if no score is found
  const totalQuestions = 10; // Set this to the total number of questions in your quiz
  const maxScore = totalQuestions * 10;
  const scorePercentage = (score / maxScore) * 100;

  // Display the final score
  finalScoreElement.textContent = score;

  // Play the corresponding sound based on the score
  if (scorePercentage < 50) {
    booAudio.play();
  } else {
    cheerAudio.play();
  }

  // Play Again button
  playAgainButton.addEventListener("click", () => {
    window.location.href = "quiz.html"; // Redirect to the quiz start page
  });

  // Go Home button
  goHomeButton.addEventListener("click", () => {
    window.location.href = "home.html"; // Redirect to the home page
  });
});

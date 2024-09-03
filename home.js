document.addEventListener("DOMContentLoaded", () => {
  const homeAudio = document.getElementById("homeAudio");

  // Play the audio when the page loads
  homeAudio.play().catch((error) => {
    console.log(
      "Autoplay was prevented. Playing audio after user interaction."
    );
  });

  // Play the audio after user clicks the button if autoplay was blocked
  const startButton = document.getElementById("startQuizButton");
  startButton.addEventListener("click", () => {
    if (homeAudio.paused) {
      homeAudio.play(); // Play audio if it was paused due to autoplay restrictions
    }
    window.location.href = "quiz.html"; // Redirect to quiz page
  });
});

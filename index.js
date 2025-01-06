// DOM Elements
const audio = document.getElementById("audioPlayer");
const audioKill = document.getElementById("audioWinSound");
const audioHit = document.getElementById("audioHitSound");
const stats = document.getElementById("stats-el");
const image = document.getElementById("predatorImage");

// Game variables
let playGame = false;
let hits = 0;
let kills = 0;
let cursorX = 0;
let cursorY = 0;

// Update cursor position on mouse move
window.addEventListener('mousemove', (event) => {
    cursorX = event.clientX;
    cursorY = event.clientY;
  });

// Hide the image when the window loads
window.onload = function () {
  image.style.opacity = 0;
};

// Get random position for the predator image
function getRandomPosition() {
  let windowWidth = window.innerWidth;
  let windowHeight = window.innerHeight;
  let randomX = Math.floor(Math.random() * (windowWidth - 100)); // Adjust for image width
  let randomY = Math.floor(Math.random() * (windowHeight - 100)); // Adjust for image height
  return { x: randomX, y: randomY };
}

// Move the Predator image to a random position
function moveImage() {
    let newPosition = getRandomPosition();
    image.style.left = newPosition.x + "px";
    image.style.top = newPosition.y + "px";
    image.style.opacity = 1; // Reset opacity

    // Check if the predator found the human prey      
    if(isCursorOverImage()) {
        hits++;
        audioHit.play();
        updateStats();
    }
  
    // Wait for 1 second before fading out the image
    setTimeout(function () {
        image.style.opacity = 0; // Start fading out
        
        // If the game is still on, move the image again
        if (playGame) {
            setTimeout(function () {
                moveImage();
            }, 1000); // Wait for 1 seconds before moving the image
      }
    }, 1000);
}

// Check if the predator found the human prey  
// Function to check if cursor is over the predator image 
function isCursorOverImage() { 
    let rect = image.getBoundingClientRect(); 
    return (cursorX >= rect.left && cursorX <= rect.right && cursorY >= rect.top && cursorY <= rect.bottom); 
}

// Function to handle the click event of the predator image (Kill the predator)
function handleClick() {
    kills++;
    audioKill.play();
    updateStats(); 
    image.style.opacity = 0; // Start fading out
        setTimeout(function () {
            moveImage();
        }, 2000); // Wait for 2 seconds before moving the image
}

// Update the stats
function updateStats() {
    stats.textContent = "Hits: " + hits + " Kills: " + kills;
}

// Start the Game
function start() {
    audio.play();
    playGame = true;
    moveImage();
  }
  
// Stop the Game
function stop() {
    playGame = false;
    audio.pause(); // Optional: Pause the audio if it's playing
    image.style.opacity = 0;
}
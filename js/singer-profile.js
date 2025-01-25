const singerSongs = document.querySelectorAll('#singerSongs li');
const musicPlayer = document.querySelector('.music-player');
const playerImage = document.getElementById('playerImage');
const songTitle = document.getElementById('songTitle');
const artistName = document.getElementById('artistName');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const audio = new Audio();

let currentSongIndex = 0;
let isPlaying = false;


musicPlayer.style.display = 'none';


function playSong(songElement) {
  const songSrc = songElement.getAttribute('data-song');
  const title = songElement.getAttribute('data-title');
  const artist = songElement.getAttribute('data-artist');

  audio.src = songSrc; 
  songTitle.textContent = title; 
  artistName.textContent = artist; 
  playerImage.src = 'images/a4.jpg';

  isPlaying = true;
  playPauseBtn.textContent = '⏸'; 

  musicPlayer.style.display = 'flex'; 
  audio.play(); 
}

function togglePlayPause() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playPauseBtn.textContent = '▶️';
  } else {
    audio.play();
    isPlaying = true;
    playPauseBtn.textContent = '⏸'; 
  }
}


function updateProgress() {
  const currentTime = audio.currentTime;
  const duration = audio.duration;

  progressBar.value = (currentTime / duration) * 100;
  currentTimeEl.textContent = formatTime(currentTime);
  durationEl.textContent = formatTime(duration);
}

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
}

// Play the previous song
function playPreviousSong() {
  currentSongIndex = (currentSongIndex - 1 + singerSongs.length) % singerSongs.length;
  playSong(singerSongs[currentSongIndex]);
}


function playNextSong() {
  currentSongIndex = (currentSongIndex + 1) % singerSongs.length;
  playSong(singerSongs[currentSongIndex]);
}

singerSongs.forEach((song, index) => {
  const playButton = song.querySelector('.play-btn'); 
  song.addEventListener('click', () => {
    currentSongIndex = index;
    playSong(song);
  });

  playButton.addEventListener('click', (event) => {
    event.stopPropagation(); 
    currentSongIndex = index;
    playSong(song);
  });
});

playPauseBtn.addEventListener('click', togglePlayPause);

prevBtn.addEventListener('click', playPreviousSong);
nextBtn.addEventListener('click', playNextSong);


audio.addEventListener('timeupdate', updateProgress);


audio.addEventListener('loadedmetadata', () => {
  durationEl.textContent = formatTime(audio.duration);
});


progressBar.addEventListener('input', (event) => {
  const seekTime = (event.target.value / 100) * audio.duration;
  audio.currentTime = seekTime;
});

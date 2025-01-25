document.addEventListener("DOMContentLoaded", () => {
  const audioPlayer = document.getElementById("audioPlayer"); // Main audio player
  const playIcons = document.querySelectorAll(".play-icon"); // All play icons
  const playPauseBtn = document.getElementById("playPauseBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  const progressBar = document.getElementById("progressBar");
  const currentTimeDisplay = document.getElementById("currentTime");
  const durationDisplay = document.getElementById("duration");

  let playlist = [];
  let currentIndex = 0;

  // Load playlist
  playIcons.forEach((icon, index) => {
    const songItem = icon.closest(".song-item");
    const audioUrl = icon.getAttribute("data-audio");
    const artistName = songItem.querySelector(".info p:first-child").innerText;
    const songTitle = songItem.querySelector(".info p:last-child").innerText;
    const songImage = songItem.querySelector("img").src;

    playlist.push({
      audioUrl,
      artistName,
      songTitle,
      songImage,
    });

    // Assign click event to play icon
    icon.addEventListener("click", (event) => {
      event.preventDefault();
      currentIndex = index; // Update current song index
      playSong(currentIndex);
    });
  });

  // Function to play song by index
  function playSong(index) {
    const { audioUrl, artistName, songTitle, songImage } = playlist[index];
    audioPlayer.src = audioUrl;
    audioPlayer.play();

    // Show the music player
    document.getElementById("musicPlayer").style.display = "flex";

    // Update music player UI
    document.getElementById("playerImage").src = songImage;
    document.getElementById("songTitle").innerText = songTitle;
    document.getElementById("artistName").innerText = artistName;

    // Update play/pause button
    playPauseBtn.innerText = "⏸️";
  }

  // Play/Pause button functionality
  playPauseBtn.addEventListener("click", () => {
    if (audioPlayer.paused) {
      audioPlayer.play();
      playPauseBtn.innerText = "⏸️";
    } else {
      audioPlayer.pause();
      playPauseBtn.innerText = "▶️";
    }
  });

 
  nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % playlist.length; 
    playSong(currentIndex);
  });

  
  prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length; 
    playSong(currentIndex);
  });


  audioPlayer.addEventListener("timeupdate", () => {
    const currentTime = audioPlayer.currentTime;
    const duration = audioPlayer.duration;

    progressBar.value = (currentTime / duration) * 100 || 0;
    currentTimeDisplay.innerText = formatTime(currentTime);
    durationDisplay.innerText = formatTime(duration);
  });

  // Format time to mm:ss
  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  }

  // Seek functionality
  progressBar.addEventListener("input", () => {
    const duration = audioPlayer.duration;
    if (duration) {
      audioPlayer.currentTime = (progressBar.value / 100) * duration;
    }
  });
  const singerCards = document.querySelectorAll('.singer-card');
  
 
  singerCards.forEach(card => {
    card.addEventListener('click', () => {
      const singerName = card.dataset.name;
      const singerImage = card.dataset.image;
      const singerSongs = JSON.parse(card.dataset.songs);
      const targetLink = card.dataset.link; 
      window.location.href = `${targetLink}?singerName=${encodeURIComponent(singerName)}&singerImage=${encodeURIComponent(singerImage)}&singerSongs=${encodeURIComponent(JSON.stringify(singerSongs))}`;
    });
  });

  const showAllBtn = document.getElementById('showAllBtn');
  const allSingerCards = document.querySelectorAll('.singer-card');
  const rows = 1; 
  let allCardsVisible = false;

 
  allSingerCards.forEach((card, index) => {
    if (index >= rows * 5) { 
      card.style.display = 'none';
    }
  });


  showAllBtn.addEventListener('click', () => {
    if (!allCardsVisible) {
     
      allSingerCards.forEach(card => {
        card.style.display = 'block';
      });
      showAllBtn.innerText = 'Show Less'; 
      allCardsVisible = true;
    } else {
     
      allSingerCards.forEach((card, index) => {
        if (index >= rows * 5) { 
          card.style.display = 'none';
        }
      });
      showAllBtn.innerText = 'Show All'; 
      allCardsVisible = false;
    }
  });
  document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");
  
    
    const musicItems = [
      { name: "Song 1", artist: "Artist A" },
      { name: "Song 2", artist: "Artist B" },
      { name: "Song 3", artist: "Artist C" },
      { name: "Song 4", artist: "Artist A" },
      { name: "Song 5", artist: "Artist B" },
    ];
  
    const resultsContainer = document.createElement("div");
    resultsContainer.id = "searchResults";
    document.body.appendChild(resultsContainer);
  
   
    const displayResults = (results) => {
      resultsContainer.innerHTML = ""; 
      if (results.length === 0) {
        resultsContainer.innerHTML = "<p>No results found</p>";
        return;
      }
  
      results.forEach((item) => {
        const resultItem = document.createElement("div");
        resultItem.className = "result-item";
        resultItem.innerHTML = `
          <p><strong>${item.name}</strong> by ${item.artist}</p>
        `;
        resultsContainer.appendChild(resultItem);
      });
    };
  
    // Search function
    const searchMusic = () => {
      const query = searchInput.value.trim().toLowerCase();
      if (query === "") {
        resultsContainer.innerHTML = "<p>Please enter a search term</p>";
        return;
      }
  
     
      const filteredResults = musicItems.filter((item) =>
        item.name.toLowerCase().includes(query) ||
        item.artist.toLowerCase().includes(query)
      );
  
      displayResults(filteredResults);
    };
  
  
    searchBtn.addEventListener("click", searchMusic);
  
    
    searchInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        searchMusic();
      }
    });
  });
  
});

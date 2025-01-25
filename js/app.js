// Redirect to singer profile
document.querySelectorAll('.singer-card').forEach(card => {
  card.addEventListener('click', () => {
    const image = card.querySelector('img').src;
    const name = card.querySelector('h3').textContent;

    const url = `singer-profile.html?image=${encodeURIComponent(image)}&name=${encodeURIComponent(name)}&songs=${encodeURIComponent(JSON.stringify(['audio/duha.mp3', 'Song 2', 'Song 3']))}`;
    window.location.href = url;
  });
});

// Redirect to playback
function moveToPlayback(imageSrc, title, description) {
  const url = `playback.html?image=${encodeURIComponent(imageSrc)}&title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&audio=${encodeURIComponent('path/to/duha.mp3')}`;
  window.location.href = url;
}

const params = new URLSearchParams(window.location.search);
document.getElementById('songImage').src = params.get('image');
document.getElementById('songTitle').textContent = params.get('title');
document.getElementById('songDescription').textContent = params.get('description');

const audioSrc = params.get('audio');
document.getElementById('audioPlayer').querySelector('source').src = audioSrc;
document.getElementById('audioPlayer').load();

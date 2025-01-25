document.addEventListener("DOMContentLoaded", () => {
  
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
});
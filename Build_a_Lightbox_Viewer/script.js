const thumbnails = document.querySelectorAll('.gallery-item');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.getElementById('lightbox-image');
const closeBtn = document.getElementById('close-btn');

thumbnails.forEach(thumbnail => {
  thumbnail.addEventListener('click', () => {
    const srcFull = thumbnail.src.replace("-thumbnail", "");
    lightboxImage.src = srcFull;
    lightbox.style.display = "flex";
  });
});

closeBtn.addEventListener('click', () => {
  lightbox.style.display = "none";
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = "none";
  }
});

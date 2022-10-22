import { galleryItems } from './gallery-items.js';

const { basicLightbox } = window;

const gallery = document.querySelector('.gallery');

const displayImages = () => {
  const items = [];

  for (const galleryItem of galleryItems) {
    const item = `
      <div class="gallery__item">
        <a class="gallery__link" href="${galleryItem.original}">
          <img
            class="gallery__image"
            src="${galleryItem.preview}"
            data-source="${galleryItem.original}"
            alt="${galleryItem.description}"
          />
        </a>
      </div>
    `;
    items.push(item);
  }

  gallery.insertAdjacentHTML('afterbegin', items.join('\n'));
};

displayImages();

let openedLightbox;

const handleCloseLightbox = event => {
  if (event.key === 'Escape') openedLightbox.close();
};

gallery.addEventListener('click', event => {
  event.preventDefault();

  const { target } = event;

  if (target.tagName === 'IMG') {
    basicLightbox
      .create(
        `<img src="${target.getAttribute('data-source')}" alt="${target.getAttribute('alt')}">`,
        {
          onShow: instance => {
            openedLightbox = instance;
            window.addEventListener('keydown', handleCloseLightbox);
          },
          onClose: () => {
            window.removeEventListener('keydown', handleCloseLightbox);
          },
        },
      )
      .show();
  }
});

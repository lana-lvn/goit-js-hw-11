import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImagesByName, fetchMoreImages } from './pixabay-api';

const refs = {
    searchFormEl: document.querySelector('#search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    footerEl: document.querySelector('.footer'),
};

refs.searchFormEl.addEventListener('submit', handleImagesByName);
refs.loadMoreBtnEl.addEventListener('click', handleNextImages);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
});
let imgToFind = null;

class ImagesToFind {
  constructor(name) {
    this.name = name;
    this.pageCount = 1;
    this.totalHits = 0;
    this.hits = 0;
  }

  async findImages(objName) {
    objName = this.name;
    try {
      const obj = await fetchImagesByName(objName);
      this.totalHits = obj.data.totalHits;
      this.hits += obj.data.hits.length;
      this.isFieldEmpty(this.hits, this.totalHits);
      this.isOnlyOnePageOfImages(this.totalHits);
      this.renderImages(obj.data.hits);
    } catch (err) {
      console.log(err.message);
      Notify.failure(err.message);
    }
  }
  async handleMoreImages() {
    try {
      this.pageCount += 1;
      const nextPage = await fetchMoreImages(this.name, this.pageCount);
      this.hits += nextPage.data.hits.length;
      this.renderImages(nextPage.data.hits);
      this.doSmoothScroll();
      this.isThereEndOfImages();
    } catch (err) {
      console.log(err.message);
      Notify.failure(err.message);
    }
  }
  isFieldEmpty(field, totalHits) {
    if (field === 0) {
      return Notify.failure(
        'Sorry, there are no images matching your search query. Please try again.'
      );
    }
    Notify.success(`Hooray! We found ${totalHits} images.`);
  }
  isOnlyOnePageOfImages(number) {
    if (number > 40) {
      refs.footerEl.classList.remove('is-hidden');
    }
  }
  isThereEndOfImages() {
    if (this.hits >= this.totalHits) {
      refs.footerEl.classList.add('is-hidden');
      return Notify.info(
        `We're sorry, but you've reached the end of search results.`
      );
    }
  }
  renderImages(images) {
    const markup = images
      .map(image => {
        return `
    <div class="photo-card">
        <div class="image-card"><a href ="${image.largeImageURL}">
           <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
        </a></div>
        <div class="info">
            <p class="info-item">
                <b>Likes</b> ${image.likes}
            </p>
            <p class="info-item">
                <b>Views</b> ${image.views}
            </p>
            <p class="info-item">
                <b>Comments</b> ${image.comments}
            </p>
            <p class="info-item">
                <b>Downloads</b> ${image.downloads}
            </p>
        </div>
    </div>`;
      })
      .join('');

    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
  }
  doSmoothScroll() {
    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 1.7,
      behavior: 'smooth',
    });
  }
}

function handleImagesByName(event) {
  event.preventDefault();
  const name = event.currentTarget.searchQuery.value.trim();
  if (name === '') {
    return;
  }

  refs.galleryEl.innerHTML = '';
  refs.footerEl.classList.add('is-hidden');

  imgToFind = new ImagesToFind(name);
  imgToFind.findImages();
  return imgToFind;
}

function handleNextImages() {
  imgToFind.handleMoreImages();
}















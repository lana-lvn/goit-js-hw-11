import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImagesByName, fetchMoreImages } from './pixabay-api.js';

const refs = {
    searchFormEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('.load-more'),
    footerEl: document.querySelector('.footer'),
};

refs.searchFormEl.addEventListener('submit', handleImagesByName);
refs.loadMoreBtnEl.addEventListener('click', handleNextImages);

const lightbox = new SimpleLightbox('.gallery', { captionsData: 'alt' });

let imgToFind = null;

class ImagesToFind {
    constructor(name) {
        this.name = name;
        this.pageCount = 1;
        this.totalHits = 0;
        this.hits = 0;
    }
}


async function findImages(objName) { 
    objName = this.name;
    try {
        const obj = await fetchImagesByName(objName);
        this.totalHits = obj.data.totalHits;
        this.hits += obj.data.hits.length;
        this.isFieldEmpty(this.hits, this.totalHits);
        this.isOnePageOfImages(this.totalHits);
        this.renderImages(obj.data.hits);
    } catch (err) { 
        Notify.failure(err.message);
    }
};

async function handleMoreImages() {
try {
this.pageCount += 1;
const nextPage = await fetchMoreImages(this.name, this.pageCount);

this.hits += nextPage.data.hits.length;
this.renderImages(nextPage.data.hits);
this.doSmoothScroll();
this.isEndOfImages ( ) ;
} catch (err) {
Notify. failure(err.message);
}
};

function isFielsEmpty(field, totalHits) { 
    if (field === 0) {
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    };
    Notify.success(`Hooray! We found ${totalHits} images.`);
};

function isOnePageOfImages(number) { 
    if (number > 40) {
        refs.footerEl.classList.remove('is-hidden');
    };
};

function isEndOfImages() { 
    if (this.hits >= this.totalHits) {
        refs.footerEl.classList.add('is-hidden');
        return Notify.info(`We're sorry, but you've reached the end of search results.`);
    };
};

function renderImages(images) { 
    const markup = images.map(image => {
        return `<div class="photo-card">
 <a> href="${image.largeImageURL}" <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" /> </a>
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
</div>`}).join('');
    refs.galleryEl.insertAdjacentHTML('beforeend', markup);
    lightbox.refresh();
};

function doSmoothScroll() {
    const { height: cardHeight } = document.querySelector('.gallery').firstElementChild.getBoundingClientRect();

    window.scrollBy({
        top: cardHeight * 1.7,
        behavior: 'smooth',
    });
 };

function handleImagesByName(evt) {
    evt.preventDefault();
    const name = evt.currentTarget.searchQuery.value.trim();
    if (name === '') {
        return;
    }

    refs.galleryEl.innerHTML = '';
    refs.footerEl.classList.add('is-hidden');

    imgToFind = new ImagesToFind(name);
    imgToFind.findImages();
    return imgToFind;
 };

function handleNextImages() { 
    imgToFind.handleMoreImages();
};







import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImagesByName, fetchMoreImages } from './pixabay-api';

const refs = {
    searchFormEl: document.querySelector('.search-form'),
    galleryEl: document.querySelector('.gallery'),
    loadMoreBtnEl: document.querySelector('. load-more'),
    footerEl: document.querySelector('. footer'),
};

refs.searchFormEl.addEventListener('submit', handleImagesByName);
refs.loadMoreBtnEl.addEventListener('click', handleMoreImages5);

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

async findImages(objName) { 
    objName = this.name;
    try { 
        const obj = await fetchImagesByName(objName)
    }
}

import axios from "axios";

const API_KEY = '39103894-4e68a74a158ca7438d9c6bfdf';
const URL = 'https://pixabay.com/api/';

export function fetchImagesByName(name) {
    return axios.get(URL, {
        params: {
            key: API_KEY,
            q: name,
            image_type: photo,
            orientation: horizontal,
            safesearch: true,
            page: 1,
            per_page: 40,

        },
    });
}
 

export function fetchMoreImages(name, pageCount) {
    return axios.get(URL, {
        params: {
            key: API_KEY,
            q: name,
            image_type: photo,
            orientation: horizontal,
            safesearch: true,
            page: pageCount,
            per_page: 40,
        },
    });
 }
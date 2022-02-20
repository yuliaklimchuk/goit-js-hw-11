import './sass/main.scss';
import Notiflix from 'notiflix';
import { fetchPictures } from './js/fetch-pictures';
import createGalleryTmp from './template/createGallery.hbs';

const searchForm = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery-box');

searchForm.addEventListener('submit', entryPictureName);

async function entryPictureName(event) { 
    event.preventDefault();
    galleryBox.innerHTML = '';
    const { elements: { searchQuery }} = event.currentTarget;
    try {
        const pictures = await fetchPictures(searchQuery.value);
        if (pictures.hits.length === 0) { 
            onFetchError();
            return;
        }
        const { hits } = pictures;
        galleryBox.insertAdjacentHTML('beforeend', createGalleryTmp(hits));
        searchForm.reset();
    }
    catch(error) { 
        onFetchError();
    }
}

function onFetchError() { 
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    galleryBox.innerHTML = '';
    searchForm.reset();
}

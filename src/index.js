import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchPictures } from './js/fetch-pictures';
import createGalleryTmp from './template/createGallery.hbs';

const searchForm = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery');

searchForm.addEventListener('submit', entryPictureName);

var lightbox = new SimpleLightbox('.gallery a', {});


async function entryPictureName(event) { 
    event.preventDefault();
    galleryBox.innerHTML = '';
    const { elements: { searchQuery }} = event.currentTarget;
    try {
        const pictures = await fetchPictures(searchQuery.value);
        const { hits } = pictures;
        if (hits.length === 0) { 
            onFetchError();
            return;
        }
        galleryBox.insertAdjacentHTML('beforeend', createGalleryTmp(hits));
        lightbox.refresh();
        Notiflix.Notify.success(`Hooray! We found ${pictures.totalHits} images.`);
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

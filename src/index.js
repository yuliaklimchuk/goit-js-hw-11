import './sass/main.scss';
import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewApiService from './js/fetch-pictures';
import LoadMoreBtn from './js/load-more';
import createGalleryTmp from './template/createGallery.hbs';

const searchForm = document.querySelector('#search-form');
const galleryBox = document.querySelector('.gallery');

const loadMoreBtn = new LoadMoreBtn({
    selector: '.loadMore-btn',
    hidden: true,
});

searchForm.addEventListener('submit', entryPictureName);
loadMoreBtn.refs.button.addEventListener('click', onLoadMore);

var lightbox = new SimpleLightbox('.gallery a', {});

const newApiService = new NewApiService();

async function entryPictureName(event) { 
    event.preventDefault();
    galleryBox.innerHTML = '';
    newApiService.reset();
    loadMoreBtn.show();
    loadMoreBtn.disable();
    const { elements: { searchQuery }} = event.currentTarget;
    newApiService.query = searchQuery.value;
    try {
        const pictures = await newApiService.fetchPictures();
        const { hits } = pictures;
        if (hits.length === 0) { 
            onFetchError();
            return;
        }
        galleryBox.insertAdjacentHTML('beforeend', createGalleryTmp(hits));
        lightbox.refresh();
        loadMoreBtn.enable();
        Notiflix.Notify.success(`Hooray! We found ${pictures.totalHits} images.`);
        searchForm.reset();
    }
    catch(error) { 
        onFetchError();
    }
}

async function onLoadMore() { 
    try {
        newApiService.incrementPage();
        loadMoreBtn.disable();
        const pictures = await newApiService.fetchPictures();
        galleryBox.insertAdjacentHTML('beforeend', createGalleryTmp(pictures.hits));
        lightbox.refresh();
        loadMoreBtn.enable();
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
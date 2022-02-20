const BASE_URL = 'https://pixabay.com/api/';

export async function fetchPictures(pictures) { 
    const response = await fetch(`${BASE_URL}?key=25800481-71cffbd2e779364a85bf72062&q=${pictures}&image_type=photo&orientation=horizontal&safesearch=true`);
    return await response.json();
}
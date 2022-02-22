const BASE_URL = 'https://pixabay.com/api/';

export default class NewApiService {
    constructor() { 
        this.searchQuery = '';
        this.page = 1;
    }
    async fetchPictures() { 
        const response = await fetch(`${BASE_URL}?key=25800481-71cffbd2e779364a85bf72062&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
        return await response.json();
    }
    incrementPage() { 
        this.page += 1;
    }
    get query() { 
        return this.searchQuery;
    }
    set query(newQuery) { 
        this.searchQuery = newQuery;
    }
    reset() { 
        this.page = 1;
    }
}


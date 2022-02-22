export default class LoadMoreBtn { 
    constructor({ selector, hidden = false }) { 
        this.refs = this.getRefs(selector);

        if (hidden) { this.hide() };
    }
    getRefs(selector) { 
        const refs = {};
        refs.button = document.querySelector(selector);
        refs.label = document.querySelector('.label');

        return refs;
    }
    enable() { 
        this.refs.button.disabled = false;
        this.refs.button.textContent = 'Show more';
    }
    disable() { 
        this.refs.button.disabled = true;
        this.refs.button.textContent = 'Loading...';
    }
    show() { 
        this.refs.button.classList.remove('is-hidden');
    }
    hide() { 
        this.refs.button.classList.add('is-hidden');
    }
}
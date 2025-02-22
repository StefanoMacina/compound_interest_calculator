export class BaseComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }
    
    render() {
        this.innerHTML =` 
        <section class="row g-0 mb-4 rounded-2 " style="border: 1px solid rgba(146, 155, 163, 0.50);">
            ${this.getTemplate()}
        </section>
        `;
    }

    getTemplate() {
        return '';
    }

    disconnectedCallback() {
        this.innerHTML = '';
    }
}
export default class Modal{
    constructor(modal){
        this.modal = modal;
    }
    open(content){
        const h5 = this.modal.querySelector('h5');
        const modalBody = this.modal.querySelector('.modal-body');
        const a = this.modal.querySelector('a');
        const div = document.createElement('div');
        div.classList.add('modal-backdrop', 'fade', 'show');
        document.body.classList.add('modal-open');
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
        document.body.appendChild(div);
        this.modal.classList.add('show');
        this.modal.removeAttribute('aria-hidden');
        this.modal.style.display = 'block'
        this.modal.setAttribute('role', 'dialog');
        this.modal.setAttribute('aria-modal', true);
        h5.textContent = content.title;
        modalBody.textContent = content.description;
        a.href = content.link;
    }
    getModal(){
        return this.modal;
    }
    close(){
        this.modal.classList.remove('show');
        this.modal.removeAttribute('role');
        this.modal.removeAttribute('aria-modal');
        this.modal.setAttribute('aria-hidden', true);
        this.modal.style.display = 'none';
    }
}
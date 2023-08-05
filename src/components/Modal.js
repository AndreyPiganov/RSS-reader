export default class Modal{
    constructor(modal){
        this.modal = modal;
    }
    open(el){
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
        el.classList.remove('fw-bold');
        el.classList.add('fw-normal', 'link-secondary');
    }
    close(){
        const content = this.modal.querySelector('.modal-content');
        content.addEventListener('click', (event) =>{
            if(event.target.tagName !== 'BUTTON'){
                return
            }
            this.modal.classList.remove('show');
            this.modal.removeAttribute('role');
            this.modal.removeAttribute('aria-modal');
            this.modal.setAttribute('aria-hidden', true);
            this.modal.style.display = 'none';
            document.body.classList.remove('modal-open');
            document.body.style = '';
            document.body.removeChild(document.body.lastChild)
        })
    }
}
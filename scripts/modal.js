class Modal {
	constructor(selector, {
		beforeClose, beforeOpen, onOpen, onClose,
	}) {
		this.initModalElement(selector);

		this.isOpen = false;

		this.onOpen = onOpen;
		this.onClose = onClose;
		this.beforeClose = beforeClose;
		this.beforeOpen = beforeOpen;
	}

	initModalElement(selector) {
		this.getModalElement(selector);

		if (this.modal && this.modal.hasChildNodes()) return;
		this.modal.textContent = 'Default modal text';
	}


	getModalElement(selector) {
		const modal = document.querySelector(selector);
		if(!modal) throw new Error('Didnt match any element for this selector');
		this.modal = modal;
	}

	open() {
		if(this.beforeOpen) this.beforeOpen();
		this.isOpen = true;
		this.modal.classList.add('modal-open');
		if(this.onOpen) this.onOpen();
	}

	close() {
		if(this.beforeClose) this.beforeClose();
		this.isOpen = false;
		this.modal.classList.add('modal-close');
		this.modal.classList.remove('modal-open');
		if(this.onClose) this.onClose();
	}

	destroy() {
		this.modal.remove();
	}
}
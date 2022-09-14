class Modal {
	constructor(selector, {
		beforeClose, beforeOpen, onOpen, onClose,
		isWithOverlay = false
	}) {
		this.initModalElement(selector, isWithOverlay);

		this.isOpen = false;

		this.onOpen = onOpen;
		this.onClose = onClose;
		this.beforeClose = beforeClose;
		this.beforeOpen = beforeOpen;
	}

	initModalElement(selector, isWithOverlay) {
		this.getModalElement(selector);

		if (this.modal.hasChildNodes()) return;
		this.modal.textContent = 'Default modal text';

		if(isWithOverlay) this.setOverlay();
	}


	getModalElement(selector) {
		const modal = document.querySelector(selector);
		if(!modal) throw new Error('Didnt match any element for this selector');
		this.modal = modal;
		this.modal.classList.add('pmodal')
		this.modal.classList.add('pmodal-close');
	}

	setOverlay() {
		const overlayElement = document.querySelector('.poverlay');
		if(overlayElement) return;

		const overlay = document.createElement('div');
		overlay.classList.add('poverlay');
		overlay.classList.add('poverlay-close');

		this.modal.insertAdjacentElement('afterend', overlay);
		this.overlay = overlay;
	}

	showOverlay() {
		if(!this.overlay) return;
		this.overlay.classList.add('poverlay-open');
		this.overlay.classList.remove('poverlay-close');
	}

	hideOverlay() {
		if(!this.overlay) return;
		this.overlay.classList.add('poverlay-close');
		this.overlay.classList.remove('poverlay-open');
	}

	open() {
		if(this.beforeOpen) this.beforeOpen();
		this.isOpen = true;
		this.modal.classList.add('pmodal-open');
		this.modal.classList.remove('pmodal-close');
		this.showOverlay();
		if(this.onOpen) this.onOpen();
	}

	close() {
		if(this.beforeClose) this.beforeClose();
		this.isOpen = false;
		this.modal.classList.add('pmodal-close');
		this.modal.classList.remove('pmodal-open');
		this.hideOverlay();
		if(this.onClose) this.onClose();
	}

	destroy() {
		this.modal.remove();
	}
}
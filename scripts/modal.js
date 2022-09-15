class Modal {
	constructor(selector, {
		beforeClose, beforeOpen, onOpen, onClose,
		isWithOverlay = false,
		modalClass, overlayClass,
		isCloseOnOverlay = false
	}) {
		this.initModalElement({
			selector, modalClass,
			overlayClass, isWithOverlay, isCloseOnOverlay
		});

		this.isOpen = false;

		this.onOpen = onOpen;
		this.onClose = onClose;
		this.beforeClose = beforeClose;
		this.beforeOpen = beforeOpen;
	}

	initModalElement({selector, isWithOverlay, modalClass, overlayClass, isCloseOnOverlay}) {
		this.getModalElement(selector);

		if (this.modal.hasChildNodes()) return;
		this.modal.textContent = 'Default modal text';
		if(modalClass) this.modal.classList.add(modalClass);

		if(isWithOverlay) this.setOverlay(overlayClass, isCloseOnOverlay);
	}


	getModalElement(selector) {
		const modal = document.querySelector(selector);
		if(!modal) throw new Error('Didnt match any element for this selector');
		this.modal = modal;
		this.modal.classList.add('pmodal')
		this.modal.classList.add('pmodal-close');
	}

	setOverlay(overlayClass, isCloseOnOverlay) {
		const overlayElement = document.querySelector('.poverlay');
		if(overlayElement) return;

		const overlay = document.createElement('div');
		overlay.classList.add('poverlay');
		overlay.classList.add('poverlay-close');
		if(overlayClass) overlay.classList.add(overlayClass);

		this.modal.insertAdjacentElement('afterend', overlay);
		this.overlay = overlay;

		if(isCloseOnOverlay) this.overlay.addEventListener('click', this.close.bind(this));
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
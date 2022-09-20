class Modal {
	constructor(selector, {
		beforeClose, beforeOpen, onOpen, onClose,
		isWithOverlay = false,
		modalClass, overlayClass,
		isCloseOnOverlay = false,
		closeSelectors
	}) {
		this.modalSelector = selector;

		this.initModalElement({selector, modalClass});
		this.setCloseToElements(closeSelectors);
		if(isWithOverlay) this.setOverlay(overlayClass, isCloseOnOverlay);

		this.isOpen = false;

		this.onOpen = onOpen;
		this.onClose = onClose;
		this.beforeClose = beforeClose;
		this.beforeOpen = beforeOpen;
	}

	getElement(selector) {
		const element = document.querySelector(selector);
		if(!element) throw new Error(`Didnt match any element for this selector - ${selector}`);
		return element;
	}

	initModalElement({selector, modalClass}) {
		this.getModalElement(selector);

		if (this.modal.hasChildNodes()) return;
		this.modal.textContent = 'Default modal text';
		if(modalClass) this.modal.classList.add(modalClass);
	}

	getModalElement(selector) {
		this.modal = this.getElement(selector);
		this.modal.classList.add('pmodal')
		this.modal.classList.add('pmodal-close');
	}

	setOverlay(overlayClass, isCloseOnOverlay) {
		this.overlay = document.createElement('div');
		this.overlay.classList.add('poverlay');
		this.overlay.classList.add('poverlay-close');
		if(overlayClass) this.overlay.classList.add(overlayClass);

		this.modal.insertAdjacentElement('afterend', this.overlay);

		if(isCloseOnOverlay)
			this.overlay.addEventListener('click', this.close.bind(this));
	}

	showOverlay() {
		this.overlay.classList.add('poverlay-open');
		this.overlay.classList.remove('poverlay-close');
	}

	hideOverlay() {
		this.overlay.classList.add('poverlay-close');
		this.overlay.classList.remove('poverlay-open');
	}

	setCloseToElements(selectors) {
		if(!selectors || !selectors.length) return;
		selectors.forEach(item => {
			const element = this.getElement(`${this.modalSelector} ${item}`);
			element.addEventListener('click', this.close.bind(this));
		});
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
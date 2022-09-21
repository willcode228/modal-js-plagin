class Modal {
	constructor(selector, {
		beforeClose, beforeOpen, onOpen, onClose,
		isWithOverlay = false,
		modalClass, overlayClass,
		isCloseOnOverlay = false,
		closeModalElementsSelectors
	}) {
		this.modalSelector = selector;

		this.onOpen = onOpen;
		this.onClose = onClose;
		this.beforeOpen = beforeOpen;
		this.beforeClose = beforeClose;

		this.initModal({selector, modalClass});
		this.setCloseMethodToElements(closeModalElementsSelectors);
		if(isWithOverlay) this.initOverlay(overlayClass, isCloseOnOverlay);
	}

	getElement(selector) {
		const element = document.querySelector(selector);
		if(!element) throw new Error(`Didnt match any element for this selector - ${selector}`);
		return element;
	}

	initModal({selector, modalClass}) {
		this.modal = this.getElement(selector);
		this.modal.classList.add('pmodal')

		if (this.modal.hasChildNodes()) return;
		this.modal.textContent = 'Default modal text';
		if(modalClass) this.modal.classList.add(modalClass);
	}

	toggleModal(status) {
		this.modal.classList[status ? 'add' : 'remove']('pmodal-open');
		this.toggleOverlay(status)
	}

	openModal() {
		if(this.beforeOpen) this.beforeOpen();
		this.toggleModal(true);
		if(this.onOpen) this.onOpen();
	}

	closeModal() {
		if(this.beforeClose) this.beforeClose();
		this.toggleModal(false);
		if(this.onClose) this.onClose();
	}

	initOverlay(overlayClass, isCloseOnOverlay) {
		this.overlay = document.createElement('div');
		this.overlay.classList.add('poverlay');
		if(overlayClass) this.overlay.classList.add(overlayClass);

		this.modal.insertAdjacentElement('afterend', this.overlay);

		if(!isCloseOnOverlay) return;
		this.overlay.addEventListener('click', this.closeModal.bind(this));
	}

	toggleOverlay(status) {
		this.overlay.classList[status ? 'add' : 'remove']('poverlay-open');
	}

	setCloseMethodToElements(selectors) {
		if(!selectors || !selectors.length) return;
		selectors.forEach(item => {
			const element = this.getElement(`${this.modalSelector} ${item}`);
			element.addEventListener('click', this.closeModal.bind(this));
		});
	}

	destroy() {
		this.modal.remove();
	}
}
function Modal(
	selector,
	{
		beforeClose, beforeOpen, onOpen, onClose,
		isWithOverlay = false,
		modalClass, overlayClass,
		isCloseOnOverlay = false,
		closeModalElementsSelectors
	}
) {
	this.modalSelector = selector;

	this.onOpen = onOpen;
	this.onClose = onClose;
	this.beforeOpen = beforeOpen;
	this.beforeClose = beforeClose;

	this.initModal({selector, modalClass});
	this.setCloseMethodToElements(closeModalElementsSelectors);
	if(isWithOverlay) this.initOverlay(overlayClass, isCloseOnOverlay);
}

Modal.prototype.initModal = function ({selector, modalClass}) {
	this.modal = this.getElement(selector);
	this.modal.classList.add('pmodal')

	if (this.modal.hasChildNodes()) return;
	this.modal.textContent = 'Default modal text';
	if(modalClass) this.modal.classList.add(modalClass);
}

Modal.prototype.toggleModal = function (status) {
	this.modal.classList[status ? 'add' : 'remove']('pmodal-open');
	this.toggleOverlay(status)
}

Modal.prototype.openModal = function () {
	const allPModal = document.querySelectorAll('.pmodal');
	allPModal.forEach(modal => modal.classList.remove('pmodal-open'))

	if(this.beforeOpen) this.beforeOpen();
	this.toggleModal(true);
	if(this.onOpen) this.onOpen();
}

Modal.prototype.closeModal = function () {
	if(this.beforeClose) this.beforeClose();
	this.toggleModal(false);
	if(this.onClose) this.onClose();
}

Modal.prototype.getElement = function (selector) {
	const element = document.querySelector(selector);
	if(!element) throw new Error(`Didnt match any element for this selector - ${selector}`);
	return element;
}

Modal.prototype.destroy = function() {
	this.modal.remove();
}

Modal.prototype.initOverlay = function (overlayClass, isCloseOnOverlay) {
	this.overlay = document.createElement('div');
	this.overlay.classList.add('poverlay');
	if(overlayClass) this.overlay.classList.add(overlayClass);

	this.modal.insertAdjacentElement('afterend', this.overlay);

	if(!isCloseOnOverlay) return;
	this.overlay.addEventListener('click', this.closeModal.bind(this));
}

Modal.prototype.toggleOverlay = function (status) {
	if(status) {
		const allPOverlay= document.querySelectorAll('.poverlay');
		allPOverlay.forEach(overlay => overlay.classList.remove('poverlay-open'))
	}

	this.overlay.classList[status ? 'add' : 'remove']('poverlay-open');
}

Modal.prototype.setCloseMethodToElements = function (selectors) {
	if(!selectors || !selectors.length) return;
	selectors.forEach(item => {
		const element = this.getElement(`${this.modalSelector} ${item}`);
		element.addEventListener('click', this.closeModal.bind(this));
	});
}
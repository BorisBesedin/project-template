const popup = (triggerSelector, popupSelector) => {
	const triggers = document.querySelectorAll(triggerSelector),
		  popup = document.querySelector(popupSelector),
		  close = popup.querySelector('.popup__close');

		triggers.forEach(item => {
		  	item.addEventListener('click', () => {
		  		popup.style.display = 'block';
		  		popup.classList.remove('slide-right');
		  		popup.classList.add('slide-left');

		  		document.body.style.overflow = 'hidden';
		 	});		  	
		});

		close.addEventListener('click', () => {
			  
			popup.classList.remove('slide-left');
			popup.classList.add('slide-right');

			setTimeout(() => {
			  	popup.style.display = 'none';
			}, 350);

			document.body.style.overflow = 'scroll';
			  
		});
};

export default popup;
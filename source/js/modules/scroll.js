import smoothscroll from 'smoothscroll-polyfill';

const scroll = () => {
	smoothscroll.polyfill();
	const scrollTo = function (element) {
		let coord = element.offsetTop;

		window.scrollTo({
		    top: coord,
		    behavior: "smooth"
		});
	};

	const setScroll = function (triggerSelector) {
		let triggers = document.querySelectorAll(triggerSelector),
			timeout = 400;

		triggers.forEach(item => {
			item.addEventListener('click', (e) => {
				e.preventDefault();

				if (document.body.offsetWidth >= 960) {
					timeout = 0;
				} else {
					timeout = 400;
				}

				let element = document.querySelector(`.${item.getAttribute('data-scrollid')}`);

				setTimeout(() => {
					scrollTo(element);
				}, timeout);
				
			});
		});
	};

	setScroll('.navigation__link');
	
};
export default scroll;


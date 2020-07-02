const menu = () => {
	const toggle = document.querySelector('.navigation__toggle'),
		menu = document.querySelector('.navigation'),
		menuList = document.querySelector('.navigation__list'),
		menuItems = document.querySelectorAll('.navigation__link');

	toggle.addEventListener('click', () => {
		if (document.body.offsetWidth < 960) {
			if (menu.classList.contains('navigation--opened')) {
				toggle.classList.remove('rotate-left');
				toggle.classList.add('rotate-right');

				menuList.classList.remove('slide-left');
				menuList.classList.add('fadeOut');

				setTimeout(() => {
					menu.classList.remove('navigation--opened');
					menu.classList.add('navigation--closed');					
					
				}, 350);
				
			} else if (menu.classList.contains('navigation--closed')) {
				menu.classList.remove('navigation--closed');
				menu.classList.add('navigation--opened');

				toggle.classList.remove('rotate-right');
				toggle.classList.add('rotate-left');

				menuList.classList.remove('fadeOut');
				menuList.classList.add('slide-left');
			}
		}
		
	});

	menuItems.forEach(item => {
		item.addEventListener('click', () => {
			toggle.click();
		});
	});
};

export default menu;
import menu from './modules/menu';
import slider from './modules/slider';
import popup from './modules/popup';
import scroll from './modules/scroll';
import checkTextInputs from './modules/checkTextInputs';
import mask from './modules/mask';
import form from './modules/form';

window.addEventListener('DOMContentLoaded', () => {
	menu();
	slider();
	popup('.order-button', '.feedback');
	popup('.services__more', '.info-popup');
	mask('[name="phone"]');
	checkTextInputs('[name="name"]');
	scroll();
	form();
});







	











	




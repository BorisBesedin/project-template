const slider = () => {
    const setSlider = function(slides, slider, prev, next) {
        const sliderBlock = document.querySelector(slider),
            slideList = document.querySelectorAll(slides),
            infoButtons = document.querySelectorAll('.services__more');
        let slideIndex = 0;

        function showSlide(n) {
            slideList.forEach((item, i) => {
                item.classList.add('slider__slide--hide');
                item.classList.add('fadeIn');
            });
            slideList[n].classList.remove('slider__slide--hide');
            slideList[n].classList.add('slider__slide--show');
        }

        function nextSlide(n) {
            slideIndex+=n;        
            if (slideIndex > slideList.length - 1) {
                slideIndex = 0;
            }
    
            if (slideIndex < 0) {
                slideIndex = slideList.length - 1;
            }
            showSlide(slideIndex);
        }

        showSlide(slideIndex);

        infoButtons.forEach((button, i) => {
            button.addEventListener('click', () => {
                slideIndex = i;
                showSlide(slideIndex);
            });
        });

        try {
            const prevBtn = document.querySelector(prev),
                nextBtn = document.querySelector(next);

            prevBtn.addEventListener('click', () => {
                nextSlide(-1);
            });
            nextBtn.addEventListener('click', () => {
                nextSlide(1);
            });

            sliderBlock.addEventListener('touchstart', (e) => {
                if (e.targetTouches[0].screenX < sliderBlock.offsetWidth * 0.3) {
                    nextSlide(-1);
                }

                if (e.targetTouches[0].screenX > sliderBlock.offsetWidth * 0.9) {
                    nextSlide(1);
                }
            });
        } catch(e) {}
    };

    setSlider('.price__slide', '.price__slides', '.price__prev', '.price__next');

    setSlider('.info-popup__slide', '.info-popup__slides', '.info-popup__prev', '.info-popup__next');
};

export default slider;
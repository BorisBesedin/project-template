const checkTextInputs = (selector) => {
    const inputs = document.querySelectorAll(selector);

    inputs.forEach(item => {
        item.addEventListener('keypress', function(e) {
            if (e.key.match(/[^а-яё 0-9]/ig)) {
                e.preventDefault();                
            }
        });

        item.addEventListener('change', () => { 
            if (item.value.match(/[^а-яё 0-9]/ig)) {
                item.value = '';                              
            }
        });
    });

};

export default checkTextInputs;
const form = () => {
    const form = document.querySelector('.form'),
        inputs = form.querySelectorAll('input'),
        submit = form.querySelector('.form__submit'),
        textarea = form.querySelector('textarea');   

    const message = {
        success: 'Готово, жди звонка!',
        failure: 'Упс! Не сработало.',
        loading: 'Загрузка'
    };

    const path = 'server.php';

    const clearInputs = () => {
        inputs.forEach(item => {
            item.value = '';
        });

        textarea.value = '';
    };

    const postData = async (url, data) => {
        let responce = await fetch(url, {
            method: "POST",
            body: data
        });

        return await responce.text();
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        let statusMessage = document.createElement('div'),
            statusText = document.createElement('div');

        statusMessage.appendChild(statusText);
        statusMessage.style = 'position: absolute; display: flex; flex-direction: column; justify-content: center; top: 50%; left: 50%; transform: translate(-50%, -50%); align-items: center; text-align: center;';

        statusMessage.classList.add('status');
        form.parentNode.appendChild(statusMessage);
        form.style.visibility = 'hidden';
        form.classList.remove('fadeIn');

        statusText.textContent = message.loading;     

        let data = new FormData(form);

        postData(path, data)
            .then(responce => {
                statusText.textContent = message.success;
                statusMessage.classList.add('fadeIn');                    
            })
            .catch(() => {
                statusText.textContent = message.failure;
                statusMessage.classList.add('fadeIn'); 
            })
            .finally(() => {
                clearInputs();
                setTimeout(() => {
                    statusMessage.remove();
                    form.classList.add('fadeIn');
                    form.style.visibility = 'visible';  
                }, 5000);
            });
    });
};

export default form;
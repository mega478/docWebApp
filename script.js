


function upload(selector){
    const input = document.querySelector(selector);
    const preview = document.createElement('div');
    preview.classList.add('preview');

    input.setAttribute('multiple', true);
    // input.setAttribute('accept', ".jpg, .png");
    const open = document.createElement('button');
    open.classList.add('btn');

    open.textContent = ('Открыть');
    open.addEventListener('click', ()=> input.click());

 input.after(open);
 open.after(preview)
    const changeHandler = (e) => {
            console.log(e.target.files);
            const files = Array.from(e.target.files);
            preview.textContent="";
            files.forEach(
                file=>{
                    if(!file.type.match("image")){
                        return;
                    }
                    // Превью картинки
                    const reader = new FileReader();
                    reader.onload = ev => {  // запустить, только после того как FileReader считает файл.
                        const src = ev.target.result;  // получаем закодированное изображение
                        preview.insertAdjacentHTML('afterbegin', `<div class="preview-image"><img src="${src}" alt="${file.name}" /></div>`);
                    }
                    reader.readAsDataURL(file);  // метод readAsDataURL() является ассинхронным

                }
            )
        }
    ;
 input.addEventListener('change', changeHandler);


}

upload('#file');


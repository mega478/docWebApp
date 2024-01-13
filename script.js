


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
 open.after(preview);
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
                        /*Переделать под элементы не HTML*/preview.insertAdjacentHTML('afterbegin', `<div class="preview-image">
<div class="preview-remove">&times;</div>
<img src="${src}" alt="${file.name}" />
<div class="preview-info"> 
<span>${file.name}</span>
<span>${getSizeEd(file.size)}</span> 

</div>
</div>`);

                       //remove file
                        preview.querySelectorAll('.preview-remove').forEach(q => {
                            q.addEventListener("click", () => {
                                q.parentNode.remove();
                            })
                        })
                    }
                    reader.readAsDataURL(file);  // метод readAsDataURL() является ассинхронным

                }
            )
        }
    ;
 input.addEventListener('change', changeHandler);


}

upload('#file');

function getSizeEd(size){
    const arr = ["B", "KB", "MB", "GB"];
    if(!size){return "0 "+arr[0];}
    const i = parseInt(Math.floor(Math.log(size)/Math.log(1024)));
    //return (Math.round((size/Math.pow(1024, i))*100))/100+" "+arr[i];
    return Math.round(size/Math.pow(1024, i),2)+" "+arr[i];
}

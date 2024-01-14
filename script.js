
function getSizeEd(size){
    const arr = ["B", "KB", "MB", "GB"];
    if(!size){return "0 "+arr[0];}
    const i = parseInt(Math.floor(Math.log(size)/Math.log(1024)));
    //return (Math.round((size/Math.pow(1024, i))*100))/100+" "+arr[i];
    return Math.round(size/Math.pow(1024, i),2)+" "+arr[i];
}

// function button creator
const element = (tag, classes=[], content )=>{
    const node = document.createElement(tag);
    if(classes.length){
        node.classList.add(...classes);
    }
    if(content){
        node.textContent=content;
    }
    return node;
}

function upload(selector){
    let files =[];
    const input = document.querySelector(selector);
    input.setAttribute('multiple', true);
    // input.setAttribute('accept', ".jpg, .png");

    const preview = element('div', ['preview']);
    const open = element('button', ["btn"], 'Открыть');
    const upload = element('button', ['btn', 'primary'], 'Загрузить');
    upload.classList.add('hiddenElement');
    console.log(input.files);
    //open.addEventListener('click', ()=> input.click());

    input.insertAdjacentElement('afterend', preview);
    input.insertAdjacentElement('afterend', upload);
    input.insertAdjacentElement('afterend', open);
    const trigerInput = ()=> input.click();
    const changeHandler = (e) => {
            console.log(e.target.files);
            files = Array.from(e.target.files);
            preview.textContent="";
            upload.classList.remove('hiddenElement');
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
<div class="preview-remove" data-name="${file.name}">&times;</div>
<img src="${src}" alt="${file.name}" />
<div class="preview-info"> 
<span class="fileName">${file.name}</span>
<span>${getSizeEd(file.size)}</span> 

</div>
</div>`);

                       //мой remove file
                       //  preview.querySelectorAll('.preview-remove').forEach(q => {
                       //      q.addEventListener("click", () => {
                       //          const parantName = q.dataset.name;
                       //          q.classList.add("removing");
                       //           setTimeout(()=>q.parentNode.remove(), 300);
                       //           if(!files.length){
                        //             upload.classList.add('hiddenElement');
                        //         }
                       //          var dt = new DataTransfer();
                       //          for( f of input.files){
                       //              if( parantName != f.name )
                       //              dt.items.add(f);
                       //          }
                       //          input.files = dt.files;
                       //      })
                       //  })



                    }
                    reader.readAsDataURL(file);  // метод readAsDataURL() является ассинхронным

                }
            );
        }
    ;

    // remove file
    const removeHandler = (e) => {
        if(!e.target.dataset.name){
            return
        }
        const {name} = e.target.dataset;
        files = files.filter(file=>file.name !== name);
        const block = preview.querySelector(`[data-name="${name}"]`).closest(".preview-image");
        block.classList.add("removing");
        setTimeout(()=>block.remove(), 300);
        if(!files.length){
            upload.classList.add('hiddenElement');
        }


    }

    const uploadHandler = () => {

    }


    open.addEventListener('click', trigerInput);
    input.addEventListener('change', changeHandler);
    preview.addEventListener('click', removeHandler );
    upload.addEventListener('click', uploadHandler);
}

upload('#file');



const blogTitleField = document.querySelector('.title');
const articleFeild = document.querySelector('.article');

// banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector(".banner");
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

bannerImage.addEventListener('change', () => {
    console.log(" Calling uploadimage banner....")
    uploadImage(bannerImage, "banner");
})

uploadInput.addEventListener('change', () => {
    console.log(" uploadInput event listener");
    uploadImage(uploadInput, "image");
})

const uploadImage = (uploadFile, uploadType) => {
    console.log(" upload file: ",uploadFile);
    console.log(" Filetype: ",uploadType);
    const [file] = uploadFile.files;
    if(file && file.type.includes("image")){
        const formdata = new FormData();
        formdata.append('image', file);
        console.log(" file appended...")

        fetch('/upload', {
            method: 'post',
            body: formdata
        }).then(res => res.json())
        .then(data => {
            if(uploadType == "image"){
                console.log(" File name: ",file.name)
                console.log(" Data: ",data);
                addImage(data, file.name);
            } else{
                bannerPath = `${location.origin}/${data}`;
                banner.style.backgroundImage = `url("${bannerPath}")`;
            }
        })
    } else{
        alert("upload Image only");
    }
}

const addImage = (imagepath, alt) => {
    console.log(" Adding images")
    let curPos = articleFeild.selectionStart;
    let textToInsert = `\r![${alt}](${imagepath})\r`;
    articleFeild.value = articleFeild.value.slice(0, curPos) + textToInsert + articleFeild.value.slice(curPos);
}


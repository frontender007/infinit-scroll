const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

const API_KEY = 'uZk8yKbSKqkR3BSFJ3XyV9JEig4poOfPS5i-Y0S_fjM';
let count = 5;
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;


function renderImagesOnThePage(arr) {
    arr.forEach(photo => {
        const div = document.createElement('div');
        // const title = document.createElement('h3');
        // title.textContent(photo.alt_attribute);
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        // div.appendChild(title);
        div.appendChild(img);
        imageContainer.appendChild(div);
    });
}

async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        loader.hidden = true;
        renderImagesOnThePage(data);
    } catch (error) {
        console.log(error);
    }
}

getPhotos();
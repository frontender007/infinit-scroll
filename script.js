const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const btnScroll = document.getElementById('btn-scroll');


let count = 5;
let totalImages = 0;
let imagesLoaded = 0;
let readyToLoadMorePhotos = false;

const API_KEY = 'uZk8yKbSKqkR3BSFJ3XyV9JEig4poOfPS5i-Y0S_fjM';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;



// helper function to set attributes to the dom elements

function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

function imageLoaded() {
    imagesLoaded++;
    if (imagesLoaded === 5) {
        readyToLoadMorePhotos = true;
    }
}

function displayPhotos(arr) {
        imagesLoaded = 0;
    arr.forEach(photo => {
        const div = document.createElement('div');
        const img = document.createElement('img');
        const h2 = document.createElement('h2');
        h2.textContent = photo.alt_description ? photo.alt_description : "No title available";
        setAttributes(div, {
            class: 'item'
        });

        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description
        });
        
        img.addEventListener('load', imageLoaded);
        div.appendChild(h2);
        div.appendChild(img);
        imageContainer.appendChild(div);
    });
}

async function getPhotos() {
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        loader.hidden = true;
        totalImages = data.length;
        displayPhotos(data);
    } catch (error) {
        console.log(error);
    }

}

window.addEventListener('scroll', function() {

    if (window.innerHeight + window.scrollY >= this.document.body.offsetHeight - 1000 && readyToLoadMorePhotos) {
        getPhotos();
        readyToLoadMorePhotos = false;
    }

    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        btnScroll.style.display = 'block';

        btnScroll.addEventListener('click', () => {
            window.scroll({
                top: 0,
                behavior: 'smooth'
            })
        });
    } else {
        btnScroll.style.display = 'none';
    }
});




getPhotos();
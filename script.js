const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const mybutton = document.getElementById("myBtn");


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let searchQuery = "";



let count = 5;
const apiKey = 'CeisiBaU6M3o5ennYLONoFjMKdydll7AYClGFtfmjpg';


function searchImages(){
    searchQuery = document.getElementById("query").value;    
    imageContainer.innerHTML= '';
    getPhotos();
}

imageLoaded = () => {    
    imagesLoaded++;
    if (imagesLoaded ===totalImages){
        ready = true;
        loader.hidden = true; 
        count = 30;             
    }
}

setAttributes = (element, attributes) =>{
    for( const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}

// Photo Load
function displayPhotos() {
    imagesLoaded = 0;
    totalImages = photosArray.length;   
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
       setAttributes(item, {
           href : photo.links.html,
           target: '_blank',
       })
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title:photo.alt_description,
        })
        img.addEventListener('load', imageLoaded())
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}



// API call
async function getPhotos(){
    try{
        let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&query=${searchQuery}&count=${count}`;
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();        
    } catch (error){        
        alert('Sorry, The Server is down. Please try again after sometime');

    }
}

window.addEventListener('scroll', () => {
    if( window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();        
    }
});

window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

getPhotos();
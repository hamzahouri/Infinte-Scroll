const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// unsplash API
const count = 30;
const apiKey = 'Rf0b37H9Dx2PoAaYdmGTaVCTq0ygT9gx_U0Vl75R-X0';
const apiUrl =  `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// check if all images were loaded 
function imageLoaded () {
    imagesLoaded++;
    console.log(imagesLoaded);
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        console.log("ready =", ready);
    }

}


// Helper function to set Attributes on the DOM Elements
function setAttributes (element, Attributes) {
    for (const key in Attributes) {
        element.setAttribute(key,Attributes[key]);

    }
} 



//Create Element for Links & photos add to DOM
function displayPhotos () {
    imagesLoaded=0;
    totalImages=photosArray.length;
    console.log("total images", totalImages);
    // run function for each object in the photo array
    photosArray.forEach((photo) => {
        // create <a> to link to unsplash
        const item = document.createElement('a');
        //item.setAttribute('href',photo.links.html);
        //item.setAttribute('target','_blank');
        setAttributes(item,{
            href : photo.links.html,
            target : '_blank',
        });
        // create <img> for photo
        const img = document.createElement('img');
        //img.setAttribute('src',photo.urls.regular);
        //img.setAttribute('alt',photo.alt_description);
        //img.setAttribute('title',photo.alt_description);
        setAttributes(img,{
            src : photo.urls.regular,
            alt : photo.alt_description,
            title : photo.alt_description,

        });

        // Event listner, check when each is finisched loading
        img.addEventListener('load', imageLoaded);
        // put <img> inside <a>, then put both inside image Container Element
        item.appendChild(img);
        imageContainer.appendChild(item); 

    });

}

// Get photos from unsplash
async function getPhotos () {
    try {

        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos() 
        console.log(photosArray);       
    } catch (error) {
        
    }
}

// check to see if scrolling near bottom of the page, and then load more photo
window.addEventListener('scroll', () => {
if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
    getPhotos();
    console.log("scrolled more");
}
});

// on load
getPhotos();
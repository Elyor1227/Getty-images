// // Selectors

// // GET https://api.pexels.com/v1/curated?page=2&per_page=40

// const auth = "sPkdcrgCxpWqZmtfRRQFQjvXtGuZBN3DUeF8J788vrP1TrCeXf8uEQvJ";
// const gallery  = document.querySelector(".gallery");
// const searchInput = document.querySelector(".search-input");
// const form = document.querySelector(".search-form");
// let fetchLinks;
// let searchValue;
// let page = 1;
// const more = document.querySelector(".more");
// let currentSearch;

// // Event Listener
// searchInput.addEventListener("input", updateInput);
// form.addEventListener("submit", (e)=>{
//     e.preventDefault();
//     currentSearch = searchValue;
//     searchPhotos(searchValue);
// });
// more.addEventListener("click", loadMore)
// // Updateinput
// function updateInput(e){
//     searchValue = e.target.value;
// }
// // Fetch API

// async function fetchApi(url) {
//     const dataFetch = await fetch(url, {
//         method: "GET",
//         headers:{
//             Accept: "Application/json",
//             Authorization : auth,
//         },
//     });
//     const data = await dataFetch.json();
//     return data;
// }

// // Generate photos  

// function generatePictures(data){
//     data.photos.forEach(photo => {
//         const galleryImg = document.createElement("div");
//         galleryImg.classList.add("gallery-img");
//         galleryImg.innerHTML = `
//         <div class="gallery-info">
//          <p>${photo.photographer}</p>
//          <a href="${photo.src.large}" target="blank">Download</a>
//         </div>
//         <img src = "${photo.src.large}">
//         `;
//         gallery.appendChild(galleryImg);
//     });
// }

// // Created photos 

// async function curatedPhotos() {
//     fetchLinks = "https://api.pexels.com/v1/curated?page=1&per_page=15";
//     const data = await fetchApi(fetchLinks);
//     generatePictures(data);
// }
// curatedPhotos();

// // Clear
// function clear(){
//     gallery.innerHTML = "";
//     searchInput.innerHTML = "";
// }

// // Search Photos
// async function searchPhotos(query){
//     clear();
//     fetchLinks = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page1`;
//     const data = await fetchApi(fetchLinks);
//     generatePictures(data);
// }

// // LoadMore
// async function loadMore() {
//     page++;
//     if(currentSearch){
//         fetchLinks = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`
//     }
//     else{
//         fetchLinks = `https://api.pexels.com/v1/curated?page=${page}&per_page=20`
//     }
//     const data = await fetchApi(fetchLinks);
//     generatePictures(data);
// }




const auth = "sPkdcrgCxpWqZmtfRRQFQjvXtGuZBN3DUeF8J788vrP1TrCeXf8uEQvJ";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
let fetchLinks;
let searchValue;
let page = 1;
const more = document.querySelector(".more");
let currentSearch;

// Event Listeners
searchInput.addEventListener("input", updateInput);
form.addEventListener("submit", (e) => {
    e.preventDefault();
    currentSearch = searchValue;
    searchPhotos(searchValue);
});
more.addEventListener("click", loadMore);

function updateInput(e) {
    searchValue = e.target.value;
}

async function fetchApi(url) {
    try {
        const dataFetch = await fetch(url, {
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: auth,
            },
        });

        if (!dataFetch.ok) {
            throw new Error(`HTTP Error: ${dataFetch.status}`);
        }

        const data = await dataFetch.json();
        return data;
    } catch (error) {
        console.error("API fetch error:", error.message);
        return null;
    }
}

function generatePictures(data) {
    data.photos.forEach((photo) => {
        const galleryImg = document.createElement("div");
        galleryImg.classList.add("gallery-img");
        galleryImg.innerHTML = `
        <div class="gallery-info">
         <p>${photo.photographer}</p>
         <a href="${photo.src.large}" target="blank">Download</a>
        </div>
        <img src="${photo.src.large}">
        `;
        gallery.appendChild(galleryImg);
    });
}

async function curatedPhotos() {
    fetchLinks = "https://api.pexels.com/v1/curated?page=1&per_page=15";
    const data = await fetchApi(fetchLinks);
    if (data) generatePictures(data);
}
curatedPhotos();

function clear() {
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function searchPhotos(query) {
    clear();
    fetchLinks = `https://api.pexels.com/v1/search?query=${query}&per_page=15&page=1`;
    const data = await fetchApi(fetchLinks);
    if (data) generatePictures(data);
}

async function loadMore() {
    page++;
    if (currentSearch) {
        fetchLinks = `https://api.pexels.com/v1/search?query=${currentSearch}&per_page=15&page=${page}`;
    } else {
        fetchLinks = `https://api.pexels.com/v1/curated?page=${page}&per_page=20`;
    }
    const data = await fetchApi(fetchLinks);
    if (data) generatePictures(data);
}

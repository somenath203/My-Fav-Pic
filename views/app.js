const api_key = PEXEL_API_KEY;


const gallery = document.querySelector('.gallery');
const searchInput = document.querySelector('.search-input');
const form = document.querySelector('.search-form');
const submitBtn = document.querySelector('.submit-btn');
const more = document.querySelector('.more');

// hiding the 'more' button initially
more.style.display = 'none';


let searchValue;

let pageNo = 1;

let fetchLink;

let searchedWord;


// taking input from the user
const getUserInput = (e) => {

    searchValue = e.target.value;

};


searchInput.addEventListener('input', getUserInput);


// creating a custom function to fetch data
const fetchApi = async (url, api_key) => {

    const dataFetch = await fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: api_key
        }
    });

    const data = await dataFetch.json();

    return data;

};

// creating a custom function to generate html for the fetched pictures to be displayed to the user
const generatePictures = (datas) => {

    datas.photos.map((photo) => {

        const galleryImg = document.createElement('div');

        galleryImg.classList.add('gallery-img');

        galleryImg.innerHTML =
            `
            <div class="gallery-info">
                <p>Photographer: ${photo.photographer}</p>
                <a href=${photo.src.original}>View</a>
            </div>
            <img src=${photo.src.large}></img>
        `;

        gallery.appendChild(galleryImg);

        more.style.display = 'block';


    });

};


// clear old pictures on new search
const clearOldPics = () => {

    gallery.innerHTML = '';

    searchInput.value = '';

};

// searching for photos
const searchPhotos = async (search) => {

    clearOldPics();

    searchedWord = search;

    fetchLink = `https://api.pexels.com/v1/search?query=${searchedWord}&per_page=15&page=${pageNo}`;

    const datas = await fetchApi(fetchLink, api_key);

    submitBtn.textContent = 'Search';

    generatePictures(datas);


};

// load more photos on clicking 'more' button
more.addEventListener('click', async () => {

    more.textContent = 'loading...'

    pageNo++;

    fetchLink = `https://api.pexels.com/v1/search?query=${searchedWord}&per_page=15&page=${pageNo}`;

    const datas = await fetchApi(fetchLink, api_key);

    more.textContent = 'Load More';

    generatePictures(datas);

});


form.addEventListener('submit', (e) => {

    e.preventDefault();

    if (!searchValue) {
        return Toastify({
            text: "please enter something in the input field",
            duration: 2500,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top",
            position: "center",
            stopOnFocus: true,
            style: {
                background: "linear-gradient(to right, #e55967, #e3555f, #e25058, #df4c50, #dd4848)",
                fontSize: '1.2rem',
                fontFamily: 'Lato'
            },
            onClick: function () { }
        }).showToast();
    }


    submitBtn.textContent = 'loading...'

    searchPhotos(searchValue);

});














const accessKey = "ZoxenVM5z_yFjXvA0xE7ZnBhKvnKmMddhejPrub6GV8";
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

let keyword = "";
let page = 1;

async function searchImages() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('La petición a la API falló');
        }
        const data = await response.json();

        if (page === 1) {
            searchResult.innerHTML = '';
        }

        const results = data.results;
        results.forEach((result) => {
            const image = document.createElement('img');
            image.src = result.urls.small;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';

            imageLink.appendChild(image);
            searchResult.appendChild(imageLink);
        });

        if (results.length > 0) {
            showMoreBtn.style.display = 'block';
        } else {
            showMoreBtn.style.display = 'none';
            if (page === 1) {
                searchResult.innerHTML = "No se encontraron imágenes.";
            }
        }
    } catch (error) {
        console.error("Error al buscar imágenes:", error);
        searchResult.innerHTML = "Ocurrió un error al buscar imágenes.";
    }
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
});

showMoreBtn.addEventListener("click", () => {
    page++;
    searchImages();
});
const API_KEY = "qmgrqILqxhZlADIoqpqJhYXBZiG3cdRdbwRkVqqCLsyg1KKZSmVhAiUD";

const gallery = document.getElemntById("gallery");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const loadMoreBtn = document.getElementById("loadMore");
const viewer = document.getElementById("viewer");
const viewerImg = document.getElementById("viewerImg");
const closeViewer = document.getElementById("closeViewer");

let currentPage = 1;
let currentQuery = "nature"; 

async function loadPhotos(query, page) {
    try {
        const response = await fetch(
            `https://api.pexels.com/v1/search?query=${query}&per_page=36&page=${page}`,
            {
                headers: {
                    Authorization: API_KEY
                }
            }
        );

        const data = await response.json();

        data.photos.forEach(photo => {
            const card = document.createElement("div");
            card.classList.add("card");

            const img = document.createElement("img");
            img.src = photo.src.large;
            img.alt = photo.alt || "Nature Photo";
            img.loading = "lazy";

            img.addEventListener("click", () => {
                

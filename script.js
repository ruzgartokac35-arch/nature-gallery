const API_KEY = "qmgrqILqxhZlADIoqpqJhYXBZiG3cdRdbwRkVqqCLsyg1KKZSmVhAiUD";

const gallery = document.getElementById("gallery");
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
                viewerImg.src = photo.src.original;
                viewer.style.display = "flex";
            });

            const p = document.createElement("p");
            p.textContent = `📷 ${photo.photographer}`;

            card.appendChild(img);
            card.appendChild(p);
            gallery.appendChild(card);
        });
    } catch (error) {
        console.error("Fotoğraflar yüklenirken hata oluştu:", error);
    }
}

// 1. İlk Yükleme
currentPage = Math.floor(Math.random() * 50) + 1; 
loadPhotos(currentQuery, currentPage);

// 2. Arama Fonksiyonu
searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query === "") return; 
    
    currentQuery = query;
    currentPage = 1; 
    gallery.innerHTML = ""; 
    loadPhotos(currentQuery, currentPage);
});

// Enter tuşu ile arama
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});

// 3. Daha Fazla Yükle Butonu
loadMoreBtn.addEventListener("click", () => {
    currentPage++; 
    loadPhotos(currentQuery, currentPage); 
});

// 4. Görüntüleyiciyi (Viewer) Kapatma
closeViewer.addEventListener("click", () => {
    viewer.style.display = "none";
});

viewer.addEventListener("click", (e) => {
    if (e.target === viewer) {
        viewer.style.display = "none";
    }
});

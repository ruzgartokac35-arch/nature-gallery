const API_KEY = "qmgrqILqxhZlADIoqpqJhYXBZiG3cdRdbwRkVqqCLsyg1KKZSmVhAiUD";

const gallery = document.getElementById("gallery");

async function loadPhotos() {
    gallery.innerHTML = "";

    const page = Math.floor(Math.random() * 1000) + 1;

    const response = await fetch(
        `https://api.pexels.com/v1/search?query=nature&per_page=36&page=${page}`,
        {
            headers: {
                Authorization: API_KEY
            }
        }
    );

    const data = await response.json();

    data.photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.src.large;
        img.alt = photo.alt;
        img.loading = "lazy";
        gallery.appendChild(img);
    });
}

loadPhotos();

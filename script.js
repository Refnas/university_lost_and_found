 let items = JSON.parse(localStorage.getItem("items")) || [];

async function addItem() {

    const itemName = document.getElementById("itemName").value;
    const itemDescription = document.getElementById("itemDescription").value;
    const itemLocation = document.getElementById("itemLocation").value;
    const itemType = document.getElementById("itemType").value;
    const imageInput = document.getElementById("itemImage");

    if (itemName === "" || itemDescription === "" || itemLocation === "") {
        alert("Please fill all fields");
        return;
    }

    let imageURL = "https://via.placeholder.com/400x250";

    if (imageInput.files[0]) {
        imageURL = await toBase64(imageInput.files[0]);
    }

    const item = {
        id: crypto.randomUUID(),
        name: itemName,
        description: itemDescription,
        location: itemLocation,
        type: itemType,
        image: imageURL
    };

    items.push(item);

    localStorage.setItem("items", JSON.stringify(items));

    displayItems(items);

    document.getElementById("itemName").value = "";
    document.getElementById("itemDescription").value = "";
    document.getElementById("itemLocation").value = "";
    document.getElementById("itemImage").value = "";
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => resolve(reader.result);

        reader.onerror = error => reject(error);
    });
}

document.addEventListener("DOMContentLoaded", () => {

    const storedItems = JSON.parse(localStorage.getItem("items")) || [];

    items = storedItems;

    displayItems(items);
});

function showFileName(input) {
    document.getElementById("fileName").innerText =
        input.files.length ? input.files[0].name : "";
}


function displayItems(data) {

    const container = document.getElementById("itemsContainer");

    container.innerHTML = ""; // clear UI first

    if (!data || data.length === 0) {
        container.innerHTML = "<p class='text-center'>No items found</p>";
        return;
    }

    data.forEach(item => {
        container.innerHTML += `
            <div class="item-card">

                <button class="btn btn-sm btn-danger delete-btn"
                    onclick="deleteItem('${item.id}')">
                    <i class="bi bi-trash"></i>
                </button>


                <img src="${item.image}">

                <div class="${item.type.toLowerCase()}"><h5>${item.type}</h5></div>
                <p>Item : ${item.name}</p>
                <p>Description : ${item.description}</p>
                <p>Location : ${item.location}</p>

                <a href="tel:+971XXXXXXXXX" class="btn btn-primary">
                    📞 Call 
                </a>


            </div>
        `;
    });
}


function searchItems() {

    const search = document.getElementById("searchInput").value.toLowerCase();

    const filtered = items.filter(item =>
        item.name.toLowerCase().includes(search)
    );

    const container = document.getElementById("searchResults");

    container.innerHTML = "";

    filtered.forEach(item => {

        container.innerHTML += `
            <div class="item-card">

                <img src="${item.image}">
                <div class="${item.type.toLowerCase()}"><h5>${item.type}</h5></div>
                <p>Item : ${item.name}</p>
                <p>Description : ${item.description}</p>
                <p>Location : ${item.location}</p>

                <a href="tel:+971XXXXXXXXX" class="btn btn-primary">
                    📞 Call 
                </a>

            </div>
        `;
    });
}


function deleteItem(id) {

    let storedItems = JSON.parse(localStorage.getItem("items")) || [];

    storedItems = storedItems.filter(item => item.id !== id);

    localStorage.setItem("items", JSON.stringify(storedItems));

    items = storedItems;

    displayItems(items);
}

document.addEventListener("DOMContentLoaded", () => {
    items = JSON.parse(localStorage.getItem("items")) || [];
    displayItems(items);
});

// BUSINESS LOGIC
// FavouritePlaces constructor 
function FavouritePlaces() {
    this.visitedplaces = {};
    this.currentId = 0;
}

// Generates a new unique ID each time a place is added
FavouritePlaces.prototype.assignId = function() {
    this.currentId++;
    return this.currentId;
};

// Adds a visitedPlace object into visitedplaces using its ID as the key
FavouritePlaces.prototype.addVisitedPlaces = function(visitedplace) {
    visitedplace.id = this.assignId();
    this.visitedplaces[visitedplace.id] = visitedplace;
};

// Deletes a place by its ID
FavouritePlaces.prototype.deleteVisitedPlace = function(id) {
    if (this.visitedplaces[id]) {
        delete this.visitedplaces[id];
        return true;
    }
    return false;
};

// visitedPlace constructor 
function visitedPlace(location, landmark, timeOfTheYear, notes, imageUrl) {
    this.location      = location;
    this.landmark      = landmark;
    this.timeOfTheYear = timeOfTheYear;
    this.notes         = notes;
    this.imageUrl      = imageUrl;
}


// SETUP


const favouritePlaces = new FavouritePlaces();

// Track which place is currently highlighted in the list
let activeId = null;


// LOCALSTORAGE 

function saveToStorage() {
    localStorage.setItem("favouritePlaces", JSON.stringify(favouritePlaces));
}

function loadFromStorage() {
    const saved = localStorage.getItem("favouritePlaces");
    if (!saved) return false;

    const data = JSON.parse(saved);
    favouritePlaces.currentId = data.currentId;

    for (let id in data.visitedplaces) {
        const p = data.visitedplaces[id];
        const restored = new visitedPlace(
            p.location,
            p.landmark,
            p.timeOfTheYear,
            p.notes,
            p.imageUrl
        );
        restored.id = p.id;
        favouritePlaces.visitedplaces[id] = restored;
    }
    return true;
}


// DEFAULT PLACES 

function seedDefaultPlaces() {
    const defaults = [
        new visitedPlace(
            "Nairobi",
            "Horse Riding",
            "1st June 2024",
            " Horse riding around the park — peaceful and scenic.",
            "https://images.unsplash.com/photo-1741991110666-88115e724741?w=600&auto=format&fit=crop&q=60"
        ),
        new visitedPlace(
            "Mombasa",
            "Diani Beach",
            "15th July 2025",
            "Swimming and surfing — crystal clear waters all day.",
            "https://images.unsplash.com/photo-1614270261057-3b9131d2d31d?w=1000&auto=format&fit=crop&q=60"
        ),
        new visitedPlace(
            "Naivasha",
            "Hell's Gate National Park",
            "12th Dec 2025",
            "Family time, amazing cuisines and cycling through the gorge.",
            "https://plus.unsplash.com/premium_photo-1695297515191-5870e86dcbe0?w=1000&auto=format&fit=crop&q=60"
        ),
        new visitedPlace(
            "Maasai Mara",
            "Mara River Crossing",
            "August 2024",
            "Witnessed the Great Wildebeest Migration — a once-in-a-lifetime sight.",
            "https://images.unsplash.com/photo-1547970810-dc1eac37d174?w=1000&auto=format&fit=crop&q=60"
        ),
        new visitedPlace(
            "Amboseli National Park",
            "Observation Hill",
            "March 2024",
            "Hundreds of elephants with Mount Kilimanjaro in the background.",
            "https://images.unsplash.com/photo-1585468274952-66591eb14165?w=1000&auto=format&fit=crop&q=60"
        )
    ];

    defaults.forEach(place => favouritePlaces.addVisitedPlaces(place));
    saveToStorage();
}


// UI FUNCTIONS


const listEl = document.getElementById("list-of-places");

// Rebuilds the entire <ol> list from favouritePlaces.visitedplaces
function renderFavouritePlaces() {
    listEl.innerHTML = "";

    const emptyMsg  = document.getElementById("empty-msg");
    const total     = Object.keys(favouritePlaces.visitedplaces).length;

    // Show/hide the "no places yet" message
    if (total === 0) {
        emptyMsg.classList.remove("hidden");
    } else {
        emptyMsg.classList.add("hidden");
    }

    // Build one <li> for each place
    Object.values(favouritePlaces.visitedplaces).forEach(place => {
        const li = document.createElement("li");

        // Highlight the active place
        if (place.id == activeId) {
            li.classList.add("active");
        }

        // Place name text
        const nameSpan = document.createElement("span");
        nameSpan.className   = "place-name";
        nameSpan.textContent = place.location;

        // Remove button 
        const removeBtn = document.createElement("button");
        removeBtn.textContent = "✕ Remove";
        removeBtn.className   = "btn-remove";

        // onclick on remove 
        removeBtn.onclick = function(event) {
            event.stopPropagation();
            handleDelete(place.id);
        };

        // Clicking the row itself shows the place details
        li.onclick = function() {
            showPlaceDetails(place.id);
        };

        li.appendChild(nameSpan);
        li.appendChild(removeBtn);
        listEl.appendChild(li);
    });
}

// Shows the details panel for a clicked place
function showPlaceDetails(id) {
    activeId = id; // remember which is active for highlight

    const place      = favouritePlaces.visitedplaces[id];
    const detailsDiv = document.getElementById("places-details");

    if (!place) return;

    detailsDiv.style.display = "block";
    detailsDiv.innerHTML =
        `<h2>📍 ${place.location}</h2>
        <p><strong>Landmark:</strong> ${place.landmark || "Not specified"}</p>
        <p><strong>Time of Year:</strong> ${place.timeOfTheYear || "Not specified"}</p>
        <p><strong>Notes:</strong> ${place.notes || "None"}</p>
        ${place.imageUrl ? `<img src="${place.imageUrl}" alt="${place.location}">` : ""}`;

    // Re-render list so the active highlight updates
    renderFavouritePlaces();
}

// Deletes a place, saves, refreshes list, shows toast
function handleDelete(id) {
    favouritePlaces.deleteVisitedPlace(id);
    saveToStorage();

    // If we were viewing this place's details, hide the details panel
    if (activeId == id) {
        document.getElementById("places-details").style.display = "none";
        activeId = null;
    }

    renderFavouritePlaces();
    showToast();
}

// Pops the toast notification up for 2.5 seconds
function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2500);
}

// Called by the "Add Visited Place" button onclick in HTML
function handleAddVisitedPlaces() {
    const locationIn    = document.getElementById("location");
    const landmarkIn    = document.getElementById("landmark");
    const timeIn        = document.getElementById("timeOfTheYear");
    const notesIn       = document.getElementById("notes");
    const imageIn       = document.getElementById("imageUrl");

    // Validation — location is the only required field
    if (locationIn.value.trim() === "") {
        alert("Please enter a place location.");
        return;
    }

    // Create new visitedPlace object using the constructor
    const newPlace = new visitedPlace(
        locationIn.value.trim(),
        landmarkIn.value.trim(),
        timeIn.value.trim(),
        notesIn.value.trim(),
        imageIn.value.trim()
    );

    // Add to our FavouritePlaces object
    favouritePlaces.addVisitedPlaces(newPlace);

    // Save to localStorage so it persists on refresh
    saveToStorage();

    // Refresh the displayed list
    renderFavouritePlaces();

    // Clear all input fields
    locationIn.value    = "";
    landmarkIn.value    = "";
    timeIn.value        = "";
    notesIn.value       = "";
    imageIn.value       = "";
}


// PAGE LOAD
const loaded = loadFromStorage();
if (!loaded) {
    seedDefaultPlaces();
}
renderFavouritePlaces();
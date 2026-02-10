// Business logic
function  Place(location, landmarks, timeOfYear, notes){
    this.location = location;
    this.landmarks = landmarks;
    this.timeOfYear = timeOfYear;
    this.notes = notes;
}

Place.prototype.getInfo = function(){
    return this.location + " - " + this.timeOfYear + " - " + this.notes;
};

Place.prototype.addLandmark = function(landmark){
    this.landmarks.push(landmark);
};

Place.prototype.getLandmarks = function(){
    return this.landmarks.join(", ");
};

// Travellog Logic
function TravelLog () {
   this.places = {};
    this.currentId = 0; 
}

TravelLog.prototype.addPlace = function(place){
    this.currentId += 1;
    place.id = this.currentId;
    this.places[this.currentId] = place;
};

TravelLog.prototype.findPlace = function(id){
    if (this.places[id] !== undefined) {
        return this.places[id];
    }
    return undefined;
};

TravelLog.prototype.deletePlace = function(id){
    if (this.places[id] !== undefined) {
        delete this.places[id];
        return true;
    }
    return false;
}

 //  UI Logic
let travelLog = new TravelLog();
function displayPlaces() {
    let placesList = document.getElementById("places-list");
    placesList.innerHTML = "";
    
    for (let id in travelLog.places) {
        let place = travelLog.places[id];
        let li = document.createElement("li");
        li.textContent = place.location;
        li.setAttribute("data-id", id);
        placesList.appendChild(li);
    }
}

function showPlaceDetails(id) {
    let place = travelLog.findPlace(parseInt(id));
    let detailsDiv = document.getElementById("place-details");
    let contentDiv = document.getElementById("details-content");

     contentDiv.innerHTML = `
        <h3>${place.location}</h3>
        <p><strong>Time of Year:</strong> ${place.timeOfYear}</p>
        <p><strong>Landmarks:</strong> ${place.getLandmarks()}</p>
        <p><strong>Notes:</strong> ${place.notes}</p>
        <button onclick="deletePlace(${id})">Delete Place</button>`;
    
    detailsDiv.style.display = "block";
     
    function deletePlace(id) {
    travelLog.deletePlace(id);
    displayPlaces();
    document.getElementById("place-details").style.display = "none";
}
}

// Event listener
document.getElementById("place-form").addEventListener("submit", function(e) {
    e.preventDefault();
    let location = document.getElementById("location").value;
    let landmarksInput = document.getElementById("landmarks").value;
    let landmarks = landmarksInput.split(",").map(l => l.trim());
    let time = document.getElementById("time").value;
    let notes = document.getElementById("notes").value;
    
    let newPlace = new Place(location, landmarks, time, notes);
    travelLog.addPlace(newPlace);
    
    displayPlaces();

    // Form 
    document.getElementById("place-form").reset();
});

document.getElementById("places list").addEventListener("click", function(e) {
    if (e.target.tagName === "LI") {
        let id = e.target.getAttribute("data-id");
        showPlaceDetails(id);
    }
});
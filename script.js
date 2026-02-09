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

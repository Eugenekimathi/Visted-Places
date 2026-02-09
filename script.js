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



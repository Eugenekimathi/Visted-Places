# 🌍 Places I've Been 2

A  web app to track all the favourite places i have visited — built with constructors, prototypes, and test-driven development.

## Setup / Installation
1. Intialize this repo: `git init https://github.com/Eugenekimathi/Visted-Places.git`
2. Open the folder in VS Code
3. Open `index.html` in your browser — no installs needed!

## 🧪 Tests — Business Logic (TDD)

All tests were written **before** the corresponding code was implemented.

### Describe: `visitedPlace()`

**Test 1** — It should create a visitedPlace object with a location property.
```
Code:    let p = new visitedPlace("Nairobi", "Uhuru Park", "June 2024", "Fun!", "img.jpg");
Expect:  p.location === "Nairobi"
Result:  ✅ Pass
```

**Test 2** — It should create a visitedPlace with a landmark property.
```
Code:    let p = new visitedPlace("Nairobi", "Uhuru Park", "June 2024", "Fun!", "img.jpg");
Expect:  p.landmark === "Uhuru Park"
Result:  ✅ Pass
```

**Test 3** — It should create a visitedPlace with a timeOfTheYear property.
```
Code:    let p = new visitedPlace("Nairobi", "Uhuru Park", "June 2024", "Fun!", "img.jpg");
Expect:  p.timeOfTheYear === "June 2024"
Result:  ✅ Pass
```

**Test 4** — It should create a visitedPlace with a notes property.
```
Code:    let p = new visitedPlace("Nairobi", "Uhuru Park", "June 2024", "Fun!", "img.jpg");
Expect:  p.notes === "Fun!"
Result:  ✅ Pass
```

**Test 5** — It should create a visitedPlace with an imageUrl property.
```
Code:    let p = new visitedPlace("Nairobi", "Uhuru Park", "June 2024", "Fun!", "img.jpg");
Expect:  p.imageUrl === "img.jpg"
Result:  ✅ Pass
```

---

### Describe: `FavouritePlaces()`

**Test 6** — It should create a FavouritePlaces object with an empty visitedplaces object.
```
Code:    let fav = new FavouritePlaces();
Expect:  fav.visitedplaces deep equals {}
Result:  ✅ Pass
```

**Test 7** — It should create a FavouritePlaces object with a currentId starting at 0.
```
Code:    let fav = new FavouritePlaces();
Expect:  fav.currentId === 0
Result:  ✅ Pass
```

---

### Describe: `FavouritePlaces.prototype.assignId()`

**Test 8** — It should increment currentId by 1 each time it is called.
```
Code:    let fav = new FavouritePlaces();
         fav.assignId(); fav.assignId();
Expect:  fav.currentId === 2
Result:  ✅ Pass
```

**Test 9** — It should return the new ID value.
```
Code:    let fav = new FavouritePlaces();
         let id = fav.assignId();
Expect:  id === 1
Result:  ✅ Pass
```

---

### Describe: `FavouritePlaces.prototype.addVisitedPlaces()`

**Test 10** — It should add a visitedPlace to the visitedplaces object.
```
Code:    let fav = new FavouritePlaces();
         let p   = new visitedPlace("Nairobi", "Uhuru Park", "", "", "");
         fav.addVisitedPlaces(p);
Expect:  fav.visitedplaces[1].location === "Nairobi"
Result:  ✅ Pass
```

**Test 11** — It should assign a unique id to the place when added.
```
Code:    fav.addVisitedPlaces(p1);
         fav.addVisitedPlaces(p2);
Expect:  p1.id === 1, p2.id === 2
Result:  ✅ Pass
```

---

### Describe: `FavouritePlaces.prototype.deleteVisitedPlace()`

**Test 12** — It should remove a place from visitedplaces by its id.
```
Code:    fav.addVisitedPlaces(p);
         fav.deleteVisitedPlace(1);
Expect:  fav.visitedplaces[1] === undefined
Result:  ✅ Pass
```

**Test 13** — It should return true when a place is successfully deleted.
```
Code:    fav.addVisitedPlaces(p);
         fav.deleteVisitedPlace(1)
Expect:  true
Result:  ✅ Pass
```

**Test 14** — It should return false when trying to delete an id that does not exist.
```
Code:    fav.deleteVisitedPlace(999)
Expect:  false
Result:  ✅ Pass
```

---

## 🛠 Technologies Used
- HTML5
- CSS3 
- Vanilla JavaScript (ES6)
- localStorage 

## 📬 Contact
Eugene Kimathi

## 📄 License
MIT

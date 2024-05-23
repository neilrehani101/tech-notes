let addBtn = document.getElementById("addBtn");
let addedAlert = document.getElementById("added");
let da = document.getElementById("deleted");
let tError = document.getElementById("title-e");
let nError = document.getElementById("note-e");
let allError = document.getElementById("e-all");
let ea = document.getElementById("edited");
ea.hidden = true;
addedAlert.hidden = true;
da.hidden = true;
tError.hidden = true;
nError.hidden = true;
allError.hidden = true;
// console.log("Welcome to notes app. This is app.js");
showNotes();
// If user adds a note, add it to the localStorage
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let addTile = document.getElementById("addTitle")
    if (addTile.value == "" && addTxt.value == "") {
        allError.hidden = false;
        setTimeout(() => {
            allError.hidden = true
        }, 3000);
    } else if (addTile.value == "") {
        tError.hidden = false;
        setTimeout(() => {
            tError.hidden = true
        }, 3000);
    } else if (addTxt.value == "") {
        nError.hidden = false;
        setTimeout(() => {
            nError.hidden = true
        }, 3000);
    } else {
        if (notes == null) {
            notesObj = [];
        } else {
            notesObj = JSON.parse(notes);
        }
        myObj = {
            title: addTile.value,
            text: addTxt.value
        }
        notesObj.push(myObj);
        // console.log(typeof JSON.stringify(notesObj))
        localStorage.setItem("notes", JSON.stringify(notesObj));
        addTxt.value = "";
        addTitle.value = "";
        // console.log(notesObj);
        showNotes();
        // toastElement.show();
        addedAlert.hidden = false
        setTimeout(() => {
            addedAlert.hidden = true
        }, 3000);
    }
});

// Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        // console.log(index)
        html += `
        <div class="noteCard my-2 mx-2 card ${index}" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text"> ${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                <button id="${index}" onclick="editNoteB(this.id)" class="btn btn-primary">Edit Note</button>

            </div>
        </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    // console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
    da.hidden = false;
    setTimeout(() => {
        da.hidden = true;
    }, 3000);
}

function edit(index) {
    
    // console.log(index)
    let editTxt = document.getElementById("editTxt");
    let notes = localStorage.getItem("notes");
    let editTitle = document.getElementById("editTitle");
    // console.log(editTxt.value, editTitle.value, JSON.parse(notes)[index])
    if (editTitle.value == "" && editTxt.value == "") {
        allError.hidden = false;
        setTimeout(() => {
            allError.hidden = true
        }, 3000);
    } else if (editTitle.value == "") {
        tError.hidden = false;
        setTimeout(() => {
            tError.hidden = true
        }, 3000);
    } else if (editTxt.value == "") {
        nError.hidden = false;
        setTimeout(() => {
            nError.hidden = true
        }, 3000);
    } else {
        let curObj = JSON.parse(notes)[index]
        curObj.title = editTitle.value;
        curObj.text = editTxt.value;
        let notesObj = JSON.parse(notes)
        // console.log(curObj)
        // console.log(notesObj)
        notesObj[index] = curObj
        // console.log(notesObj)
        localStorage.setItem("notes", JSON.stringify(notesObj))
        showNotes();
        ea.hidden = false;
        setTimeout(() => {
            ea.hidden = true;
        }, 3000);
    }
}

function editNoteB(index) {
    var card = document.getElementsByClassName(index)[0];

    card.innerHTML = `
    <div class="card-body">
        <h5 class="card-title">Edit title</h5>
        <div class="form-group">
            <input class="form-control" id="editTitle" rows="3"></input>
        </div>
        <h5 class="card-title">Edit note</h5>
        <div class="form-group">
            <textarea class="form-control" id="editTxt" rows="3"></textarea>
        </div>
        <button id="${index}" onclick="edit(this.id)" class="btn btn-primary">Complete</button>
    </div>
    `
    let editTxt = document.getElementById("editTxt");
    let notes = localStorage.getItem("notes");
    let editTitle = document.getElementById("editTitle");
    let notesObj = JSON.parse(notes)
    // console.log(notesObj[index])
    editTxt.value = notesObj[index].text
    editTitle.value = notesObj[index].title
}



let inputSearch = document.getElementById('inputsearch')
let search = document.getElementById('search');
search.addEventListener("click", function () {

    let inputVal = inputSearch.value.toLowerCase();
    // console.log(inputVal)
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.toLowerCase().includes(inputVal) || cardTitle.toLowerCase().includes(inputVal)) {
            element.hidden = false;
        } else {
            element.hidden = true;
        }
        // console.log(cardTxt);
    })
})

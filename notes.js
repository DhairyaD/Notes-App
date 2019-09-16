const fs = require('fs');
const chalk = require('chalk');

// find a given note
const findNote = (title) => {
    const notes = loadNotes();
    // if the title of a note in notes = title passed in
    // fcn called for each element of array until condition met
    const foundNote = notes.find((note) => note.title === title);

    if (foundNote) {
        console.log("Title: " + foundNote.title);
        console.log("Body: " + foundNote.body);
    }
    
    else {
        console.log("No note of " + foundNote.title + " found")
    }
}

// print the title for each note
const listAllNotes = () => {
    const notes = loadNotes();
    console.log("Your notes: ")
    // for each note in the notes array, print its title
    notes.forEach((note) => {
        console.log(note.title);
    });
}

// add note to json file
const addNote = (title, body) => {
    const notes = loadNotes();
    // find() - returns the first match if any, otherwise return undefined
    // if the note title = passed in title aka duplicate was found
    const duplicateNote = notes.find((note) => note.title === title);

    // If there is no duplicate note
    if (!duplicateNote) {
        // push a note to "notes" arr with passed in args
        notes.push({
            title: title,
            body: body
        });

        // writes contents of notes arr to notes.json
        saveNotes(notes);
        console.log('New note added!');
    } else {
        console.log('Note with title already exists.');
    }
}

// remove a note given a title
const removeNote = (title) => {
    // load the notes
    const notes = loadNotes();
    // notesToKeep contains all titles but the "title" passed in
    const notesToKeep = notes.filter((note) => note.title !== title);

    // notesToKeep < notes when filter removes the passed in title
    if (notes.length > notesToKeep.length){
        // adds notesToKeep array to the json file
        saveNotes(notesToKeep);
        console.log(chalk.green("Note has been removed!"));
    }
    else {
        console.log(chalk.red("Note NOT found!"));
    } 
    
}

// takes in a notes arr and writes that to notes.json
const saveNotes = (notes) => {
    // convert notes into a string
    const dataJSON = JSON.stringify(notes);
    // write string to notes.json
    fs.writeFileSync('notes.json', dataJSON);
}

// return an array of notes
const loadNotes = () => {
    try {   
        // loading in notes.json
        const dataBuffer = fs.readFileSync('notes.json');
        // turning buffer into a string
        const dataJSON = dataBuffer.toString();
        // turn the above string into an object
        return JSON.parse(dataJSON);

    } catch (e) {
        // when notes.json doesnt exist or conversions fail
        return []
    }
}

// export multiple functions using an object
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listAllNotes: listAllNotes,
    findNote: findNote
};

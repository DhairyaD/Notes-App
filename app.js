const fs = require('fs');
const chalk = require('chalk');
const yargs = require('yargs');
const notes = require('./notes.js');

// add command for a note - takes a title, and body
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.addNote(argv.title, argv.body);
    }
}).argv;

// remove command for a note - takes a title
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note title to remove',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
}).argv;

// list command for a note
yargs.command({
    command: 'list',
    describe: 'List a note',
    handler() {
        notes.listAllNotes();
    }
}).argv;

// Find command for a note
yargs.command({
    command: 'find',
    describe: 'Find a note',
    builder: {
        title: {
            describe: 'Find a note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(argv) {
        notes.findNote(argv.title);
    }
}).argv;


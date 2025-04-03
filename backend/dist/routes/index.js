"use strict"; //ensures the rest of the code follows JS rules
Object.defineProperty(exports, "__esModule", { value: true }); //marks module as a ES6 module. allows it to be imported into .ts and .js
const express_1 = require("express"); // import express
const router = (0, express_1.Router)(); //makes a new router
router.get('/', (req, res) => {
    res.send('Hello from the home route!'); //sends message
});
exports.default = router; //exports

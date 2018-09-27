'use strict';

exports.sendHome = (res) => {
    res.send('Welcome to our home page!');
}

exports.sendItems = (res) => {
    res.send('This is the "Items" page');
}

exports.sendReqParam = (req, res) => {
    let veg = req.params.vegetable;
    res.send(`This is the page for "${veg}"`);
}

exports.sendContactFeedback = (res) => {
    res.send('Contact information submitted successfully');
}

exports.signupProcessor = (req, res) => {
    res.send(`Welcome, ${req.body.name}!\nYou have signed up successfully`);
}

// setting const functions
const express = require('express');
const fs = require('fs');
const path = require('path');
// generates id's
const {v4: uuid} = require('uuid');
var notes = require('./db/db.json');


var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var labTest = require('../models/labTest.js');

/* GET ALL BOOKS */
router.get('/', function (req, res, next) {
  labTest.find().populate('group').exec(function (err, labTests) {
    if (err) return next(err);
    res.json(labTests);
  });
});
router.get('/hirarchy', function (req, res, next) {
  labTest.find(function (err, labTests) {
    if (err) return next(err);
    res.json(labTests);
  });
});
/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  labTest.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
  console.log(req.body);
  labTest.create(req.body, function (err, post) {
    if (err) { console.log(err); return next(err); }
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', function (req, res, next) {
  labTest.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) { console.log(err); return next(err); }
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
  labTest.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/all/availableunits', (req, res) => {
  try {
    console.log('hi')
    labTest.distinct('unit', (err, units) => {
      if (err) return next(err);
      console.log('got')
      res.json(units);
    })
  } catch (ex) { console.log(ex) }
})

module.exports = router;
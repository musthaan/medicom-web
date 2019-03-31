var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var labTestGroup = require('../models/labTestGroup.js');

/* GET ALL BOOKS */
router.get('/', function (req, res, next) {

  labTestGroup.find().exec((err, posts) => {
    res.json(posts);
  })
});

router.get('/hi', function (req, res, next) {

  labTestGroup.find({ "parent": null }).exec((err, posts) => {
    debugger;
    var count = posts.length;
    posts.forEach(p => {
      loadChildren(p._id, (ch) => {
        p.children = ch;
        console.log('return from fn');
        console.log(ch);
        console.log(p);
        if (--count == 0) {
          console.log('return data')
          res.json(posts);
        }
      });
    })
  })
});
function loadChildren(parentId, callback) {
  labTestGroup.find({ "parent": mongoose.Types.ObjectId(parentId) },
    (e, c) => {
      console.log(c);
      // loadChildren(c._id, (ch) => {
      //   p.children = ch; 
      callback(c);
      // })

    })
}
/* GET SINGLE BOOK BY ID */
router.get('/:id', function (req, res, next) {
  labTestGroup.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});
router.get('/all/tests', function (req, res, next) {
  labTestGroup.aggregate([
    { $lookup: { from: "labtests", localField: "_id", foreignField: "group", as: "tests" } },
   // { $unwind: 'tests' },
    //{ $sort: { name: 1, 'tests.name': 1 } }
  ]).exec((err, tests) => {
    if (err) return next(err);
    // res.json(tests);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(tests, null, 3));
  })
});

/* SAVE BOOK */
router.post('/', function (req, res, next) {
  debugger;
  //console.log(req);
  labTestGroup.create(req.body, function (err, post) {
    if (err) { console.log(err); return next(err); }
    res.json(post);
  });
});

/* UPDATE BOOK */
router.put('/:id', function (req, res, next) {
  labTestGroup.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE BOOK */
router.delete('/:id', function (req, res, next) {
  labTestGroup.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
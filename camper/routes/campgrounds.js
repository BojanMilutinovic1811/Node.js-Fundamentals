const express = require("express");
const router = express.Router();
const middleware = require("../middleware");

const Campground = require("../models/Campground");

router.get("/", (req, res) => {
  Campground.find({})
    .then(campgrounds => res.render("campgrounds/index", { campgrounds }))
    .catch(err => console.log(err));
});

router.post("/", middleware.isLoggedIn, (req, res) => {
  const newCampground = req.body.campgrounds;
  newCampground.author = { id: req.user._id, username: req.user.username };
  Campground.create(newCampground)
    .then(() => res.redirect("/campgrounds"))
    .catch(err => console.log(err));
});

//creating new campground
router.get("/new", middleware.isLoggedIn, (req, res) =>
  res.render("campgrounds/new")
);

router.get("/:id", (req, res) => {
  Campground.findById(req.params.id)
    .populate("comments")
    .exec()
    .then(campground => {
      res.render("campgrounds/show", { campground });
    })
    .catch(err => console.log(err));
});

//editing campgrounds

router.get("/:id/edit", middleware.checkUserOwnership, (req, res) => {
  Campground.findById(req.params.id)
    .then(campground => {
      res.render("campgrounds/edit", { campground });
    })
    .catch(() => res.redirect("/campgrounds"));
});

router.put("/:id", middleware.checkUserOwnership, (req, res) => {
  Campground.findOneAndUpdate({ _id: req.params.id }, req.body.campground)
    .then(campground => res.redirect("/campgrounds/" + req.params.id))
    .catch(() => res.redirect("/campgrounds"));
});

// deleting campground

router.delete("/:id", middleware.checkUserOwnership, (req, res) => {
  Campground.findOneAndDelete({ _id: req.params.id }).then(
    res.redirect("/campgrounds")
  );
});

module.exports = router;

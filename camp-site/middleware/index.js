const Campground = require('../models/Campground')
const Comment = require('../models/Comment')

const middleware = {}

middleware.checkUserOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id)
            .then(campground => {
                if (campground.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/campgrounds')
            })
    } else {
        res.redirect('back')
    }
}

middleware.isLoggedIn = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        req.flash('error', 'You need to be logged in to do that!')
        res.redirect('/login')
    }
}

middleware.checkCommentOwnership = function (req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.commentid)
            .then(comment => {
                if (comment.author.id.equals(req.user._id)) {
                    next()
                } else {
                    res.redirect('back')
                }
            })
            .catch((err) => {
                console.log(err);
                res.redirect('/campgrounds')
            })
    } else {
        res.redirect('back')
    }

}

module.exports = middleware
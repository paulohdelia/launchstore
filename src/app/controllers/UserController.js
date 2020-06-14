const User = require("../models/User");

module.exports = {
    registerForm(req, res) {
        return res.render("user/register");
    },
    async show(req, res) {
        const { user } = req;
        return res.render('user/index', { user });
    },
    async post(req, res) {
        const userId = await User.create(req.body);

        req.session.userId = userId;

        return res.redirect('/users');
    },
    async update(req, res) {
        
    }
}
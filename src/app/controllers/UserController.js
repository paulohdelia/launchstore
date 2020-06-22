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
        try {
            const { user } = req;
            let { name, email, cpf_cnpj, cep, address } = req.body;

            await User.update(user.id, {
                name,
                email,
                cpf_cnpj,
                cep,
                address
            });

            return res.render('user/index', {
                user: req.body,
                success: 'Dados atualizados com sucesso!'
            })
        } catch(err) {
            console.error(err);
            return res.render('user/index', {
                error: 'Ocorreu um erro!'
            })
        }
    },
    async delete(req, res) {
        try {
            await User.delete(req.body.id);
            req.session.destroy();
            return res.render('session/login', {
                success: 'Conta deletada!'
            });
        } catch (err) {
            console.error(err);
            return res.render('user/index', {
                user: req.body,
                error: 'Erro ao tentar deletar a conta!'
            });
        }
    }
}
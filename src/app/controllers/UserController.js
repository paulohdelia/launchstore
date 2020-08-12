const { unlinkSync } = require('fs');
const { hash } = require('bcryptjs');

const User = require('../models/User');
const Product = require('../models/Product');
const { formatCep, formatCpfCpnj } = require('../../lib/utils');

module.exports = {
    registerForm(req, res) {
        return res.render("user/register");
    },
    async show(req, res) {
        try {
            const { user } = req;

            user.cep = formatCep(user.cep);
            user.cpf_cnpj = formatCpfCpnj(user.cpf_cnpj);

            return res.render('user/index', { user });
        } catch (error) {
            console.error(error);
        }
    },
    async post(req, res) {
        try {
            let { name, email, password, cpf_cnpj, cep, address } = req.body;

            password = await hash(password, 8);
            cpf_cnpj = cpf_cnpj.replace(/\D/g, '');
            cep = cep.replace(/\D/g, '');

            const userId = await User.create({
                name,
                email,
                password,
                cpf_cnpj,
                cep,
                address,
            });

            req.session.userId = userId;

            return res.redirect('/users');
        } catch (error) {
            console.error(error);
        }
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
        } catch (err) {
            console.error(err);
            return res.render('user/index', {
                error: 'Ocorreu um erro!'
            })
        }
    },
    async delete(req, res) {
        try {
            const products = await Product.findAll({ where: { user_id: req.body.id } });

            const allFilesPromise = products.map(product => {
                Product.files(product.id);
            });

            let promiseResults = await Promise.all(allFilesPromise);

            await User.delete(req.body.id);
            req.session.destroy();

            promiseResults.map(result => {
                result.map(file => {
                    try {
                        unlinkSync(file.path);
                    } catch (error) {
                        console.error(error);
                    }
                })
            })

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
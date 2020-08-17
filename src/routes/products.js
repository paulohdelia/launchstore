const express = require('express');

const multer = require('../app/middlewares/multer');

const ProductController = require('../app/controllers/ProductController');
const SearchController = require('../app/controllers/SearchController');

const { isUser } = require('../app/middlewares/session');

const Validator = require('../app/validators/product');

const routes = express.Router();

// Search
routes.get('/search', SearchController.index);

// Products
routes.get('/create', isUser, ProductController.create);
routes.get('/:id', ProductController.show);
routes.get('/:id/edit', isUser, ProductController.edit);

routes.post('/', isUser, multer.array('photos', 6), Validator.post, ProductController.post);
routes.put('/', isUser, multer.array('photos', 6), Validator.put, ProductController.put);
routes.delete('/', isUser, ProductController.delete);

module.exports = routes;
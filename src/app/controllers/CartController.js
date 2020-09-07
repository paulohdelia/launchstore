const { addOne } = require("../../lib/cart");
const Cart = require("../../lib/cart");

const LoadProductsService = require("../services/LoadProducts");

module.exports = {
  async index(req, res) {
    try {
      let { cart } = req.session;

      cart = Cart.init(cart);

      return res.render("cart/index", { cart });
    } catch (error) {
      console.error(error);
    }
  },
  async addOne(req, res) {
    const { id } = req.params;

    const product = await LoadProductsService.load("product", {
      where: { id },
    });

    const { cart } = req.session;

    req.session.cart = Cart.init(cart).addOne(product);

    return res.redirect("/cart");
  },
};

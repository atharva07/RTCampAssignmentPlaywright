class CartPage {

    constructor(page) {
        this.page = page;
        this.checkoutButton = page.locator("#checkout");
        this.continueShoppingButton = page.locator("#continue-shopping");
    }

    async checkOutButton() {
        await this.checkoutButton.click();
    }

    async continueShopping() {
        await this.continueShoppingButton.click();
    }

    // function to remove single item from cart
    async removeItemFromCart(productName) {

        const selectProduct = `.cart_item:has-text("${productName}")`;
        const removeFromCartButton = `${selectProduct} .btn_inventory`;

        await this.page.click(removeFromCartButton);
        console.log(`${productName} has been removed from the cart.`);
    }

    // function to remove multiple items from cart
    async removeItemsFromCart(productNames) {
        for (const productName of productNames) {
            await this.removeItemFromCart(productName);
        }
    }
}

module.exports = {CartPage};
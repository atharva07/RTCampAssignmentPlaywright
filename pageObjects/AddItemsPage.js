class AddItemsPage {

    constructor(page) {
        this.page = page;
        this.filterDropdownSelector = ".product_sort_container";
        this.shoppingcardContainer = page.locator(".shopping_cart_container");
    }

    async selectFilter(filterOption) {  

        const filterDropdown = await this.page.$(this.filterDropdownSelector);

        switch (filterOption) {
            case 'Name (A to Z)':
                await filterDropdown.selectOption('az');
                break;
            case 'Name (Z to A)':
                await filterDropdown.selectOption('za');
                break;
            case 'Price (low to high)':
                await filterDropdown.selectOption('lohi');
                break;
            case 'Price (high to low)':
                await filterDropdown.selectOption('hilo');
                break;
            default:
                console.log('Invalid filter option selected');
                break;
        }
    }

    async addItemToCartByName(productName) {
        const selectProduct = `.inventory_item:has-text("${productName}")`;
        const addToCartButton = `${selectProduct} .btn_inventory`;

        // Click the 'Add to Cart' button
        await this.page.click(addToCartButton);
        console.log(`${productName} has been added to the cart.`);
    }

    // Function to add multiple items to the cart
    async addItemsToCartByName(productNames) {

        await this.page.waitForSelector(".inventory_item");
        for (const productName of productNames) {
            await this.addItemToCartByName(productName);
        }
        await this.page.waitForSelector('.shopping_cart_badge');
    }

    async addToCarButton() {
        await this.shoppingcardContainer.click();
    }
}

module.exports = {AddItemsPage};
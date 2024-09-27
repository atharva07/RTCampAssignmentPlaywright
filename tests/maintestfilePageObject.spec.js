const { test, expect } = require('@playwright/test');
const {LoginPage} = require('../pageObjects/LoginPage');
const {AddItemsPage} = require('../pageObjects/AddItemsPage');
const {CartPage} = require('../pageObjects/CartPage');
const {CheckOutPage} = require('../pageObjects/CheckOutPage');
const AxeBuilder = require('@axe-core/playwright').default;

// Login function to reuse in multiple tests
async function login(page) {
    const username = "standard_user"; 
    const password = "secret_sauce";
    const loginPage = new LoginPage(page);
    loginPage.goTo();
    loginPage.validLogin(username, password);
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

test('Verify sorting order Z-A on All Items page', async ({ page }) => {
    await login(page);
    //await expect(page).toHaveScreenshot('login_Page.png');
    // Click on the sorting dropdown and select Z-A
    const additemspage = new AddItemsPage(page);
    additemspage.selectFilter("Name (Z to A)");

    // Get all item names
    const productNames = await page.$$(".inventory_item_name");

    // Create an arary
    const names = [];
    
    // iterate through elements to store all the elements and capture the names
    for (const element of productNames) {
        const name = await element.textContent();
        names.push(name.trim());
    }

    console.log(names);

    // Check if the names are sorted in Z-A order
    const sortedNames = names.sort().reverse();
    expect(names).toEqual(sortedNames);
});

test('Verify the price order (high-low) displayed on the “All Items” page', async ({ page }) => {
    await login(page);
    // Click on the sorting dropdown and select Z-A
    const additemspage = new AddItemsPage(page);
    additemspage.selectFilter("Price (high to low)");

    // Get all item names
    const productPrices = await page.$$(".inventory_item_price");

    const prices = [];

    for (const element of productPrices) {
        const priceText = await element.textContent();
        const price = parseFloat(priceText.replace("$", ""));
        prices.push(price);
    }

    // verify if the prices are in correct order 
    const sortedOrder = prices.sort(function(a,b) {return b - a});
    console.log(prices);
    console.log(sortedOrder);

    expect(prices).toEqual(sortedOrder);
});

test("Add multiple items to the cart and verify checkout journey", async ({ page }) => {
    await login(page);

    const additemspage = new AddItemsPage(page);

    await additemspage.addItemToCartByName('Sauce Labs Backpack');
    await additemspage.addItemToCartByName('Sauce Labs Bike Light');
    
    additemspage.addToCarButton();
   
    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    // click on checkout button
    const cartpage = new CartPage(page);
    cartpage.checkOutButton();

    // fill the checkout information
    const checkoutpage = new CheckOutPage(page);
    const firstName = "Atharva";
    const lastName = "Hiwase";
    const pincode = "440032";
    checkoutpage.fillInfo(firstName, lastName, pincode);
    //await this.page.waitForTimeout(2000);
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    
    // Finish the checkout
    await page.click('#finish');
    
    // Verify checkout success
    const successMessage = await page.textContent('.complete-header');
    expect(successMessage).toContain('Thank you for your order!');
});

// adding some more tests to verify the data after making a purchase
test("Verify the number of items in a cart", async ({ page }) => {
    await login(page);

    const additemspage = new AddItemsPage(page);
    await additemspage.addItemsToCartByName(['Sauce Labs Backpack',
        'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt', 'Sauce Labs Fleece Jacket'
    ]);
    
    // we will be adding four items in the cart and will verify it.
    const cartCount = await page.textContent(".shopping_cart_badge");
    expect(cartCount).toBe('4');
});

// test("Verify Accessibility Testing", async ({ page }) => {

//     await page.goto('https://www.saucedemo.com/inventory.html');

//     const accessibilityTestResults = await new AxeBuilder({ page }).analyze();

//     expect(accessibilityTestResults.violations).toEqual([]);
// });
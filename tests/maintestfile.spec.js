const { test, expect } = require('@playwright/test');

// Login function to reuse in multiple tests
async function login(page) {

    const userName = page.locator('#user-name');
    const password = page.locator("#password");
    await page.goto('https://www.saucedemo.com/');
    await userName.fill('standard_user');
    await password.fill('secret_sauce');
    await page.click('#login-button');
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
}

test('Verify sorting order Z-A on All Items page', async ({ page }) => {
    await login(page);

    // Click on the sorting dropdown and select Z-A
    await page.selectOption('.product_sort_container', 'za');
    
    // In this test we will verify if the items are in z-a order
    // To verify this we will do the following
    // collect all the names and store them in one array
    // sort them and verify them.

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
    await page.selectOption('.product_sort_container', 'hilo');

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

    // add four items in the cart
    await page.click(".inventory_item:nth-child(6) .btn_inventory");
    await page.click(".inventory_item:nth-child(2) .btn_inventory");
    await page.click(".inventory_item:nth-child(3) .btn_inventory");
    await page.click(".inventory_item:nth-child(4) .btn_inventory");

    await page.click(".shopping_cart_container");

    await expect(page).toHaveURL("https://www.saucedemo.com/cart.html");

    // click on checkout button
    await page.click("#checkout");

    // fill the checkout information
    const firstName = page.locator("#first-name");
    const lastName = page.locator("#last-name");
    const zipCode = page.locator("#postal-code");
    await firstName.fill('Atharva');
    await lastName.fill('Hiwase');
    await zipCode.fill('440027');
    await page.click('#continue');

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

    // we will be adding four items in the cart and will verify it.
    await page.click(".inventory_item:nth-child(6) .btn_inventory");
    await page.click(".inventory_item:nth-child(2) .btn_inventory");
    await page.click(".inventory_item:nth-child(3) .btn_inventory");
    await page.click(".inventory_item:nth-child(4) .btn_inventory");

    const cartCount = await page.textContent(".shopping_cart_badge");
    expect(cartCount).toBe('4');
});


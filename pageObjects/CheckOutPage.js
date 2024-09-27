class CheckOutPage {

    constructor(page) {
        this.page = page;
        this.firstNamefield = page.locator("#first-name");
        this.lastNamefield = page.locator("#last-name");
        this.zipCodefield = page.locator("#postal-code");
        this.continueButton = page.locator('#continue');
    }

    async fillInfo(firstName, lastName, pincode) {
        await this.firstNamefield.type(firstName);
        await this.lastNamefield.type(lastName);
        await this.zipCodefield.type(pincode);
        await this.continueButton.click(); 
    }
}

module.exports = {CheckOutPage};
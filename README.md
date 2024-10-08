# RTCampAssignmentPlaywright

# Playwright Test Automation Framework 

# Getting Started

URL : https://www.saucedemo.com/

Tools required to get started

1. Node.js
2. VS Code
3. JavaScript
4. Github

# Running the test cases

- Download the zip or clone the Git repository.
- Unzip the zip file (if you downloaded one).
- Create a project folder and store the project in it.
- Open VScode and import the project.
- Hit the command -> ```npx playwright test maintestfilePageObject.spec.js```
- You are all set
- Tests can run in headed(browser based) and headless mode.
- To run in headed mode, change the headless option in playwright.config.js file as false or keep as true to run in headless mode.

# Code Snippet

```
const { defineConfig, devices } = require('@playwright/test');
import path from 'path';

const config = {
  testDir: './tests',
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  
  reporter: [
    ['list'],
    ['html']
  ],

  projects: [
    {
      name: 'Chrome', // For Chromium-based browsers (Google Chrome)
      use: { 
        browserName: 'chromium',
        channel: 'chrome', 
        headless: false, 
      },
    },
    {
      name: 'Firefox', // For Firefox
      use: { 
        browserName: 'firefox',
        headless: false, 
      },
    },
    {
      name: 'Edge', // For Microsoft Edge
      use: { 
        browserName: 'chromium',
        channel: 'msedge',
        headless: false, 
      },
    },
  ],

  use: {
    headless : false,
    screenshot : 'on',
    video: 'on',
    trace : 'retain-on-failure',
    launchOptions: {
      args: ["--start-fullscreen"]
    },
    viewport : {
      width : 1280,
      height : 720
    }
  },
  recordVideo: {
    dir: path.join(__dirname, 'videos'), // Directory to save videos
    size: { width: 1920, height: 1080 }, // Resolution of recorded video
  },
};

module.exports = config;

```

# Test Cases

1. Verify sorting order Z-A on All Items page
2. Verify the price order (high-low) displayed on the “All Items” page
3. Add multiple items to the cart and verify checkout journey
4. Verify the number of items in a cart
5. Verify Accessibility Tests

# Project Structure

- In this project we are using page object model framework where are storing all the methods and locators of each page in seperate class.
- For this we have created pageObjects folder and stored all our classes in this folder.
- And for storing our main test file we have tests folder. 
- we have playwright config file to make configuration level changes for automation framework.
- For reporting we are using playwright default reporter to get the insights on our test cases. You can check below 

![Screenshot (23).png](https://github.com/atharva07/RTCampAssignmentPlaywright/blob/main/tests/maintestfilePageObject.spec.js-snapshots/Screenshot%20(23).png)

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
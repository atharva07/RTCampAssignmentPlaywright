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
  use: {
    browserName : 'chromium',
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
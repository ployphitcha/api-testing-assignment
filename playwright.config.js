const { defineConfig } = require('@playwright/test');
module.exports = defineConfig({
  reporter: [
    ['list'],
    ['json', { outputFile: 'test-results/cucumber-report.json' }]
  ],
});
const reporter = require('cucumber-html-reporter');

const options = {
    theme: 'bootstrap',
    jsonFile: 'test-results/cucumber-report.json',
    output: 'test-results/cucumber-report.html',
    reportSuiteAsScenarios: true,
    launchReport: false,
    metadata: { 
        "App Version": "1.0.0",
        "Test Environment": "STAGING",
        "Browser": "Chrome",
        "Platform": "Mac"
    }
};

reporter.generate(options);
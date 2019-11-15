let test = require('selenium-webdriver/testing');
let webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chromedriver = require('chromedriver');

let driver;

describe('UI Test', function(){
  before(function () {
    // initializing chrome driver
    driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    driver.get('http://127.0.0.1:8080');

    // maximizing chrome browser
    driver.manage().window().maximize();
  });

  afterEach(function () {
    let testCaseName = this.currentTest.title;
    let testCaseStatus = this.currentTest.state;
    if (testCaseStatus === 'failed') {
        console.log(`Test: ${testCaseName}, Status: Failed!`);
        // capturing screenshot if test fails
        driver.takeScreenshot().then((data) => {
            let screenshotPath = `/screenshots/${testCaseName}.png`;
            console.log(`Saving Screenshot as: ${screenshotPath}`);
            fs.writeFileSync(screenshotPath, data, 'base64');
        });
    } else if (testCaseStatus === 'passed') {
        console.log(`Test: ${testCaseName}, Status: Passed!`);
    } else {
        console.log(`Test: ${testCaseName}, Status: Unknown!`);
    }
  });

  after(function () {
    driver.quit();
  });

  it('should successfully display formatted number', function(){
    driver.findElement(webdriver.By.id("phoneNumber")).sendKeys("613 995 0253");
    let response = driver.findElement(webdriver.By.id("formattedNumber"));
    response.getAttribute('value').then(function(value) {
      assert.equal(value, '6139950253');
    });
  });

  it('should display error message for invalid format', function(){
    driver.findElement(webdriver.By.id("phoneNumber")).sendKeys("113 995 0257");
    let response = driver.findElement(webdriver.By.id("errorSpan"));
    response.getAttribute('value').then(function(value) {
      assert.equal(value, 'Please enter a valid NANP number');
    });
  });
});

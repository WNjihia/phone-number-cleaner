var assert = require('assert');
var chai = require('chai');
var expect = chai.expect();
var should = chai.should();
var test = require('selenium-webdriver/testing');
var webdriver = require('selenium-webdriver');
const cleaner = require('./scripts/index.js');


describe('Unit Tests', function(){
  it('successfully runs when punctuation is used', function(){
    assert.equal(cleaner.validateNumber("+1 (613)-995-0253"), true);
  });

  it('should indicate failure when letters are included', function(){
    assert.equal(cleaner.validateNumber("a34 745 8765"), false);
  });

  //NANP format (NXX-NXX-XXXX)
  it('should indicate failure when N is not between 2 and 9', function(){
    assert.equal(cleaner.validateNumber("123 123 6754"), false);
  });

  it('successfully runs when country code included', function(){
    assert.equal(cleaner.validateNumber("1 613 995 0253"), true);
  });

  // excess digits - more than 10 digits excluding country code
  it('should indicate failure when number has excess digits', function(){
    assert.equal(cleaner.validateNumber("613 995 995 0253"), false);
  });

  it('successfully should format punctuation on valid numbers', function(){
    var result = cleaner.formatNumber("613.995.0253");
    assert.equal(result, "6139950253");
  });

});


describe('Integration Test', function(){
  it('should display correctly formatted number', function(){

  });
});

test.describe('UI Test', function(){
  test.before(function () {
    // initializing chrome driver
    var driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();

    driver.get('http://127.0.0.1:8000')
      .then(()=>done());

    // maximizing chrome browser
    driver.manage().window().maximize();
  });

  test.afterEach(function () {
    let testCaseName: string = this.currentTest.title;
    let testCaseStatus: string = this.currentTest.state;
    if (testCaseStatus === 'failed') {
        console.log(`Test: ${testCaseName}, Status: Failed!`);
        // capturing screenshot if test fails
        driver.takeScreenshot().then((data) => {
            let screenshotPath = `TestResults/Screenshots/${testCaseName}.png`;
            console.log(`Saving Screenshot as: ${screenshotPath}`);
            fs.writeFileSync(screenshotPath, data, 'base64');
        });
    } else if (testCaseStatus === 'passed') {
        console.log(`Test: ${testCaseName}, Status: Passed!`);
    } else {
        console.log(`Test: ${testCaseName}, Status: Unknown!`);
    }
  });

  test.after(function () {
    driver.quit();
  });

  test.it('should successfully display formatted number', function(){
    driver.findElement(webdriver.By.id(phoneNumber)).sendKeys("613 995 0253");
    var response = driver.findElement(webdriver.By.id(formattedNumber));
    response.getAttribute('value').then(function(value) {
      assert.equal(value, '6139950253');
    });
  });

  test.it('should display error message for invalid formats', function(){
    driver.findElement(webdriver.By.id(phoneNumber)).sendKeys("613 995 025");
    var response = driver.findElement(webdriver.By.id(errorSpan));
    response.getAttribute('value').then(function(value) {
      assert.equal(value, 'Please enter a valid NANP number');
    });
  });

  test.it('should not allow user to input a letter', function(){
    var inputBox = driver.findElement(webdriver.By.id(phoneNumber)).sendKeys("a");
    inputBox.getAttribute('value').then(function(value) {
      assert.equal(value, '');
    });
  });
});

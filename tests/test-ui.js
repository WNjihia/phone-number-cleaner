var assert = require('assert');
let test = require('selenium-webdriver/testing');
let webdriver = require('selenium-webdriver');
var chrome = require('selenium-webdriver/chrome');
var chromedriver = require('chromedriver');
var fs = require('fs');

let driver;

describe('UI Test', function() {
  before(function() {
    // initializing chrome driver
    driver = new webdriver.Builder()
      .withCapabilities(webdriver.Capabilities.chrome())
      .build();

    driver.get('http://127.0.0.1:8080');

    // maximizing chrome browser
    driver.manage().window().maximize();
  });

  afterEach(function() {
    let testCaseName = this.currentTest.title;
    testCaseName.replace(/\s/g, '');
    let testCaseStatus = this.currentTest.state;
    if (testCaseStatus === 'failed') {
      driver.takeScreenshot().then((data) => {
        let screenshotPath = `${process.cwd()}/tests/screenshots/${testCaseName}.png`;
        console.log(`Saving Screenshot as: ${screenshotPath}`);
        fs.writeFile(screenshotPath, data.replace(/^data:image\/png;base64,/, ''), 'base64', function(err) {
          if (err) console.log(err);
        });
      }).catch(function(err) {
        console.log(err)
      });
    } else if (testCaseStatus === 'passed') {
      console.log(`Test: ${testCaseName}, Status: Passed!`);
    } else {
      console.log(`Test: ${testCaseName}, Status: Unknown!`);
    }
  });

  after(function() {
      driver.quit();
  });

  it('should successfully display formatted number', function() {
    driver.findElement(webdriver.By.id('phoneNumber')).sendKeys('613 995 0253');
    let response = driver.findElement(webdriver.By.id('formattedNumber'));
    response.getAttribute('value').then(function(response) {
      assert.equal(response, '6139950253');
    }).catch(function(err) {
      console.log(err)
    });
  });

  it('should display error message for invalid format', function() {
    driver.findElement(webdriver.By.id('phoneNumber')).sendKeys('113 995 0257');
    let response = driver.findElement(webdriver.By.id('error'));

    response.getAttribute('value').then(function(response) {
      assert.equal(response, 'Please enter a valid NANP number');
    }).catch(function(err) {
      console.log(err)
    });
  });

  it('should have an input box', function() {
    inputBox = driver.findElement(webdriver.By.id('phoneNumber'));
    assert.notEqual(inputBox, null);
  });

  it('input box includes a placeholder', function(){
    placeHolder = driver.findElement(webdriver.By.id('phoneNumber'));
    placeHolder.getAttribute('placeholder').then(function(placeHolder) {
      assert.equal(placeHolder, 'Enter a phone number (XXX-XXX-XXXX)');
    }).catch(function(err) {
      console.log(err)
    });
  });

  it('has a run unit tests link', function(){
    link = driver.findElement(webdriver.By.tagName("a"));
    link.getText().then(function(link) {
      assert.equal(link, 'Run Unit Tests');
    }).catch(function(err) {
      console.log(err)
    });
  });

  it('input value changes when a non-alphabet key is pressed', function() {
    let initialValue = driver.findElement(webdriver.By.id('phoneNumber'));
    initialValue.getAttribute('value').then(function(value) {
      assert.equal(value, '');
    }).catch(function(err) {
      console.log(err)
    });

    initialValue.sendKeys('1');

    let newValue = driver.findElement(webdriver.By.id('phoneNumber'));
    newValue.getAttribute('value').then(function(value) {
      assert.equal(value, '1');
    }).catch(function(err) {
      console.log(err)
    });
  });

  it('input value doesnt change when an alphabet key is pressed', function() {
    let initialValue = driver.findElement(webdriver.By.id('phoneNumber'));
    initialValue.getAttribute('value').then(function(value) {
      assert.equal(value, '');
    }).catch(function(err) {
      console.log(err)
    });

    initialValue.sendKeys('a');

    let newValue = driver.findElement(webdriver.By.id('phoneNumber'));
    newValue.getAttribute('value').then(function(value) {
      assert.equal(value, '');
    }).catch(function(err) {
      console.log(err)
    });
  });
});

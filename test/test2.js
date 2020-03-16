const assert = require('assert');
//var options = require('selenium-webdriver/chrome')
const {Builder, Key, By, until,promise, Capabilities} = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var path = '/home/sachmo/chromedriver';
promise.USE_PROMISE_MANAGER = false;
var url = "http://sachmo99.github.io/sequizapp"

describe('URL BYPASSING CHECKS', function() {
    let driver;


    before(async function () {
        this.timeout(30000);
        //driver = await new Builder().forBrowser('chrome').build();
        var options = new firefox.Options();
        options.addArguments("-headless");
        driver = new Builder().forBrowser('firefox').setFirefoxOptions(options).build();
        //await driver.get(url);
    });

it('deny access dashboard without logging in',async function() {
    this.timeout(30000);
    await driver.get(url+'/#/dashboard');
    await driver.wait(until.elementLocated(By.className('jumbotron text-center'))).then(el => {return el});
    let temp = await driver.findElement(By.className('btn btn-lg btn-primary')).then(el => {return el.getText();});
    console.log(temp);
    if(temp == "Please Login "){
        assert.ok(true);
    }else {
        assert.ok(false);
    }
});
    after(function(){this.timeout(15000);driver.quit();assert.ok(true)});

});

describe('Testing with very long inputs and extended ascii characters', function() {
    let driver;

    before(async function () {
        this.timeout(30000);
        //driver = await new Builder().forBrowser('chrome').build();
        var options = new firefox.Options();
        options.addArguments("-headless");
        driver = new Builder().forBrowser('firefox').setFirefoxOptions(options).build();  driver = new Builder().forBrowser('firefox').setFirefoxOptions().build();
        //await driver.get(url);
    });

    it('testing login with 256 char input',async function() {
        this.timeout(30000);
        var input = 'abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababab'
        await driver.get(url);
        await driver.findElement(By.id('username')).sendKeys(input);
        await driver.findElement(By.id('password')).sendKeys(input);
        await driver.findElement(By.id('signinButton')).click();
        try{
        var text = await driver.wait(until.elementIsVisible(driver.findElement(By.id('NoUserErrorMsg')))).then(el => {return el.getText()});
        console.log(text);
        assert.equal(text,'User doesn\'t exist or Wrong Password');
        }
        catch(err){
            console.log(err);
            assert.ok(false);
        }
    });
    after(async function(){this.timeout(15000);await driver.quit();assert.ok(true)});
});


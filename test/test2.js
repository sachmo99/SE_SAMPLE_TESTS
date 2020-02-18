const assert = require('assert');
//var options = require('selenium-webdriver/chrome')
const {Builder, Key, By, until,promise, Capabilities} = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var path = '/home/sachmo/chromedriver';
promise.USE_PROMISE_MANAGER = false;
var url = "http://192.168.137.1:3000/"

describe('URL BYPASSING CHECKS', async function() {
    let driver;


    before(async function () {
        this.timeout(30000);
        //driver = await new Builder().forBrowser('chrome').build();
        driver = new Builder().forBrowser('firefox').setFirefoxOptions().build();
        await driver.get(url);
    });

it('access dashboard without logging in')

});
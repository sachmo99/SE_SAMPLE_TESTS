
const assert = require('assert');
//var options = require('selenium-webdriver/chrome')
const {Builder, Key, By, until,promise, Capabilities} = require('selenium-webdriver');
var firefox = require('selenium-webdriver/firefox');
var path = '/home/sachmo/chromedriver';
promise.USE_PROMISE_MANAGER = false;
var url = "http://172.28.1.2:3000/"

describe('Open and Test Quiz App with CORRECT LOGIN', function () {
  let driver;


    before(async function () {
        this.timeout(30000);
        //driver = await new Builder().forBrowser('chrome').build();
        driver = new Builder().forBrowser('firefox').setFirefoxOptions().build();
        await driver.get(url);
    });

    it('test connection', async function() {
        this.timeout(30000);
        
       let output =  await driver.findElement(By.className('h0')).getText();
        //await driver.findElement(By.name('q')).sendKeys('dalenguyen', Key.RETURN);
        //await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
        //driver.sleep(5000);
        let title = await driver.getTitle();
        assert.equal(title, 'React App');
        assert.equal(output,'Quiz App');
        
    });
    it('check Login page important elements',async function() {
        this.timeout(30000);
        var signinsize;
        try{
       signinsize  = await driver.findElements(By.id('signinCard')).then(function(elems) {
           var lens = elems.length;
           console.log(lens);
           return lens;
       });
    }
       catch(err) {
            signinsize = 0;

       }
       console.log(signinsize);
       assert.equal(signinsize,'1');
    });
    it('enter correct login details',async function() {
        this.timeout(10000);
        await driver.findElement(By.id('username')).sendKeys('sachmo');
        await driver.findElement(By.id('password')).sendKeys('sachipo');
        await driver.findElement(By.id('signinButton')).click();
        try{
        var text = await driver.wait(until.elementLocated(By.id('welcomeMsg')),5000).then(el => {return el.getText()});
        console.log(text);
        assert.equal(text,`Welcome, ${'sachmo'}`);
        }
        catch(err){
            assert.ok(false);
        }
    });
    

    after(function(){this.timeout(3000);driver.quit();assert.ok(true)});
})

describe('Open and Test Quiz App with INCORRECT CRED', function () {
    let driver;
  
  
      before(async function () {
          this.timeout(30000);
          //driver = await new Builder().forBrowser('chrome').build();
          driver = new Builder().forBrowser('firefox').setFirefoxOptions().build();
          await driver.get(url);
      });
  
      it('enter incorrect login details, block login',async function() {
        this.timeout(10000);
        await driver.findElement(By.id('username')).sendKeys('sachmo');
        await driver.findElement(By.id('password')).sendKeys('sachmoadi');
        await driver.findElement(By.id('signinButton')).click();
        try{
        var text = await driver.wait(until.elementIsVisible(driver.findElement(By.id('NoUserErrorMsg')))).then(el => {return el.getText()});
        console.log(text);
        assert.equal(text,'User doesn\'t exist or Wrong Password')
        }
        catch(err){
            console.log(err);
            assert.ok(false);
        }
    });
     
      
  
      after(function(){this.timeout(3000);driver.quit();assert.ok(true)});
  })

describe('Register NEW user with non-existing name', function () {
    let driver;
  
  
      before(async function () {
          this.timeout(30000);
          //driver = await new Builder().forBrowser('chrome').build();
          driver = new Builder().forBrowser('firefox').setFirefoxOptions().build();
          await driver.get(url);
      });
  
      it('test connection', async function() {
          this.timeout(30000);
          
         let output =  await driver.findElement(By.className('h0')).getText();
          //await driver.findElement(By.name('q')).sendKeys('dalenguyen', Key.RETURN);
          //await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
          //driver.sleep(5000);
          let title = await driver.getTitle();
          assert.equal(title, 'React App');
          assert.equal(output,'Quiz App');
          
      });
      it('selecting register | new user sign up option',async function() {
          this.timeout(30000);
          var signinsize;
          try{
          await driver.findElement(By.id('toSignupPageButton')).click();
          let t1 = By.className('registerPage');
           //await driver.wait(until.elementLocated(driver.findElement(By.className('registerPage'))),7000);
           var signinsize = await driver.findElements(By.className('registerPage')).then(el => {return el});
           console.log(signinsize.length);
            if(signinsize.length >=1){
                assert.ok(true);
            }
            else{
                assert.ok(false);
            }
        }
         catch(err) {
              signinsize = 0;
            console.log(err);
              assert.ok(false);
  
         }
         //console.log(signinsize);
         //assert.equal(signinsize,'1');
      });

      it('entering new keys into register form', async function() {
        this.timeout(30000);
        var temp;
        try {
            //await driver.wait(until.elementLocated((By.id('toSignupPageButton'))),10000);
            //await driver.findElement(By.id('toSignupPageButton')).click();
            let username = Math.random().toString(36).substring(7);
            await driver.findElement(By.id('username')).sendKeys(username);
            await driver.findElement(By.id('email')).sendKeys('aditya@example.com');
            await driver.findElement(By.id('rollNo')).sendKeys('CB.EN.U4CSE17160');
            await driver.findElement(By.id('phoneNo')).sendKeys('9764318552');
            await driver.findElement(By.id('password')).sendKeys('sachmoadi1-');
            await driver.sleep(3000);
            await driver.findElement(By.id('registerButton')).click();
            await driver.sleep(3000);
            
            //let text = await driver.switchTo().alert().then(el => {console.log(el.getText());return el});
            console.log("username generated:",username);
            //text.accept();
            await driver.sleep(2000);
            var temp = await driver.findElements(By.id('signinCard')).then(el => {return el});
            console.log(temp)
            if(temp.length >=1){
                assert.ok(true);
            }
            //console.log(text.getText());
            else {
                assert.ok(false);
            }
        }
        catch(err){
            console.log(err);
            assert.ok(false);
        }
    });
    it('entering null keys into register form', async function() {
        this.timeout(30000);
        var temp;
        try {
            await driver.wait(until.elementLocated((By.id('toSignupPageButton'))),10000);
            await driver.findElement(By.id('toSignupPageButton')).click();
            let username = Math.random().toString(36).substring(7);
            await driver.findElement(By.id('username')).sendKeys(username);
            await driver.findElement(By.id('email')).sendKeys('');
            await driver.findElement(By.id('rollNo')).sendKeys('');
            await driver.findElement(By.id('phoneNo')).sendKeys('');
            await driver.findElement(By.id('password')).sendKeys('');
            await driver.sleep(3000);
            await driver.findElement(By.id('registerButton')).click();
            await driver.sleep(3000);
            
            //let text = await driver.switchTo().alert().then(el => {console.log(el.getText());return el});
            console.log("username generated:",username);
            //text.accept();
            await driver.sleep(2000);
            var temp = await driver.findElements(By.id('signinCard')).then(el => {return el});
            console.log(temp)
            if(temp.length >=1){
                assert.ok(true);
            }
            //console.log(text.getText());
            else {
                assert.ok(false);
            }
        }
        catch(err){
            console.log(err);
            assert.ok(false);
        }
    });
      after(function(){this.timeout(3000);driver.quit();assert.ok(true)});
  })
  describe('Register NEW user with already existing name', function () {
    let driver;
  
  
      before(async function () {
          this.timeout(30000);
          //driver = await new Builder().forBrowser('chrome').build();
          driver = new Builder().forBrowser('firefox').setFirefoxOptions().build();
          await driver.get(url);
      });
  
      it('test connection', async function() {
          this.timeout(30000);
          
         let output =  await driver.findElement(By.className('h0')).getText();
          //await driver.findElement(By.name('q')).sendKeys('dalenguyen', Key.RETURN);
          //await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
          //driver.sleep(5000);
          let title = await driver.getTitle();
          assert.equal(title, 'React App');
          assert.equal(output,'Quiz App');
          
      });

      it('entering existing keys into register form', async function() {
        this.timeout(30000);
        var temp;
        try {
            //await driver.wait(until.elementLocated((By.id('toSignupPageButton'))),10000);
            //await driver.findElement(By.id('toSignupPageButton')).click();
            await driver.findElement(By.id('toSignupPageButton')).click();
            let username = Math.random().toString(36).substring(7);
            await driver.findElement(By.id('username')).sendKeys('sachmo');
            await driver.findElement(By.id('email')).sendKeys('aditya@example.com');
            await driver.findElement(By.id('rollNo')).sendKeys('CB.EN.U4CSE17160');
            await driver.findElement(By.id('phoneNo')).sendKeys('9764318552');
            await driver.findElement(By.id('password')).sendKeys('sachmoadi1-');
            await driver.sleep(5000);
            await driver.findElement(By.id('registerButton')).click();
            await driver.sleep(7000);
            
            let text = await driver.switchTo().alert().getText();
            //console.log("username generated:",username);
            //text.accept();
            console.log(text);
    
            assert.equal(text,'User already exits\nTry a different Username')
        }
        catch(err){
            console.log(err);
            assert.ok(false);
        }
    })
      after(function(){this.timeout(3000);driver.quit();assert.ok(true)});
  });
  
  describe('Testing for SQL INJECTIONS', function () {
    let driver;
  
  
      before(async function () {
          this.timeout(30000);
          //driver = await new Builder().forBrowser('chrome').build();
          driver = new Builder().forBrowser('firefox').setFirefoxOptions().build();
          await driver.get(url);
      });
  
      it('test connection', async function() {
          this.timeout(30000);
          
         let output =  await driver.findElement(By.className('h0')).getText();
          //await driver.findElement(By.name('q')).sendKeys('dalenguyen', Key.RETURN);
          //await driver.wait(until.elementLocated(By.id('rcnt')), 10000);
          //driver.sleep(5000);
          let title = await driver.getTitle();
          assert.equal(title, 'React App');
          assert.equal(output,'Quiz App');
          
      });

      it('INJECTION 1: OR "1"="1" --+ ', async function() {
        this.timeout(10000);
        await driver.findElement(By.id('username')).sendKeys('OR 1=1 --+');
        await driver.findElement(By.id('password')).sendKeys('sachmoadi');
        await driver.findElement(By.id('signinButton')).click();
        try{
        var text = await driver.wait(until.elementIsVisible(driver.findElement(By.id('NoUserErrorMsg')))).then(el => {return el.getText()});
        console.log(text);
        assert.equal(text,'User doesn\'t exist or Wrong Password')
        }
        catch(err){
            console.log(err);
            assert.ok(false);
        }
    })
      after(function(){this.timeout(3000);driver.quit();assert.ok(true)});
  });

  






 


















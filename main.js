const puppeteer = require("puppeteer-extra");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
const clc = require("cli-color");
const gradient = require("gradient-string");
const setTitle = require("console-title");
const fs = require('fs');
const lineReader = require('line-reader');
const config = require('./config.json');
var UsernameGenerator = require('username-generator');
const password = require('secure-random-password');
puppeteer.use(StealthPlugin());

urls = [];

function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

async function main() {
    await puppeteer
        .launch({
          headless: false,
          args: [
            `--load-extension=${__dirname + "/better"}`],
          executablePath:
            "C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe",
        })
        .then(async (browser) => {
        var page = await browser.newPage();
        const username = UsernameGenerator.generateUsername();
        const passwords = password.randomPassword({ characters: [password.lower, password.upper, password.digits] })
        await page.goto('chrome-extension://dknlfmjaanfblgfdfebhijalfmhmjjjo/popup.html')
        await page.type('#key', 'sub_1M8aSSCRwBwvt6ptkAmUNtNu')
        await sleep(2000)
        await page.goto("https://www.roblox.com", {timeout: 60 * 1000}) 
        await page.click('#MonthDropdown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.click('#DayDropdown', '10')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.click('#YearDropdown', '1999')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('ArrowDown')
        await page.keyboard.press('Enter')
        await page.type('input[name="signupUsername"]', username)
        await page.type('input[name="signupPassword"]', passwords)
        await page.click('#MaleButton')
        await sleep(2000)
        await page.click('#signup-button')
        await page.waitForSelector('.col-xs-12.container-header', {timeout: 30 * 1000})
        let sucess = await page.evaluate(() => {
          return document.querySelector('.col-xs-12.container-header').innerText;
        })
        if (sucess == 'Home') {
          const cookies = await page.cookies()
          console.log(cookies['.ROBLOSECURITY'])
          console.log(clc.greenBright(`[+] Successfully Generated: ${username}:${passwords}`))
          const content = `${username}:${passwords}\n`
          fs.appendFile('generated.txt', content, err => {
            if (err) {
              console.log(clc.red("[!] Error saving account to file."))
              check_token();
              return
            }
          })
          await browser.close();
          main();
        }
    })
}
main();

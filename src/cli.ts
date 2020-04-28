#!/usr/bin/env node
'use strict';

// /html/body/div[4]/div[4]/div/div/ul/li[1]/div[1]/span/span

import * as  puppeteer from 'puppeteer-core'

(async () => {
  ///
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: '/opt/google/chrome/google-chrome',
    userDataDir: '/home/oleg/.config/google-chrome/Profile 1'
  });
  ///
  const page = await browser.newPage();
  await page.goto('https://meet.google.com');
  await page.setJavaScriptEnabled(true);

  {
    const joinOrStartMeeting = '/html/body/div[1]/c-wiz/div/div/div/div[2]/div[2]/div[2]/div/c-wiz/div/div/div/div[1]';
    await page.waitForXPath(joinOrStartMeeting, {timeout: 2000})
    const elements = await page.$x(joinOrStartMeeting);
    await elements[0].click();
  }

  {
    const continueBtn = '/html/body/div[1]/div[3]/div/div[2]/span/div/div[4]/div[2]/div/span/span';
    await page.waitForXPath(continueBtn, {timeout: 2000})
    const elements = await page.$x(continueBtn);
    await elements[0].click();
  }

  {
    const linkText = '/html/body/div[1]/c-wiz/div/div/div[3]/div[3]/div/div[2]/div/div[2]/div/div[1]/div[1]/div[2]/div/div[1]';
    await page.waitForXPath(linkText, {timeout: 2000})
    const elements = await page.$x(linkText);
    const title = await page.evaluate(el => el.innerHTML, elements[0]);
    console.log('title:', title);
  }
  await browser.close();
})()

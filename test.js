const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    headless: false
  });
  const context = await browser.newContext();

  // Open new page
  const page = await context.newPage();

  // Go to https://www.wikipedia.org/
  await page.goto('https://www.wikipedia.org/');

  // Click //div[starts-with(normalize-space(.), 'Русский 1 665 000+ статей English 6 168 000+ articles Español 1 630 000+ artícul')]
  await page.click('//div[starts-with(normalize-space(.), \'Русский 1 665 000+ статей English 6 168 000+ articles Español 1 630 000+ artícul\')]');

  // Click text="العربية"
  await page.click('text="العربية"');
  // assert.equal(page.url(), 'https://ar.wikipedia.org/wiki/الصفحة_الرئيسية');

  // Click //p[starts-with(normalize-space(.), 'أَبُو القَاسِم مُحَمَّد بنِ عَبد الله بنِ عَبدِ المُطَّلِب (22 أبريل 571 - 8 يون')]
  await page.click('//p[starts-with(normalize-space(.), \'أَبُو القَاسِم مُحَمَّد بنِ عَبد الله بنِ عَبدِ المُطَّلِب (22 أبريل 571 - 8 يون\')]');

  // Click //a[26][normalize-space(.)='571']
  await page.click('//a[26][normalize-space(.)=\'571\']');
  // assert.equal(page.url(), 'https://ar.wikipedia.org/wiki/571');

  // Click text="ألفية 1"
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://ar.wikipedia.org/wiki/ألفية_1' }*/),
    page.click('text="ألفية 1"')
  ]);

  // Click text="دخول"
  await page.click('text="دخول"');
  // assert.equal(page.url(), 'https://ar.wikipedia.org/w/index.php?title=خاص:دخول_المستخدم&returnto=ألفية+1');

  // Click text="انضم إلى ويكيبيديا"
  await page.click('text="انضم إلى ويكيبيديا"');
  // assert.equal(page.url(), 'https://ar.wikipedia.org/w/index.php?title=خاص:إنشاء_حساب&returnto=ألفية+1&campaign=loginCTA');

  // Go to https://ar.wikipedia.org/wiki/الصفحة_الرئيسية
  await page.goto('https://ar.wikipedia.org/wiki/الصفحة_الرئيسية');

  // Close page
  await page.close();

  // ---------------------
  await context.close();
  await browser.close();
})();
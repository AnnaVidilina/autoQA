const { chromium } = require("playwright");
const { expect } = require("playwright/test");

async function sortHackerNewsArticles() {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");

  // Accumulate timestamps until we have at least 100 articles
  let articleTimestamps = [];
  do {
    // Wait for articles to load
    await page.waitForSelector(".athing");

    // Extract timestamps on the current page and add them to the list
    const timestamps = await page.$$eval(".age", elements =>
      elements.map(el => el.getAttribute("title"))
    );
    articleTimestamps.push(...timestamps);

    // Click "More" to load the next set of articles, if needed
    if (articleTimestamps.length < 100) {
      await page.click("a.morelink");
      // Wait for new articles
      await page.waitForTimeout(1000);
    }
  } while (articleTimestamps.length < 100);

  // Limit to the first 100 timestamps if more than 100 were loaded
  articleTimestamps = articleTimestamps.slice(0, 100);

  // Extract timestamps to Date objects for sorting check
  const articleDates = articleTimestamps.map((timestamp) => {
    let seconds = timestamp.split(' ')[1];
    return +seconds;
  });

  // Check if articles are sorted from newest to oldest
  for (let i = 0; i < articleDates.length - 1; i++) {
    expect(articleDates[i]).toBeGreaterThanOrEqual(articleDates[i + 1]);
  }

  console.log('Sorting - Passed')

  await browser.close();
}

(async () => {
  await sortHackerNewsArticles();
})();

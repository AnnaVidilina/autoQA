1 Install node modules by running `npm i`.

Our goal is to create a script which verifies that the first 100 articles on Hacker News are sorted by date from newest to oldest. The script collects timestamps for articles by scrolling and clicking 'More' until we have 100 timestamps.
Next, we convert these timestamps into numeric values, which makes it easy to check their order. Using expect, we loop through each timestamp to verify that each one is equal to or newer than the next. If this condition is met, it confirms that the articles are sorted correctly, and the script logs 'Sorting - Passed' to the console. 



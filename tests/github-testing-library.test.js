/**
 * Provided example by JEST-PLAYWRIGHT,
 * rewritten as TESTING-LIBRARY recommendations
 * https://github.com/playwright-community/playwright-jest-examples/blob/master/basic/tests/github.test.js
 *
 * What a cocktail 🍹
 *
 * JEST ......................... https://jestjs.io/docs/en/api
 * JEST-DOM ..................... https://github.com/testing-library/jest-dom
 * PLAYWRIGHT ................... https://playwright.dev/#?path=docs/api.md
 * JEST-PLAYWRIGHT .............. https://github.com/playwright-community/jest-playwright
 * |- EXPECT-PLAYWRIGHT ......... https://github.com/playwright-community/expect-playwright
 * TESTING-LIBRARY .............. https://testing-library.com/docs/intro
 * PLAYWRIGHT-TESTING-LIBRARY ... https://github.com/hoverinc/playwright-testing-library
 *
 * **/

const {getDocument, queries} = require('playwright-testing-library')
const {findByPlaceholderText, findByRole} = queries

describe("GitHub", ()=> {
  it("should show the microsoft/Playwright project in the search if you search for Playwright", async()=> {
    await page.goto("https://github.com");
    const $homePage = await getDocument(page);
    const $searchField = await findByPlaceholderText($homePage, 'search',{ exact: false });
    await $searchField.type("Playwright");
    await $searchField.press("Enter");

    // Following statements fails:
    //
    // const $resultsDocument = await getDocument(page); Needed?
    // await findByText($resultsDocument, "microsoft/playwright", { exact: false });
    //
    // Evaluation failed: Error: Unable to find an element with the text: microsoft/playwright.
    // This could be because the text is broken up by multiple elements.
    // In this case, you can provide a function for your text matcher to make your matcher more flexible.
    //
    // https://github.com/testing-library/dom-testing-library/issues/410
    // Solved by using findByRole

    // Solved by using Playwright
    // await expect(page).toHaveText(".repo-list a", "microsoft/playwright");

    // Solved by using findByRole
    const $searchPage = await getDocument(page);
    await findByRole($searchPage, "link", { name: "microsoft/playwright" });
  })

  it("should contain 'Playwright' in the project title", async () => {
    const $searchPage = await getDocument(page);
    const $repoLink = await findByRole($searchPage, "link", { name: "microsoft/playwright" });
    await $repoLink.click();
    await expect(page).toHaveText("#readme h1", "Playwright");
  })

  it("should contain a tab nav as expected", async () => {
    const $tabNav = await page.$('.js-repo-nav')
    const tabNavHtml = await $tabNav.innerHTML()
    expect(tabNavHtml).toMatchSnapshot()
  })
})
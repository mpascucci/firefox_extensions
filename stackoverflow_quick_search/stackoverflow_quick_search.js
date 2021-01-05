/* Wikipedia quick search add-on extension for Firefox
 *
 * Allows quick searching wikipedia from the address bar
 *
 * Usage:
 * 	defalt search: wik <search string>
 * 	languge specification: wik [-it|en|fr...] <search string>
 */

browser.omnibox.setDefaultSuggestion({
  description: "Search Stackoverflow"
});

browser.omnibox.onInputEntered.addListener(
  (textinput, disposition) => {
    console.log("Input");
    var url;
    // replace whitespaces with '+'
    textinput = textinput.replace(/\s+/g, "+");
    url = `https://stackoverflow.com/search?q=${textinput}`;

    // open the search page
    switch (disposition) {
      case "currentTab":
        browser.tabs.update({ url });
        break;
      case "newForegroundTab":
        browser.tabs.create({ url });
        break;
      case "newBackgroundTab":
        browser.tabs.create({ url, active: false });
        break;
    }
  }
);
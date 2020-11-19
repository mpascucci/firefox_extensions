/* Wikipedia quick search add-on extension for Firefox
 *
 * Allows quick searching wikipedia from the address bar
 *
 * Usage:
 * 	defalt search: wik <search string>
 * 	languge specification: wik [-it|en|fr...] <search string>
 */

browser.omnibox.setDefaultSuggestion({
  description: "Search Wikipedia"
});

/* Parse omnibox user input */
function parseUserInput(input) {
  var language;
  var split_input = input.split(" ", 2);
  if ((split_input.length == 2) && (split_input[0].startsWith('-'))) {
    language = split_input[0].slice(1, 3);
    input = split_input[1];
  }
  return { language: language, text: input };
}

browser.omnibox.onInputEntered.addListener((input, disposition) => {
  var url;
  var pinput = parseUserInput(input);
  browser.storage.sync.get("lang").then((item) => {

    if (typeof pinput.language == 'undefined') {
      // use extension setting value if the user did not specify a language.
      pinput.language = item.lang;
    }

    url = `https://${pinput.language}.wikipedia.org/wiki/${pinput.text}`;

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
  },
    (error) => {
      console.log(`Error: ${error}`);
    }
  );
  
  });

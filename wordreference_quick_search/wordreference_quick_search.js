/* Wordreference quick search add-on extension for Firefox
 *
 * Allows quick searching wordreference from the address bar
 *
 * Usage (in the address bar):
 * 	wr -[from][to] <search string>
 *      
 *      [from][to] are two letter language codes (e.g. "en" for english)
 *      this parameters allow to override the application settings
 *      which are used as default values otherwise.
 */

browser.omnibox.setDefaultSuggestion({
  description: "Search WordReference"
});

/* Parse omnibox user input */
function parseUserInput(input) {
  var language;
  var split_input = input.split(" ",2);
  // detect option starting with minus
  if ((split_input.length==2) && (split_input[0].startsWith('-'))) {
    // detect language options
    language = {
      from: split_input[0].slice(1,3),
      to: split_input[0].slice(3,5)
    };
    input = split_input[1];
  }; 
  return {language:language, text:input};
}

browser.omnibox.onInputEntered.addListener((input, disposition) => {
    browser.storage.sync.get(["langFrom","langTo"]).then( (item) =>  {
        var langFrom = item.langFrom;
        var langTo = item.langTo;
 
        // chech if user specified parameters in the omnibox.
        // in this case override the extension settings.
       params = parseUserInput(input);
        if (params.language) {
            if (params.language.from) {
              langFrom = params.language.from;
              if (params.language.to) {
                langTo = params.language.to;
              }
            } else {
              // reverse the default translation if the user
              // put a minus sign without language specification
              langFrom = item.langTo;
              langTo = item.langFrom;
            }
          input = params.text;
        }

        var url = `https://www.wordreference.com/${langFrom}${langTo}/${input}`;
        switch (disposition) {
          case "currentTab":
            browser.tabs.update({url});
          break;
          case "newForegroundTab":
            browser.tabs.create({url});
            break;
          case "newBackgroundTab":
            browser.tabs.create({url, active: false});
          break;
        }
      },
      (error) => {
      console.log(`Error: ${error}`); 
    }
  );
});

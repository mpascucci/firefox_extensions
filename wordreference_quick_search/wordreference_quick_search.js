/* Wordreferencei quick search add-on extension for Firefox
 *
 * Allows quick searching wordreference from the address bar
 *
 * Usage:
 * 	defalt search: wr <search string>
 */

browser.omnibox.setDefaultSuggestion({
  description: "Search WordReference"
});

console.log("base level");

browser.omnibox.onInputEntered.addListener((input, disposition) => {
  console.log("ciccio");
  browser.storage.sync.get(["langFrom","langTo"]).then( (item) =>  {
        var url = `https://www.wordreference.com/${item.langFrom}${item.langTo}/${input}`;
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

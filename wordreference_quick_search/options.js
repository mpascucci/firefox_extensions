function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    langFrom: document.querySelector("#langFrom").value,
    langTo: document.querySelector("#langTo").value
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#langFrom").value = result.langFrom || "en";
    document.querySelector("#langTo").value = result.langTo || "it";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get(["langFrom","langTo"]);
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

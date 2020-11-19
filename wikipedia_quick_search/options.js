function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    lang: document.querySelector("#lang").value,
  });
}

function restoreOptions() {

  function setCurrentChoice(result) {
    document.querySelector("#lang").value = result.lang || "en";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  let getting = browser.storage.sync.get("lang");
  getting.then(setCurrentChoice, onError);
}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);

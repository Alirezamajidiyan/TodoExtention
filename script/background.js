chrome.runtime.onInstalled.addListener(function() {
  console.log("Extension installed and ready!");
});

chrome.commands.onCommand.addListener(function (command) {
  if (command === "add-task") {
      if (chrome.action) {
          chrome.action.openPopup();  // For Chrome
      } else if (browser.action) {
          browser.action.openPopup(); // For Firefox
      }
  }
});

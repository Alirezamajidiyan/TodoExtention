chrome.runtime.onInstalled.addListener(() => {
  console.log("Extension installed and commands registered");
});

chrome.commands.onCommand.addListener((command) => {
  switch (command) {
    case "open_popup":
      chrome.action.openPopup();
      break;
    case "open_about":
      chrome.runtime.openOptionsPage();
      break;
    default:
      console.log("Unknown command");
  }
});

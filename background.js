chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "showPopup") {
        chrome.action.openPopup(); // Opens the popup UI
    }
});

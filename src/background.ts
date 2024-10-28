// background.ts

// Listen for extension icon clicks
chrome.action.onClicked.addListener((tab) => {
  if (tab.id) {
    chrome.tabs.sendMessage(tab.id, { action: "toggleHighlighting" });
  }
});

// Monitor tab updates and check for `reverse=true` in the URL
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    const isReverse = tab.url.includes("reverse=true");
    chrome.tabs.sendMessage(tabId, { action: "updateHighlighting", isReverse });
  }
});

// Storage helper to store captured elements by URL
function storeCapturedElements(url: string, data: { links: any[], buttons: any[] }) {
  chrome.storage.local.get("capturedElements", (result) => {
    const capturedElements = result.capturedElements || {};
    capturedElements[url] = data;
    chrome.storage.local.set({ capturedElements });
  });
}

// Listener to receive captured elements from content script
chrome.runtime.onMessage.addListener((message, sender) => {
  if (message.type === "CAPTURED_ELEMENTS" && sender.tab && sender.tab.url) {
    storeCapturedElements(sender.tab.url, message.data);
  }
});

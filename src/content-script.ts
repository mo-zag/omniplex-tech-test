// content.ts

// Function to capture elements on the page and send them to the background
function captureElements() {
  const links = Array.from(document.querySelectorAll("a")).map((link) => ({
    tagName: link.tagName,
    href: link.getAttribute("href") || "",
  }));

  const buttons = Array.from(document.querySelectorAll("button, input[type='button'], input[type='submit']")).map((button) => ({
    tagName: button.tagName,
    text: button.innerText || button.getAttribute("value") || "",
  }));

  // Send captured data to background script
  chrome.runtime.sendMessage({
    type: "CAPTURED_ELEMENTS",
    data: { links, buttons },
  });
}

// Function to highlight elements based on isReverse flag
function highlightElements(isReverse = false) {
  const links = document.querySelectorAll("a");
  const buttons = document.querySelectorAll("button, input[type='button'], input[type='submit']");

  // Apply colors based on isReverse flag
  links.forEach((link) => {
    (link as HTMLElement).style.outline = isReverse ? "2px solid blue" : "2px solid orange";
  });

  buttons.forEach((button) => {
    (button as HTMLElement).style.outline = isReverse ? "2px solid orange" : "2px solid blue";
  });
}

// Toggle function for highlighting when icon is clicked
let isHighlightingEnabled = false;
function toggleHighlighting(isReverse: boolean) {
  isHighlightingEnabled = !isHighlightingEnabled;
  if (isHighlightingEnabled) {
    highlightElements(isReverse);
    captureElements(); // Capture elements when highlighting is enabled
  } else {
    clearHighlighting();
  }
}

// Clear all highlights
function clearHighlighting() {
  const elements = document.querySelectorAll("a, button, input[type='button'], input[type='submit']");
  elements.forEach((el) => (el as HTMLElement).style.outline = "");
}

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message: { action: string; isReverse: boolean | undefined; }) => {
  if (message.action === "toggleHighlighting") {
    const isReverse = window.location.href.includes("reverse=true");
    toggleHighlighting(isReverse);
  } else if (message.action === "updateHighlighting") {
    if (isHighlightingEnabled) {
      highlightElements(message.isReverse);
    }
  }
});

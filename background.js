// Function to update the badge on the extension's action icon
function updateBadgeForTab(tabId, url) {
  if (!url) return;
  try {
    const urlObj = new URL(url);
    // Create a pattern from the tab's origin.
    const pattern = urlObj.origin + "/*";
    chrome.contentSettings.javascript.get({ primaryUrl: url }, (details) => {
      // Set the badge text: "ON" if JS is allowed, "OFF" if blocked.
      const badgeText = details.setting === "allow" ? "ON" : "OFF";
      chrome.action.setBadgeText({ text: badgeText, tabId: tabId });
      // Use green for allowed, red for blocked.
      const badgeColor = details.setting === "allow" ? "#0F0" : "#F00";
      chrome.action.setBadgeBackgroundColor({
        color: badgeColor,
        tabId: tabId,
      });
    });
  } catch (e) {
    console.error("Error updating badge:", e);
  }
}

// Function to toggle the JavaScript setting for a given tab.
function toggleJSForTab(tab) {
  if (!tab || !tab.url) return;
  try {
    const urlObj = new URL(tab.url);
    const pattern = urlObj.origin + "/*";

    chrome.contentSettings.javascript.get(
      { primaryUrl: tab.url },
      (details) => {
        // Toggle: if currently allowed, block it; if blocked, allow it.
        const newSetting = details.setting === "allow" ? "block" : "allow";

        chrome.contentSettings.javascript.set(
          {
            primaryPattern: pattern,
            setting: newSetting,
          },
          () => {
            console.log(`JavaScript set to '${newSetting}' for ${pattern}.`);
            // Update the badge to reflect the new state.
            const badgeText = newSetting === "allow" ? "ON" : "OFF";
            const badgeColor = newSetting === "allow" ? "#0F0" : "#F00";
            chrome.action.setBadgeText({ text: badgeText, tabId: tab.id });
            chrome.action.setBadgeBackgroundColor({
              color: badgeColor,
              tabId: tab.id,
            });
            // Reload the tab so the new setting takes effect.
            chrome.tabs.reload(tab.id);
          },
        );
      },
    );
  } catch (e) {
    console.error("Error toggling JavaScript:", e);
  }
}

// Listen for the keyboard command.
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-javascript") {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs && tabs.length > 0) {
        toggleJSForTab(tabs[0]);
      }
    });
  }
});

// Listen for clicks on the extension icon.
chrome.action.onClicked.addListener((tab) => {
  toggleJSForTab(tab);
});

// Update the badge when a tab is activated.
chrome.tabs.onActivated.addListener((activeInfo) => {
  chrome.tabs.get(activeInfo.tabId, (tab) => {
    updateBadgeForTab(tab.id, tab.url);
  });
});

// Update the badge when a tab is updated.
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    updateBadgeForTab(tabId, tab.url);
  }
});

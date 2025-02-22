// Listen for the command defined in the manifest.
chrome.commands.onCommand.addListener((command) => {
  if (command === "toggle-javascript") {
    // Query the active tab in the current window.
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (!tabs || tabs.length === 0) return;
      const tab = tabs[0];

      try {
        const urlObj = new URL(tab.url);
        // Create a primary pattern like "https://example.com/*"
        const pattern = urlObj.origin + "/*";

        // Get the current JavaScript setting for this site.
        chrome.contentSettings.javascript.get(
          { primaryUrl: tab.url },
          (details) => {
            // Toggle the setting: if currently allowed, block it; otherwise allow.
            const newSetting = details.setting === "allow" ? "block" : "allow";

            chrome.contentSettings.javascript.set(
              {
                primaryPattern: pattern,
                setting: newSetting,
              },
              () => {
                console.log(
                  `JavaScript is now set to '${newSetting}' for ${pattern}.`,
                );
                // Optionally reload the tab so the new setting takes effect.
                chrome.tabs.reload(tab.id);
              },
            );
          },
        );
      } catch (e) {
        console.error("Error parsing URL: ", e);
      }
    });
  }
});

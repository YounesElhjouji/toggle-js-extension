# Toggle JavaScript

Toggle JavaScript is a Chrome extension that allows you to easily enable or disable JavaScript on the current site. It provides both a keyboard shortcut and a toolbar button to toggle the setting. The extension also displays a badge on the icon indicating whether JavaScript is enabled (ON) or disabled (OFF) for the site.

## Features

- **Quick Toggle:**  
  Toggle JavaScript on the active tab using a keyboard shortcut (Ctrl/Command+J) or by clicking the toolbar button.
- **Visual Feedback:**  
  The extension badge displays "ON" (green) when JavaScript is enabled and "OFF" (red) when disabled.
- **Easy Debugging:**  
  Perfect for developers working with server-side rendered (SSR) and client-side components who need to quickly test behavior with JavaScript enabled or disabled.

## Installation

1. **Clone or Download the Repo:**

   ```bash
   git clone https://github.com/yourusername/toggle-js-extension.git
   cd toggle-js-extension
   ```

2. **Prepare the Extension Folder:**

   Ensure the folder has the following structure:

   ```
   toggle-js-extension/
   ├── manifest.json
   ├── background.js
   └── icons/
       ├── icon16.png
       └── icon32.png
   ```

   _Note: Replace the icon files with your own or free icons as needed._

3. **Load the Extension in Chrome:**

   - Open Chrome and navigate to `chrome://extensions`.
   - Enable **Developer mode** (toggle at the top-right).
   - Click **Load unpacked** and select the `toggle-js-extension` folder.

4. **Set the Keyboard Shortcut:**

   Although the manifest suggests the shortcut Ctrl/Command+J, you may need to verify or reassign it manually:

   - Go to `chrome://extensions/shortcuts`
   - Locate the **Toggle JavaScript** extension and ensure the shortcut is set to **Ctrl+J** (or **Command+J** on macOS).

## Usage

- **Keyboard Shortcut:**
  Press **Ctrl/Command+J** on any compatible website to toggle JavaScript on or off.

- **Toolbar Icon:**
  Click the extension icon to toggle JavaScript. The badge on the icon will update to show the current state:
  - **ON (green):** JavaScript is enabled.
  - **OFF (red):** JavaScript is disabled.

_Note: The extension uses the `chrome.contentSettings` API, which may not work on certain internal pages (e.g., `chrome://` pages) or file URLs._

## Troubleshooting

- **Shortcut Not Working:**
  If the keyboard shortcut doesn’t work, check for conflicts:

  - Visit `chrome://extensions/shortcuts` and verify the shortcut.
  - Ensure no other extension or Chrome feature is using Ctrl/Command+J.

- **No Badge Display:**
  If the badge does not update:

  - Confirm that you are on a site where content settings can be changed.
  - Reload the extension after making any changes.

- **JavaScript Toggle Issues:**
  The extension may not affect pages where Chrome policies restrict changes. Test on a standard HTTPS website (e.g., [https://www.example.com](https://www.example.com)).

## Contributing

Feel free to fork the repository and submit pull requests. Any contributions, suggestions, or bug fixes are welcome!

## License

This project is licensed under the [MIT License](LICENSE).

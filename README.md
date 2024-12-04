# PrivAI - Privacy Policy & Terms Simplifier

PrivAI is a Chrome extension powered by Gemini AI that helps users understand online privacy policies, terms, and conditions. It provides concise summaries, highlights key points, and helps users make informed decisions about what they agree to online.

---

## Features
- **Real-Time Detection**: Automatically detects and highlights links to privacy policies, terms of service, and similar documents on any webpage.
- **Scrim Pop-Up**: Displays a custom-designed overlay that provides an easy-to-read summary of the detected document.
- **AI-Powered Summarization**: Uses Gemini AI to generate clear, concise explanations of complex legal jargon.
- **Interactive Markdown View**: Presents detailed summaries in markdown format for clarity and accessibility.
- **Seamless User Experience**: Designed to be non-intrusive and visually appealing, ensuring users can quickly access the information they need.

---

## Installation
1. Clone or download this repository.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable "Developer mode" (toggle in the top-right corner).
4. Click "Load unpacked" and select the folder containing this project.
5. The extension should now appear in your browser toolbar.

---

## Usage
1. Navigate to any webpage.
2. When a privacy policy, terms of service, or related document is detected, a scrim will appear summarizing the content.
3. Read the summarized text or access a markdown-rendered version for more details.
4. Make informed decisions about your data privacy.

---

## Technologies Used
- **Languages**: JavaScript, HTML, CSS
- **Frameworks**: None (pure JavaScript)
- **APIs**: Gemini AI API for text summarization
- **Libraries**:
  - [Showdown.js](https://github.com/showdownjs/showdown) for markdown rendering
  - [Custom CSS Loader](https://loading.io/) for typing animations

---

## Files and Structure
- **manifest.json**: Configuration file for the Chrome extension.
- **content.js**: Main script to detect policies and manage the scrim.
- **background.js**: Handles background tasks (optional, not currently used).
- **popup.html**: Settings and controls for the extension.
- **styles.css**: Custom styles for scrims and pop-ups.

---

## Contributing
We welcome contributions! Please:
1. Fork the repository.
2. Create a new branch for your feature/fix.
3. Commit and push your changes.
4. Open a pull request with a detailed explanation.

---

## License
This project is licensed under the MIT License. See the LICENSE file for details.


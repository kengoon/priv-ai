// Keywords to search for
const keywords = ["privacy policy", "terms of service", "terms and conditions", "data usage", "user agreement"];

// Check the page content
const bodyText = document.body.innerText.toLowerCase();
const found = keywords.some(keyword => bodyText.includes(keyword));

// if (found) {
//   // Send a message to the background script
//   chrome.runtime.sendMessage({ action: "showPopup" });
// }

function showScrim() {
  // Create scrim
  const scrim = document.createElement("div");
  scrim.id = "privai-scrim";
  scrim.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.7);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
  `;

  // Create popup container
  const popup = document.createElement("div");
  popup.id = "privai-popup";
  popup.style.cssText = `
      background-color: white;
      border-radius: 8px;
      padding: 20px;
      width: 90%;
      max-width: 400px;
      text-align: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
      font-family: Arial, sans-serif;
  `;

  // Add popup content
  popup.innerHTML = `
      <h2 style="margin-bottom: 15px;">Privacy Alert</h2>
      <p style="margin-bottom: 20px; font-size: 14px; color: #333;">
          This page contains privacy-related policies or terms. Please review them carefully.
      </p>
      <button id="privai-dismiss-btn" style="
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
      ">I Understand</button>
  `;

  // Append popup to scrim
  scrim.appendChild(popup);

  // Append scrim to body
  document.body.appendChild(scrim);

  // Add event listener to dismiss button
  const dismissButton = document.getElementById("privai-dismiss-btn");
  dismissButton.addEventListener("click", () => {
      scrim.remove();
  });
}

// Main detection logic
if (found) {
  showScrim();
}

// Keywords to search for
const keywords = [
    "privacy policy",
    "terms of service",
    "terms and conditions",
    // "data usage",
    // "user agreement",
    // "terms", 
    // "conditions", 
    // "privacy", 
    // "policy", 
    // "legal", 
    // "cookies", 
    // "disclaimer"
];

// Function to check if a URL or link text matches the keywords
const bodyText = document.body.innerHTML.toLowerCase();
const found = keywords.some(keyword => bodyText.includes(keyword));

const matchesKeywords = (text) => {
    return bodyText.includes(text);
};

const foundKeywords = keywords.filter(keyword => {
    return matchesKeywords(keyword)
})

// Extract all links from the current page
// const links = Array.from(document.querySelectorAll("a"));

// Filter links that match the keywords
// const legalLinks = links.filter(link => {
//     const href = link.href || "";
//     const text = link.textContent || "";
//     return matchesKeywords(text); // matchesKeywords(href) //|| matchesKeywords(text);
// });

// const fetchLinkContent = async (url) => {
//     try {
//         const response = await fetch(url);
//         if (!response.ok) {
//             throw new Error(`Failed to fetch URL: ${url}, Status: ${response.status}`);
//         }
//         const html = await response.text();
//         // const parser = new DOMParser();
//         // const doc = parser.parseFromString(html, "text/html");
//         // const bodyText = doc.body.innerText;

//         console.log(`Content of ${url}:\n`, html);
//     } catch (error) {
//         console.error(`Error fetching content for ${url}:`, error);
//     }
// };

// Display the results
// if (legalLinks.length > 0) {
//     console.log("Detected Legal Document Links:");
//     legalLinks.forEach(async link => {
//         console.log(`Text: ${link.textContent.trim()} | URL: ${link.href}`);
//         await fetchLinkContent(link.href);
//     });

//     // Optionally display links in an alert (commented out for larger lists)
//     // alert(`Detected ${legalLinks.length} legal document links. Check console for details.`);
// } else {
//     console.log("No legal document links found on this page.");
// }


// Check the page content
// const bodyText = document.body.innerText.toLowerCase();
// const found = keywords.some(keyword => bodyText.includes(keyword));
// console.log(document.documentElement.outerHTML)

// if (found) {
//   // Send a message to the background script
//   chrome.runtime.sendMessage({ action: "showPopup" });
// }

// Function to create a typing loader effect
function createTypingLoader() {
    const dots = document.createElement("div");
    dots.id = "typing-loader";
    dots.style.cssText = `
        display: inline-block;
        font-size: 86px;
        margin-top: 10px;
    `;

    // Add a "..." animation effect
    let dotCount = 0;
    setInterval(() => {
        dotCount = (dotCount + 1) % 4; // Cycles between 0, 1, 2, 3
        dots.textContent = ".".repeat(dotCount);
    }, 500);

    return dots;
}

async function showScrim() {
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
      
    `;

    // Append typing loader
    const loader = createTypingLoader();
    popup.appendChild(loader);

    // Append popup to scrim
    scrim.appendChild(popup);

    // Append scrim to body
    document.body.appendChild(scrim);

    console.log("clicke I understand")
    const { available, defaultTemperature, defaultTopK, maxTopK } = await ai.languageModel.capabilities();
    if (available !== "no") {
        console.log("available")
        const session = await ai.languageModel.create({
            systemPrompt: `You are an ai assitant, specialised in summarizing 
        legal and technical document in a concise, easy to understand, and very very short summaries. 
        Your task is to analyze long and complex texts. such as privacy policies, terms of service, and 
        cookie statements, and generate a summary that includes: 1) Key takeawyas: highlight the most 
        critical poins, such as user rights, data usage, obligation, and restrictions. 2) Potential Risks: 
        Mention any risks or implications users should be aware of (e.g, data sharing or cancellation policies).
        3) Simplified Language: Rewrite complext terms in plain English, avoiding legal or technical jargons. 4) 
        Structure: Organize the summary in a logical, readable format, like numbered points or categorized sections. 
        5) User Guidance: Provide any recommendations or warnings based on the document's content, if applicable.
        You have the ability to know name of a url.

        Focus on delivering value to users by ensuring clarity, neutrality, and brevity in your response. Keep it very very short.
        `
        });
        console.log("will say hi")
        const url = window.location.href;
        const result = await session.prompt(`
        Summarize ${url} ${foundKeywords.toString()}
    `);
        console.log(result)
        // Convert Markdown to HTML
        const converter = new showdown.Converter();
        const htmlContent = converter.makeHtml(result);
        popup.innerHTML = htmlContent + `<button id="privai-dismiss-btn" style="
          background-color: #007BFF;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px 20px;
          font-size: 14px;
          cursor: pointer;
      ">Dismiss</button>`;
    }

    // Simulate processing and auto-remove the scrim
    // setTimeout(() => {
    //     scrim.remove();
    // }, 5000); // Adjust the timeout as needed (5 seconds here)

    // Add event listener to dismiss button
    const dismissButton = document.getElementById("privai-dismiss-btn");
    dismissButton.addEventListener("click", async () => {
        console.log("clicke I understand")
        scrim.remove();
    });
}

// Main detection logic
if (found) {
    console.log(foundKeywords.toString())
    showScrim();
}

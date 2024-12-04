(() => {
    // Keywords to identify legal document URLs
    const keywords = [
        "terms", 
        "conditions", 
        "privacy", 
        "policy", 
        "legal", 
        "cookies", 
        "disclaimer"
    ];

    // Function to check if a URL or link text matches the keywords
    const matchesKeywords = (text) => {
        return keywords.some(keyword => text.toLowerCase().includes(keyword));
    };

    // Extract all links from the current page
    const links = Array.from(document.querySelectorAll("a"));

    // Filter links that match the keywords
    const legalLinks = links.filter(link => {
        const href = link.href || "";
        const text = link.textContent || "";
        return matchesKeywords(href) || matchesKeywords(text);
    });

    // Display the results
    if (legalLinks.length > 0) {
        console.log("Detected Legal Document Links:");
        legalLinks.forEach(link => {
            console.log(`Text: ${link.textContent.trim()} | URL: ${link.href}`);
        });

        // Optionally display links in an alert (commented out for larger lists)
        // alert(`Detected ${legalLinks.length} legal document links. Check console for details.`);
    } else {
        console.log("No legal document links found on this page.");
    }
})();

(async () => {
    // Function to fetch and read the content of a URL
    const fetchLinkContent = async (url) => {
        try {
            // Fetch the URL content
            const response = await fetch(url);

            // Ensure the request was successful
            if (!response.ok) {
                throw new Error(`Failed to fetch URL: ${url}, Status: ${response.status}`);
            }

            // Parse the HTML content as text
            const html = await response.text();

            // Create a temporary DOM to parse the HTML content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            // Extract all visible text content from the page
            const bodyText = doc.body.innerText;

            console.log(`Content of ${url}:\n`, bodyText);
        } catch (error) {
            console.error(`Error fetching content for ${url}:`, error);
        }
    };

    // Example usage
    const linksToRead = [
        "https://example.com/privacy-policy",
        "https://example.com/terms-of-service"
    ];

    for (const url of linksToRead) {
        await fetchLinkContent(url);
    }
})();

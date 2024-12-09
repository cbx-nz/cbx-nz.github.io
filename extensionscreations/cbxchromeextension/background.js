  // This script handles the URL redirection logic.

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Define a mapping of search phrases or URLs to their redirection URLs.
      const redirectMap = {
        "govt.cbx": "https://cbgames-xyz.vercel.app/government",
        "index.cbx": "https://cbgames-xyz.vercel.app/index.html",
        "gasandshenanigans.cbx": "https://cbgames-xyz.vercel.app/nbtf-faction/index.html"
      };
  
      // Extract the URL or search phrase from the request.
      const currentUrl = details.url;
  
      // Iterate over the redirect map to find matching phrases or URLs.
      for (const [key, value] of Object.entries(redirectMap)) {
        if (currentUrl.includes(key)) {
          return { redirectUrl: value };
        }
      }
    },
    { urls: ["<all_urls>"] }, // Listens to all URLs, can be restricted.
    ["blocking"] // Makes the request blocking to perform the redirection.
  );
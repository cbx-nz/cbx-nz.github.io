// This script handles the URL redirection logic.

chrome.webRequest.onBeforeRequest.addListener(
    function(details) {
      // Define a mapping of target URLs to their redirection URLs.
      const redirectMap = {
        "govt.cbx": "https://cbgames-xyz.vercel.app/government",
        "index.cbx": "https://cbgames-xyz.vercel.app/index.html",
        "gasandshenanigans.cbx": "https://cbgames-xyz.vercel.app/nbtf-faction/index.html"
      };
  
      // Check if the current request URL is in the redirect map.
      if (redirectMap[details.url]) {
        return { redirectUrl: redirectMap[details.url] };
      }
    },
    { urls: ["<all_urls>"] }, // Listens to all URLs, can be restricted.
    ["blocking"] // Makes the request blocking to perform the redirection.
  );
chrome.webNavigation.onHistoryStateUpdated.addListener((data) => {
  const { url } = data;
  if (url.includes("youtube.com/watch")) {
    const videoId = new URLSearchParams(new URL(url).search).get("v");
    console.log(videoId);
    if (videoId) {
      chrome.tabs.sendMessage(
        data.tabId,
        { type: "NEW", videoId },
        { extensionId: chrome.runtime.id }
      );
    }
  }
});

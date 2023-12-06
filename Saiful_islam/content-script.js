let youtubeLeftControls, youtubePlayer;
let currentVideo = "";
let currentVideoBookmarks = [];

console.log("hi");

const fetchBookmarks = () => {
  return new Promise((resolve) => {
    if (chrome.runtime && !chrome.runtime.lastError) {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    } else {
      resolve([]);
      console.error("Something went wrong.");
    }
  });
};

const addNewBookmarkEventHandler = async () => {
  const currentTime = youtubePlayer.currentTime;
  const newBookmark = {
    time: currentTime,
    desc: `Bookmark at ${getTime(currentTime)}`,
  };

  currentVideoBookmarks = await fetchBookmarks();

  chrome.storage.sync.set({
    [currentVideo]: JSON.stringify(
      [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
    ),
  });

  chrome.runtime.sendMessage({ type: "NEW" });
};

const newVideoLoaded = async () => {
  console.log("newVideoLoaded called");
  youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
  youtubePlayer = document.getElementsByClassName("video-stream")[0];

  if (youtubeLeftControls && youtubePlayer) {
    currentVideoBookmarks = await fetchBookmarks();
    const bookmarkBtnExists =
      document.getElementsByClassName("bookmark-btn")[0];

    if (!bookmarkBtnExists) {
      const bookmarkBtn = document.createElement("img");

      bookmarkBtn.src = chrome.runtime.getURL("icons/bookmark.png");
      bookmarkBtn.className = "ytp-button " + "bookmark-btn";
      bookmarkBtn.title = "Click to bookmark current timestamp";

      youtubeLeftControls.appendChild(bookmarkBtn);
      bookmarkBtn.addEventListener("click", addNewBookmarkEventHandler);

      return true;
    } else {
      return false;
    }
  }

  return false;
};

const init = async () => {
  console.log("init called");
  return newVideoLoaded();
};

chrome.runtime.onMessage.addListener(async (obj, sender, sendResponse) => {
  console.log("Message received:", obj);
  const { type, value, videoId } = obj;

  if (type === "NEW") {
    currentVideo = videoId;
    const result = await init();
    sendResponse(result); // Use sendResponse to send a response back to the sender
  } else if (type === "PLAY") {
    youtubePlayer.currentTime = value;
  } else if (type === "DELETE") {
    const bookmarkTime = parseFloat(value);
    currentVideoBookmarks = currentVideoBookmarks.filter(
      (b) => b.time !== bookmarkTime
    );
    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(currentVideoBookmarks),
    });
    sendResponse(currentVideoBookmarks); // Use sendResponse to send a response back to the sender
  }
});

const getTime = (t) => {
  const date = new Date(0);
  date.setSeconds(t);
  return date.toISOString().substr(11, 8);
};


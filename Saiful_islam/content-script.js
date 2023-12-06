let youtubeLeftControls, youtubePlayer; // for accessing the Controls & the Player
let currentVideo = "";
let currentVideoBookmarks = [];

const fetchBookmarks = () => {
  return new Promise((resolve) => {
    if (chrome.runtime && !chrome.runtime.lastError) {
      chrome.storage.sync.get([currentVideo], (obj) => {
        resolve(obj[currentVideo] ? JSON.parse(obj[currentVideo]) : []);
      });
    } else {
      console.error("Extension context invalidated.");
      resolve([]);
    }
  });
};

const addNewBookmarkEventHandler = async () => {
  const currentTime = youtubePlayer.currentTime;
  const newBookmark = {
    time: currentTime,
    desc: "Bookmark at " + getTime(currentTime),
  };

  currentVideoBookmarks = await fetchBookmarks();

  chrome.storage.sync.set({
    [currentVideo]: JSON.stringify(
      [...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time)
    ),
  });

};

const checkForPlayer = async () => {
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

      return true; // Bookmark button added
    } else {
      return false; // Bookmark button already exists
    }
  }

  return false; // Bookmark button not added
};

const init = async () => {
  return checkForPlayer();
};

chrome.runtime.onMessage.addListener(async (obj, sender, response) => {
  const { type, value, videoId } = obj;

  if (type === "NEW") {
    currentVideo = videoId;
    response(await init());
  } else if (type === "PLAY") {
    youtubePlayer.currentTime = value;
  } else if (type === "DELETE") {

    currentVideoBookmarks = currentVideoBookmarks.filter((b) => b.time != value);
    chrome.storage.sync.set({
      [currentVideo]: JSON.stringify(currentVideoBookmarks),
    });

    response(currentVideoBookmarks);

  }
});

const getTime = (t) => {
  var date = new Date(0);
  date.setSeconds(t);

  return date.toISOString().substr(11, 8);
};

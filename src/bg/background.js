chrome.extension.onMessage.addListener(
  function (request, sender, sendResponse) {
    sendResponse();
  });

chrome.browserAction.onClicked.addListener(function (activeTab) {
  var newURL = "https://vpn.2bsecure.co.il/hr";
  chrome.tabs.create({ url: newURL });
});

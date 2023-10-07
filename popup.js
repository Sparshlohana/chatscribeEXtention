// Function to send a message to the content script to initiate translation
function translateButtonClick() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }

        const activeTab = tabs[0];

        if (!activeTab) {
            console.error("No active tab found.");
            return;
        }

        const tabId = activeTab?.id;

        // Send a message to the content script to trigger translation
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            function: function () {
                // Send a message to the content script to initiate translation
                chrome?.runtime?.sendMessage({ action: 'translate' });
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('translateButton').addEventListener('click', translateButtonClick);
});
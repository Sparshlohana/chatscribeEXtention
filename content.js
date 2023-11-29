// Function to send a message to the background script and return a Promise
async function sendMessageToBackground(text, sourceLang, targetLang) {
    try {
        const response = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(text));
        if (response.ok) {
            const data = await response.json();
            if (data && data[0] && data[0][0] && data[0][0][0]) {
                // Extract the translated text from the response
                const translatedText = data[0][0][0];
                return translatedText;
            } else {
                return "Translation not available.";
            }
        } else {
            return "Error translating text.";
        }
    } catch (error) {
        console.error('Error translating text:', error);
        return "Error translating text.";
    }
}

// Listen for the right-click event
document.addEventListener('keyup', async (event) => {
    event.preventDefault(); // Prevent the default right-click context menu

    // Check if both the "Ctrl" key and "Enter" key are pressed
    if (event.key === 'Enter' && event.ctrlKey) {
        let selectedText = window.getSelection().toString().trim();
        if (selectedText) {
            try {
                const sourceLang = 'auto'; // You can modify this as needed

                // Dynamically determine the target language based on user preferences or settings
                // For example, you can use chrome.storage to store user preferences.
                const targetLang = 'hi';

                // Send the selected text to the background script for translation
                const translatedText = await sendMessageToBackground(selectedText, sourceLang, targetLang);

                // Replace the selected text with the translated text
                const range = window.getSelection().getRangeAt(0);
                range.deleteContents();
                range.insertNode(document.createTextNode(translatedText));

                // Handle the translated text here if needed
            } catch (error) {
                console.error('Error sending message to background script:', error);
            }
        } else {
            console.log('No text selected for translation.');
        }
    }
});

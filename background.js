// Function to handle translation
async function translateText(text, sourceLang, targetLang) {

    try {
        const response = await fetch("https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + sourceLang + "&tl=" + targetLang + "&dt=t&q=" + encodeURI(text));
        if (response.ok) {
            const data = await response.json();
            if (data && data[0] && data[0][0] && data[0][0][0]) {
                // Extract the translated text from the response
                const translatedText = data[0][0][0];
                return `Translated: ${translatedText}`;
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

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener(async function (request, sender, sendResponse) {
    console.log("hii");
    if (request.text) {
        const textToTranslate = request.text;
        const sourceLang = 'auto'; // You can modify this as needed

        // Dynamically determine the target language based on user preferences or settings
        // For example, you can use chrome.storage to store user preferences.
        const targetLang = 'hi';   // Replace with the actual target language

        // Perform translation
        const translatedText = await translateText(textToTranslate, sourceLang, targetLang);

        // Send the translated text back to the content script
        sendResponse(translatedText);
    }
});

// Function to fetch and display code from tester.html into the textarea
// Function to fetch and display code from tester.html into the textarea
// Function to fetch and display code from the URL provided in data-template-url
function fetchAndDisplayCode() {
    // Retrieve the URL from the data-template-url attribute
    var templateURL = document.getElementById('codeInput').getAttribute('data-template-url');
    fetch(templateURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('codeInput').value = data;
        })
        .catch(err => console.error('Fetch error:', err));
}

document.addEventListener('DOMContentLoaded', fetchAndDisplayCode);

// ... The rest of your existing JavaScript functions like runCode() and copyCode() ...


// Run this function when the document loads to populate the textarea
document.addEventListener('DOMContentLoaded', fetchAndDisplayCode);

function runCode() {
var code = document.getElementById('codeInput').value;
var iframe = document.getElementById('previewFrame');
var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

iframeDoc.open('text/html', 'replace'); // MIME type set to 'text/html'
iframeDoc.write(code);
iframeDoc.close();
}

// Copy to clipboard function remains the same
function copyCode() {
    var copyText = document.getElementById("codeInput");
    navigator.clipboard.writeText(copyText.value).then(function() {
        // Show the copied indicator, etc.
    }, function(err) {
        console.error('Could not copy text: ', err);
    });
}
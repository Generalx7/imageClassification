// Function to handle the upload
function handleUpload(event) {
    // Prevent form submission
    event.preventDefault();
}

const div1 = document.getElementsByClassName('whitecard');
var div = document.getElementById('resultcard');
div.style.display = "none";

document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    var fileInput = document.getElementById('imageFile');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('chooseFile', file);

    fetch('http://localhost:3001/Predict', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            document.title = "Result Received";

            // Extract the result from the JSON data
            const result = data.result; // Use 'result' instead of 'Result'
            if (!result) {
                throw new Error("No result found in the response.");
            }

            // Check if the result is 'unknown skin lesion'
            if (result === 'unknown skin lesion') {
                alert("Image classified as unknown skin lesion");
                document.getElementById('uploadcard').style.display = "block";
                document.getElementById('resultcard').style.display = "none";
                return;
            }

            // Update the DOM with the result
            const resultContainer = document.getElementById('result');
            resultContainer.textContent = result === undefined ? "Image classified as unknown skin lesion" : result;

            console.log(div1);
            document.getElementById('uploadcard').style.display = "none";
            document.getElementById('resultcard').style.display = "block";
        })
        .catch(error => {
            // Update title if there's an error
            document.title = "Please select a photo";
            // Display alert message for the error
            alert("Please select a photo first!");
            console.error('Error:', error);
        });
});

const slides = document.querySelectorAll(".slide");
const uploadButton = document.querySelector(".upload-button");
const activeColor = "rgb(42, 53, 116)";

let currentSlideIndex = 0;

// Function to update button state based on current slide index
function updateButtonState() {
    if (currentSlideIndex === slides.length - 1) {
        uploadButton.style.backgroundColor = activeColor;
        uploadButton.classList.remove("disabled");
        uploadButton.classList.add("active");
    } else {
        uploadButton.style.backgroundColor = "";
        uploadButton.classList.add("disabled");
        uploadButton.classList.remove("active");
    }
}

// Click event listener for each slide
slides.forEach((slide, index) => {
    slide.addEventListener("click", () => {
        currentSlideIndex = index;
        updateButtonState();
    });
});

function refreshPage() {
    location.href = "UploadPage.html";
}

document.addEventListener("DOMContentLoaded", function() {
    // Get the file input element
    const fileInput = document.getElementById('imageFile');
    // Get the file select name element
    const fileSelectName = document.getElementById('noFile');

    // Add event listener to file input
    fileInput.addEventListener('change', function() {
        if (fileInput.files.length > 0) {
            // Get the name of the selected file
            const fileName = fileInput.files[0].name;
            // Update the text to show the file name
            fileSelectName.textContent = fileName;

            // Alternatively, you can display a message indicating successful upload
            // fileSelectName.textContent = 'File successfully uploaded';
        } else {
            // If no file is selected, show default text
            fileSelectName.textContent = 'No photo chosen...';
        }
    });
});

$(window).on('load', function() {
    $(".loader-container").fadeOut(1250);
});

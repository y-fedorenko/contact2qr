"use strict";

// Elements selection
const generateBtn = document.getElementById("generateButton");
const fullName = document.getElementById("fullName");
const phone = document.getElementById("phone");
const email = document.getElementById("email");
const address = document.getElementById("address");
const organization = document.getElementById("organization");
const title = document.getElementById("title");
const allInputs = document.querySelectorAll("input");
const imageContainer = document.querySelector(".image-container");

// QRCode generation 
function createQR() {
  if (!isValid()) return;

  // Generate vCard string
  const vCardData = `BEGIN:VCARD
VERSION:4.0
FN:${fullName.value}
N:${fullName.value.split(" ").reverse().join(";")}
TEL:${phone.value}
EMAIL:${email.value || ""}
ADR:${address.value || ""}
ORG:${organization.value || ""}
TITLE:${title.value || ""}
END:VCARD`;

  // Clear previous QR code
  imageContainer.innerHTML = ""; 

  // Generate QR code
  QRCode.toCanvas(
    document.createElement("canvas"), 
    vCardData.trim(), 
    { width: 300 },
    (error, canvas) => {
      if (error) {
        console.error("QR Code generation error:", error);
        return;
      }
      imageContainer.appendChild(canvas); 
    }
  );
}


// Validation logic
function isValid() {
  let valid = true;

  if (!fullName.value) {
    triggerHighLight(fullName);
    valid = false;
  }
  if (!phone.value) {
    triggerHighLight(phone)
    valid = false;
  }

  return valid;
}

function triggerHighLight(input) {
  input.classList.add('highlight');
  setTimeout(() => {
    input.classList.remove("highlight");
  }, 2000);
}
/*
allInputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (input.classList.contains("highlight")) {
      input.classList.remove("highlight");
    }
  });
}); */

// Event listener for QR code generation
generateBtn.addEventListener("click", createQR);

// Select form elements
const form = document.querySelector(".contact-form-wrap");
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const serviceInput = document.getElementById("service");
const messageInput = document.getElementById("message");
const button = document.querySelector(".contact-btn");

// Event listener
button.addEventListener("click", function (e) {
  e.preventDefault(); // stop page reload

  // Get values
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const service = serviceInput.value;
  const message = messageInput.value.trim();

  // Validation
  if (!name || !email || !service || !message) {
    alert("Please fill in all fields.");
    return;
  }

  if (!validateEmail(email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Create object
  const formData = {
    name,
    email,
    service,
    message,
    date: new Date().toLocaleString(),
  };

  // Save to localStorage
  let submissions = JSON.parse(localStorage.getItem("contacts")) || [];
  submissions.push(formData);
  localStorage.setItem("contacts", JSON.stringify(submissions));

  // Feedback
  alert("Message sent successfully!");

  // Clear form
  form.reset();
});

// Email validation function
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

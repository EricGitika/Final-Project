// ==========================
// SELECT ELEMENTS
// ==========================

const form = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const serviceInput = document.getElementById("service");
const messageInput = document.getElementById("message");

const dataContainer = document.getElementById("data-container");

// ==========================
// LOAD SAVED DATA
// ==========================

document.addEventListener("DOMContentLoaded", displayProjects);

// ==========================
// FORM SUBMISSION
// ==========================

form.addEventListener("submit", function (e) {
  e.preventDefault();

  // clear previous errors
  clearErrors();

  // get values
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const service = serviceInput.value;
  const message = messageInput.value.trim();

  let isValid = true;

  // ==========================
  // VALIDATION
  // ==========================

  if (name === "") {
    showError(nameInput, "Name is required");
    isValid = false;
  }

  if (email === "") {
    showError(emailInput, "Email is required");
    isValid = false;
  } else if (!validateEmail(email)) {
    showError(emailInput, "Enter a valid email");
    isValid = false;
  }

  if (service === "") {
    showError(serviceInput, "Select a service");
    isValid = false;
  }

  if (message === "") {
    showError(messageInput, "Project description required");
    isValid = false;
  }

  // stop if invalid
  if (!isValid) return;

  // ==========================
  // CREATE OBJECT
  // ==========================

  const project = {
    name,
    email,
    service,
    message,
    id: Date.now(),
  };

  // ==========================
  // LOCAL STORAGE
  // ==========================

  let projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.push(project);

  localStorage.setItem("projects", JSON.stringify(projects));

  // ==========================
  // UPDATE DOM
  // ==========================

  addProjectToPage(project);

  // reset form
  form.reset();

  alert("Project submitted successfully!");
});

// ==========================
// DISPLAY PROJECTS
// ==========================

function displayProjects() {
  const projects = JSON.parse(localStorage.getItem("projects")) || [];

  projects.forEach((project) => {
    addProjectToPage(project);
  });
}

// ==========================
// ADD PROJECT TO PAGE
// ==========================

function addProjectToPage(project) {
  const card = document.createElement("div");

  card.classList.add("project-card");

  card.innerHTML = `
  
    <h3>${project.name}</h3>

    <p><strong>Email:</strong> ${project.email}</p>

    <p><strong>Service:</strong> ${project.service}</p>

    <p>${project.message}</p>

  `;

  dataContainer.appendChild(card);
}

// ==========================
// ERROR FUNCTIONS
// ==========================

function showError(input, message) {
  const formGroup = input.parentElement;

  const error = formGroup.querySelector(".error");

  error.textContent = message;
}

function clearErrors() {
  const errors = document.querySelectorAll(".error");

  errors.forEach((error) => {
    error.textContent = "";
  });
}

// ==========================
// EMAIL VALIDATION
// ==========================

function validateEmail(email) {
  return /^[^ ]+@[^ ]+\.[a-z]{2,3}$/i.test(email);
}

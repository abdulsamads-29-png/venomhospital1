/* =========================================================
   Venom Multispecialty Hospital — Script
   MANTRA 2026 Summer School | Frontend Assignment
   ========================================================= */

/* ---------- 0. Email De-obfuscation ---------- */
/* Keeps email addresses out of the raw HTML (harder for spam bots to
   harvest) while still giving real visitors a working mailto link. */
document.querySelectorAll(".email-protect").forEach(function (el) {
  const user = el.getAttribute("data-user");
  const domain = el.getAttribute("data-domain");
  if (!user || !domain) return;
  const email = user + "@" + domain;
  const link = document.createElement("a");
  link.href = "mailto:" + email;
  link.textContent = email;
  el.replaceWith(link);
});

/* ---------- 1. Mobile Navigation Menu ---------- */
const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
if (menuBtn && navLinks) {
  menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");
  });
}

/* ---------- 2. Appointment Form Validation ---------- */
const appointmentForm = document.getElementById("appointmentForm");
if (appointmentForm) {
  appointmentForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const department = document.getElementById("department").value;
    const date = document.getElementById("date").value;
    const formMessage = document.getElementById("formMessage");

    if (name === "" || email === "" || phone === "" || department === "" || date === "") {
      formMessage.style.color = "#d64545";
      formMessage.textContent = "Please fill all required fields.";
      return;
    }

    if (!email.includes("@") || !email.includes(".")) {
      formMessage.style.color = "#d64545";
      formMessage.textContent = "Please enter a valid email address.";
      return;
    }

    if (phone.length !== 10 || isNaN(phone)) {
      formMessage.style.color = "#d64545";
      formMessage.textContent = "Please enter a valid 10-digit mobile number.";
      return;
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const chosenDate = new Date(date);

    if (chosenDate < today) {
      formMessage.style.color = "#d64545";
      formMessage.textContent = "Please choose today's date or a future date.";
      return;
    }

    formMessage.style.color = "#1f9d55";
    formMessage.textContent = "Thank you, " + name + "! Your appointment request has been received. Our front desk will call you to confirm.";
    appointmentForm.reset();
  });
}

/* ---------- 3. Consultation Fee Estimator ---------- */
function calculateFee() {
  const doctorSelect = document.getElementById("doctorSelect");
  const memberCount = document.getElementById("memberCount");
  const feeResult = document.getElementById("feeResult");
  if (!doctorSelect || !memberCount || !feeResult) return;

  const fee = Number(doctorSelect.value);
  const members = Number(memberCount.value);

  if (!doctorSelect.value) {
    feeResult.style.color = "#d64545";
    feeResult.textContent = "Please select a doctor first.";
    return;
  }

  if (members <= 0) {
    feeResult.style.color = "#d64545";
    feeResult.textContent = "Please enter a valid number of family members.";
    return;
  }

  const total = fee * members;
  feeResult.style.color = "#1f9d55";
  feeResult.textContent = "Estimated Consultation Cost: ₹" + total.toLocaleString("en-IN");
}

/* ---------- 4. Gallery Filter ---------- */
function filterGallery(category) {
  const items = document.querySelectorAll(".gallery-item");
  items.forEach(function (item) {
    if (category === "all" || item.classList.contains(category)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

/* ---------- 5. FAQ Accordion Toggle ---------- */
const faqQuestions = document.querySelectorAll(".faq-question");
faqQuestions.forEach(function (question) {
  question.addEventListener("click", function () {
    const item = question.closest(".faq-item");
    const answer = item.querySelector(".faq-answer");
    const isOpen = item.classList.contains("open");

    if (isOpen) {
      item.classList.remove("open");
      answer.style.maxHeight = null;
    } else {
      item.classList.add("open");
      answer.style.maxHeight = answer.scrollHeight + "px";
    }
  });
});

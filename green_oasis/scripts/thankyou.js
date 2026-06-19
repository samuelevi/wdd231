const urlParams = new URLSearchParams(window.location.search);
const display = document.getElementById("data-display");

const fields = {
  fname: "First Name",
  lname: "Last Name",
  email: "Email",
  experience: "Experience",
  message: "Message",
};

let html = "";
urlParams.forEach((value, key) => {
  if (fields[key]) {
    html += `<p><strong>${fields[key]}:</strong> ${value}</p>`;
  }
});
display.innerHTML = html || "<p>No details found.</p>";

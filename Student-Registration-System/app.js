//Student data
let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = null;

//Students function created
function studentsFunction() {
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";
  students.forEach((student, index) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${student.studentRoll}</td>
      <td>${student.name}</td>
      <td>${student.studentId}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td>${student.city}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;
    // Adding the data
    tbody.appendChild(tr);
  });
}

// storage function created
function storage() {
  localStorage.setItem("students", JSON.stringify(students));
}
//input validating
function validateInput(studentRoll,name, studentId, email, contact, city) {
  const name1 = /^[A-Za-z\s]+$/;
  const email1 = /^\S+@\S+\.\S+$/;
  const number1 = /^\d+$/;

  //checking the condition all fields mandatory
  if (!studentRoll || !name || !studentId || !email || !contact || !city) {
    alert("All fields are required!");
    return false;
  }
//added conditon name must be letters
  if (!name1.test(name) || !name1.test(city)) {
    alert("Name & City must contain only letters.");
    return false;
  }
//added condition Roll No, ID and Contact must contain number
  if (!number1.test(studentRoll) || !number1.test(studentId) || !number1.test(contact)) {
    alert("Student Roll, Student ID and Contact must contain only numbers.");
    return false;
  }
// added condition for mail format checking
  if (!email1.test(email)) {
    alert("Invalid email address.");
    return false;
  }

  return true;
}

//adding events using addEventListener
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const studentRoll = document.getElementById("studentRoll").value.trim();
  const name = document.getElementById("name").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const city = document.getElementById("city").value.trim();

  if (!validateInput(studentRoll, name, studentId, email, contact, city)) return;

  const newStudent = { studentRoll,name, studentId, email, contact, city};
//checking condition if index not null then edit otherwise push 
  if (editIndex !== null) {
    students[editIndex] = newStudent;
    editIndex = null;
  } else {
    students.push(newStudent);
  }

  storage();
  studentsFunction();
  this.reset();
});
//edit button functionality
function editStudent(index) {
  const student = students[index];
  document.getElementById("studentRoll").value = student.studentRoll;
  document.getElementById("name").value = student.name;
  document.getElementById("studentId").value = student.studentId;
  document.getElementById("email").value = student.email;
  document.getElementById("contact").value = student.contact;
  document.getElementById("city").value = student.city;
  editIndex = index;
}

//delete button functionality
function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    storage();
    studentsFunction();
  }
}

window.onload = function () {
  studentsFunction();
};

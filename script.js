let wrapper = document.querySelector("#list-wrapper");
let pageWrap = document.querySelector("#page-wrap");
let modals = [];
let buttons;
let closeBtn;
let closeBtnArray;
let openBtns = document.querySelectorAll(".open");
let closedBtns = document.querySelectorAll(".closed");
let dialog = document.querySelector(".dialog");

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOMContentLoaded");
});

function addJSON() {
  const spinner = document.querySelector(".spinner");
  spinner.style.display = "block"; // Display the loading spinner
  fetch("http://127.0.0.1:5501/data.json")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      for (let i = 0; i < data.departments.length; i++) {
        let divWrap = document.createElement("div");
        divWrap.classList.add("lists");
        divWrap.innerHTML += `<div class="popup-btn"><h3>${data.departments[i].name}</h3></div>`;
        wrapper.appendChild(divWrap);

        let theList = document.createElement("ol");
        divWrap.appendChild(theList);

        let courses = data.departments[i].courses;
        for (let index = 0; index < courses.length; index++) {
          let listItem = document.createElement("li");
          listItem.innerText = courses[index].name;

          let listItemWrap = document.createElement("div");
          listItemWrap.appendChild(listItem);

          theList.appendChild(listItemWrap);
        }

        // Create a separate modal for each department
        let modal = createModal(data.departments[i]);
        modals.push(modal);
        pageWrap.appendChild(modal);
      }

      // Call the activateModal() function after the fetch and DOM manipulation is complete
      activateModal(data.departments);
      dialogModal();

      spinner.style.display = "none";
    })
    .catch((error) => {
      console.error("Error:", error);
      spinner.style.display = "none";
    });
}

addJSON();
dialogModal();

function createModal(department) {
  // Create the modal structure
  let modal = document.createElement("div");
  modal.classList.add("modal", "my-modal");

  let modalContent = document.createElement("div");
  modalContent.classList.add("lists", "modal-content");

  let closeButton = document.createElement("span");
  closeButton.className = "close";
  closeButton.innerHTML = "&times;";
  modalContent.appendChild(closeButton);

  let departmentContainer = document.createElement("div");
  let departmentHeading = document.createElement("h3");
  departmentHeading.innerText = department.name;
  departmentContainer.appendChild(departmentHeading);
  modalContent.appendChild(departmentContainer);

  let courseList = document.createElement("dl");
  department.courses.forEach(function (course) {
    let courseName = document.createElement("dt");
    courseName.innerText = course.name;
    let courseSynopsis = document.createElement("dd");
    courseSynopsis.innerText = course.synopsis;
    let courseItem = document.createElement("div");
    courseItem.classList.add("open");
    courseItem.appendChild(courseName);
    courseItem.appendChild(courseSynopsis);
    courseList.appendChild(courseItem);
  });
  modalContent.appendChild(courseList);

  modal.appendChild(modalContent);

  return modal;
}

function activateModal(departments) {
  // Get the buttons that open the modals
  buttons = document.querySelectorAll(".popup-btn");

  // Get the <span> elements that close the modals
  closeBtn = document.querySelectorAll(".close");

  // Convert the closeBtn NodeList to an array
  closeBtnArray = Array.from(closeBtn);

  // When the user clicks on a button, open the corresponding modal
  buttons.forEach(function (button, index) {
    button.onclick = function () {
      // Get the corresponding modal and display it
      const modal = modals[index];
      modal.style.display = "block";
    };
  });

  // When the user clicks on a <span> (x), close the corresponding modal
  closeBtnArray.forEach(function (span, index) {
    span.onclick = function () {
      const modal = modals[index];
      modal.style.display = "none";
    };
  });

  // When the user clicks anywhere outside of a modal, close it
  window.onclick = function (event) {
    modals.forEach(function (modal) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    });
  };
}
function dialogModal() {
  openBtns = document.querySelectorAll(".open");
  closedBtns = document.querySelectorAll(".closed");

  for (let i = 0; i < openBtns.length; i++) {
    openBtns[i].addEventListener("click", () => {
      dialog.showModal();
    });
  }
  for (let i = 0; i < closedBtns.length; i++) {
    closedBtns[i].addEventListener("click", () => {
      dialog.close();
    });
  }
}

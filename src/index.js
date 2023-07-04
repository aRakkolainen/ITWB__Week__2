import "./styles.css";
//How to insert new row to the table and filling it with content (the function insertNewRow) is implemented based on this tutorial: https://www.tutorialspoint.com/How-to-add-rows-to-a-table-using-JavaScript-DOM
//How to check the length of table: https://stackoverflow.com/questions/3053503/javascript-to-get-rows-count-of-a-html-table

function insertNewRow(givenUsername) {
  let table = document.getElementById("content");
  let givenEmail = document.getElementById("input-email").value;
  let givenAddress = document.getElementById("input-address").value;
  let newRow = document.createElement("tr");
  let numberOfRows = document.getElementById("information-table").rows.length-1
  newRow.setAttribute(
    "id",
    "row" + numberOfRows
  );
  let usernameCell = document.createElement("td");
  usernameCell.setAttribute("id", "username" + numberOfRows);
  let emailCell = document.createElement("td");
  let addressCell = document.createElement("td");
  let adminstatusCell = document.createElement("td");
  let pictureCell = document.createElement("td");
  if (givenUsername !== "") {
    usernameCell.innerText = givenUsername;
  }
  if (givenEmail !== "") {
    emailCell.innerText = givenEmail;
  }

  if (givenAddress !== "") {
    addressCell.innerText = givenAddress;
  }
  // Checking the status of checkbox is implemented based on this tutorial: https://www.javascripttutorial.net/javascript-dom/javascript-checkbox/
  const adminStatusCB = document.getElementById("input-admin");

  if (adminStatusCB.checked === true) {
    adminstatusCell.innerText = "X";
  } else {
    adminstatusCell.innerText = "-";
  }
  // This is based on the course material and this tutorial: https://developer.mozilla.org/en-US/docs/Web/API/File_API/Using_files_from_web_applications#example_using_object_urls_to_display_images
  const imageFile = document.getElementById("input-image").files[0];
  let imgSrc = "";
  if (!imageFile) return;
  imgSrc = URL.createObjectURL(imageFile);
  let profilePic = document.createElement("div");
  let pic = document.createElement("img");
  pic.style.display = "inline-block";
  pic.src = imgSrc;
  pic.id = "img" + numberOfRows;
  profilePic.appendChild(pic);
  pictureCell.appendChild(profilePic);
  newRow.appendChild(usernameCell);
  newRow.appendChild(emailCell);
  newRow.appendChild(addressCell);
  newRow.appendChild(adminstatusCell);
  newRow.appendChild(pictureCell);
  table.appendChild(newRow);
}
//Hint for this function was taken from this stackoverflow post: https://stackoverflow.com/questions/60874001/how-to-check-if-a-value-exist-in-a-table-and-return-the-value-of-a-cell-in-that
function checkUsername(givenUsername) {
  const table = document.getElementById("information-table");
  let rows = table.rows;
  let usernameExistence = false;
  let rowNumber = 0;
  for (let i = 1; i < rows.length; i++) {
    if (rows[i].cells[0].innerText === givenUsername) {
      usernameExistence = true;
      rowNumber = i;
      break;
    }
  }
  //console.log("Username found at row: " + rowNumber)

  if (usernameExistence === true) {
    rowNumber -= 1; 
    console.log("Username found with rowID: " + rowNumber);
    let rowID = "row" + rowNumber;
    let currentRow = document.getElementById(rowID);
    console.log(currentRow);
    let givenEmail = document.getElementById("input-email").value;
    let givenAddress = document.getElementById("input-address").value;
    const adminStatusCB = document.getElementById("input-admin");
    //editing username (not necessary though)
    currentRow.cells[0].innerText = givenUsername;
    // Editing email address
    currentRow.cells[1].innerText = givenEmail;
    // Editing given address
    currentRow.cells[2].innerText = givenAddress;
    // Editing admin status
    if (adminStatusCB.checked === true) {
      currentRow.cells[3].innerText = "X";
    } else {
      currentRow.cells[3].innerText = "-";
    }

    // Editing profile image
    let imgID = "img" + rowNumber;
    let profilePic = document.getElementById(imgID);
    let currentImgSrc = profilePic.src;
    const imageFile = document.getElementById("input-image").files[0];
    let newImgSrc = "";
    if (!imageFile) return;
    newImgSrc = URL.createObjectURL(imageFile);

    if (currentImgSrc !== newImgSrc) {
      profilePic.src = newImgSrc;
    }
  } else {
    insertNewRow(givenUsername);
  }
}
const submitBtn = document.getElementById("submit-data");
submitBtn.addEventListener("click", function () {
  let givenUsername = document.getElementById("input-username").value;
  checkUsername(givenUsername);
});

const emptyTableBtn = document.getElementById("empty-table");
emptyTableBtn.addEventListener("click", function () {
  let table = document.getElementById("information-table");
  for (var i = 1; table.rows.length - 1; i = i++) {
    //How to get the length (number of rows in table): https://www.w3schools.com/jsref/coll_table_rows.asp
    table.deleteRow(i);
  }
});

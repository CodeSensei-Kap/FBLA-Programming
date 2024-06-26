const add = document.querySelector("#add");                //This value changes when the add class button is clicked
const courseCode = document.querySelector("#course-code"); // This stores the input for the name of the class
const unitLoad = document.querySelector("#unit-load");     // This stores the input for how many credits the course is
const courseType = document.querySelector("#courseType");  //  Whatever level the course is, such as Honors, Regents, or AP, will be stored here
const gradeInput = document.querySelector("#gradeInput");  // Whatever grade the user inputs is stored into this variable
const tbody = document.querySelector("#tbody");   // This contains the name of the classes added
const tfoot = document.querySelector("#tfoot");  //We use this for a new row for more classes being added
const table = document.querySelector("#table"); // We also use this to create a new row when people add more classes
const calcGp = document.querySelector("#calc-gp"); // When the user presses the calcGp button, this value is changed
const clear = document.querySelector("#clear");    // When the user presses the clear button, this value is changed
const special = document.querySelector("#special")

let gpArry = [];

add.addEventListener("click", () => {
    const parsedGrade = parseFloat(gradeInput.value); //parsedGrade is the grade used to convert to GPA
    let gpaGrade = 0; // this is the gpa of the student based on their grades

    if (parsedGrade >= 97) {                       //  These statements find out what the value of parsedGrade is and convert it into a GPA
        gpaGrade = 4.0;
    }
    else if (parsedGrade >= 93) {
        gpaGrade = 3.7;
    }
    else if (parsedGrade >= 87) {
        gpaGrade = 3.3;
    }
    else if (parsedGrade >= 83) {
        gpaGrade = 3.0;
    }
    else if (parsedGrade >= 80) {
        gpaGrade = 2.7;
    }
    else if (parsedGrade >= 77) {
        gpaGrade = 2.3;
    }
    else {
        gpaGrade = 0;
    }

    if (
        courseCode.value === "" ||
        unitLoad.value <= 0 ||                                                  //If any of the values is incorrectly entered, this alerts the user
        isNaN(parsedGrade)
    ) {
        alert("One or more fields may not be filled out, check again");
    } else {
        const tr = document.createElement("tr");                                     
        const tdCourseCode = document.createElement("td");
        tdCourseCode.textContent = courseCode.value;                                  // These statements convert the 
        const tdUnitLoad = document.createElement("td");
        tdUnitLoad.textContent = unitLoad.value;
        const tdGrade = document.createElement("td");
        tdGrade.textContent = parsedGrade;
        const tdCourseLevel = document.createElement("td");
        const selectedOption = courseType.options[courseType.selectedIndex];
        const courseLevel = selectedOption.textContent;
        tdCourseLevel.textContent = courseLevel;
        tr.appendChild(tdCourseCode);
        tr.appendChild(tdUnitLoad);
        tr.appendChild(tdCourseLevel);
        tr.appendChild(tdGrade);
        tbody.appendChild(tr);
        table.classList.remove("display-none");
        calcGp.classList.remove("display-none");
        clear.classList.remove("display-none");
        gpArry.push({                                                      // This converts the inputted value into a different variable that's easier to use
            unitLoad: unitLoad.value,
            grade: gpaGrade,
            multiplier: courseType.value,                                
        });
        console.log(gpArry);
        courseCode.value = "";
        unitLoad.value = "";
        gradeInput.value = "";
    }
});

calcGp.addEventListener("click", () => {   // Code for what happens when the calculate button is pressed
    let unitLoads = 0,
        productOfUnitLoadsAndGrades = 0,
        sumOfProductOfUnitLoadsAndGrades = 0;

    gpArry.forEach((result) => {
        unitLoads += parseInt(result.unitLoad);
        productOfUnitLoadsAndGrades =
            parseInt(result.unitLoad) * parseFloat(result.grade) * parseFloat(result.multiplier);
        sumOfProductOfUnitLoadsAndGrades += productOfUnitLoadsAndGrades;
    });

    const gpa = sumOfProductOfUnitLoadsAndGrades / unitLoads;    // Weighted GPA is also based on the how many credits you took, so we divide by how many credits the student took

    const tr = document.createElement("tr");

    tdTotalUnitLoad = document.createElement("td");
    tdTotalUnitLoad.innerHTML = `Your total credits are ${unitLoads}`;

    tdGpa = document.createElement("td");
    tdGpa.setAttribute("colspan", "2");
    tdGpa.innerHTML = `your GPA is ${(
        sumOfProductOfUnitLoadsAndGrades / unitLoads
    ).toFixed(2)} `;

    tr.appendChild(tdTotalUnitLoad);
    tr.appendChild(tdGpa);
    if (tfoot.querySelector("tr") !== null) {
        tfoot.querySelector("tr").remove();
    }
    tfoot.appendChild(tr);

    const totalUnitLoadCell = tbody.querySelector(".total-unit-load");
    const gpaCell = tbody.querySelector(".gpa");

    totalUnitLoadCell.classList.add("total-unit-load");
    gpaCell.classList.add("gpa");
});

clear.addEventListener("click", () => {
    gpArry = [];
    tbody.querySelectorAll("*").forEach((child) => child.remove());            // All the remove statements basically reset the variables and keep their values as null
    if (tfoot.querySelector("tr") !== null) {
        tfoot.querySelector("tr").remove();
    }

    table.classList.add("display-none");                                    // This line and the next reset the tables by displaying nothing
    calcGp.classList.add("display-none");
    clear.classList.add("display-none");
  })

    function validateInput(input, max) {
    const errorMessage = document.getElementById("error-message");

    if (input.value > max) {                                                         // This sets a max value for the grade to be 100 and a min to be a 0
        input.value = max;
        errorMessage.textContent = "Please enter a number between 0 and 100.";
    } else {                                                                          // This makes sure the user can't input an improper grade value
        errorMessage.textContent = "";
    }
}

function validateInput2(input, max) {
    const errorMessage = document.getElementById("error-message")        // This sets a max value for the course credit to be 3 and a min to be a 1
    if (input.value > max) {
        input.value = max;
        errorMessage.textContent = "Please enter a number between 0 and 3.";      // This makes sure the user can't input an improper course credit value
    } else {
        errorMessage.textContent = "";
    }
}
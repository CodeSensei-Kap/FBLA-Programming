const add = document.querySelector("#add");
const courseCode = document.querySelector("#course-code");
const unitLoad = document.querySelector("#unit-load");
const gradeInput = document.querySelector("#gradeInput");
const tbody = document.querySelector("#tbody");
const tfoot = document.querySelector("#tfoot");
const table = document.querySelector("#table");
const calcGp = document.querySelector("#calc-gp");
const clear = document.querySelector("#clear");

let gpArry = [];

add.addEventListener("click", () => {
    const parsedGrade = parseFloat(gradeInput.value);
    let gpaGrade = 0;

    if (parsedGrade >= 97) {
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
        unitLoad.value <= 0 ||
        isNaN(parsedGrade)
    ) {
        alert("Wrong input, check and try again");
    } else {
        const tr = document.createElement("tr");
        const tdCourseCode = document.createElement("td");
        tdCourseCode.textContent = courseCode.value;
        const tdUnitLoad = document.createElement("td");
        tdUnitLoad.textContent = unitLoad.value;
        const tdGrade = document.createElement("td");
        tdGrade.textContent = parsedGrade;
        tr.appendChild(tdCourseCode);
        tr.appendChild(tdUnitLoad);
        tr.appendChild(tdGrade);
        tbody.appendChild(tr);
        table.classList.remove("display-none");
        calcGp.classList.remove("display-none");
        clear.classList.remove("display-none");
        gpArry.push({
            unitLoad: unitLoad.value,
            grade: gpaGrade,
        });
        console.log(gpArry);
        courseCode.value = "";
        unitLoad.value = "";
        gradeInput.value = "";
    }
});

calcGp.addEventListener("click", () => {
    let unitLoads = 0,
        productOfUnitLoadsAndGrades = 0,
        sumOfProductOfUnitLoadsAndGrades = 0;

    gpArry.forEach((result) => {
        unitLoads += parseInt(result.unitLoad);
        productOfUnitLoadsAndGrades =
            parseInt(result.unitLoad) * parseFloat(result.grade);
        sumOfProductOfUnitLoadsAndGrades += productOfUnitLoadsAndGrades;
    });
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
});

clear.addEventListener("click", () => {
    gpArry = [];
    tbody.querySelectorAll("*").forEach((child) => child.remove());
    if (tfoot.querySelector("tr") !== null) {
        tfoot.querySelector("tr").remove();
    }

    table.classList.add("display-none");
    calcGp.classList.add("display-none");
    clear.classList.add("display-none");
  })


  function validateInput(input, max) {
    const errorMessage = document.getElementById("error-message");

    if (input.value > max) {
        input.value = max;
        errorMessage.textContent = "Please enter a number between 0 and 100.";
    } else {
        errorMessage.textContent = "";
    }
}

function validateInput2(input, max) {
    const errorMessage = document.getElementById("error-message");

    if (input.value > max) {
        input.value = max;
        errorMessage.textContent = "Please enter a number between 0 and 3.";
    } else {
        errorMessage.textContent = "";
    }
}



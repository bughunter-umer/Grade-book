function createInputTable() {
    const numStudents = parseInt(document.getElementById("numStudents").value);
    const numSubjects = parseInt(document.getElementById("numSubjects").value);

    let html = "<table><thead><tr><th>Student Name</th>";
    for (let j = 0; j < numSubjects; j++) {
        html += `<th>Subject ${j+1}</th>`;
    }
    html += "</tr></thead><tbody>";

    for (let i = 0; i < numStudents; i++) {
        html += `<tr>`;
        html += `<td><input type='text' placeholder='Name' class='studentName'></td>`;
        for (let j = 0; j < numSubjects; j++) {
            html += `<td><input type='number' min='0' max='100' class='marks'></td>`;
        }
        html += `</tr>`;
    }
    html += "</tbody></table>";

    document.getElementById("marksInput").innerHTML = html;
    document.getElementById("calculateBtn").style.display = "inline-block";
}

function calculateResults() {
    const studentInputs = document.querySelectorAll(".studentName");
    const markInputs = document.querySelectorAll(".marks");

    const numSubjects = parseInt(document.getElementById("numSubjects").value);
    const numStudents = parseInt(document.getElementById("numStudents").value);

    const students = [];
    const marks = [];

    // Read student names and marks
    for (let i = 0; i < numStudents; i++) {
        students.push(studentInputs[i].value || `Student ${i+1}`);
        const studentMarks = [];
        for (let j = 0; j < numSubjects; j++) {
            const idx = i*numSubjects + j;
            studentMarks.push(parseInt(markInputs[idx].value) || 0);
        }
        marks.push(studentMarks);
    }

    // Calculate totals, averages, highest, lowest, grades
    const grade = mark => {
        if (mark >= 90) return "A+";
        if (mark >= 80) return "A";
        if (mark >= 70) return "B";
        if (mark >= 60) return "C";
        return "D";
    }

    const totals = marks.map(row => row.reduce((a,b)=>a+b,0));
    const averages = marks.map(row => (row.reduce((a,b)=>a+b,0)/numSubjects).toFixed(2));
    const highs = marks.map(row => Math.max(...row));
    const lows = marks.map(row => Math.min(...row));
    const grades = marks.map(row => row.map(grade));

    // Build table
    let tableHeader = "<th>Student</th>";
    for (let j=0;j<numSubjects;j++) tableHeader += `<th>Subject ${j+1}</th>`;
    tableHeader += "<th>Total</th><th>Average</th><th>Highest</th><th>Lowest</th><th>Grades</th>";
    document.getElementById("tableHeader").innerHTML = tableHeader;

    let tableBody = "";
    for (let i=0;i<numStudents;i++){
        tableBody += `<tr><td>${students[i]}</td>`;
        marks[i].forEach(m => tableBody += `<td>${m}</td>`);
        tableBody += `<td>${totals[i]}</td><td>${averages[i]}</td><td>${highs[i]}</td><td>${lows[i]}</td>`;
        tableBody += `<td>${grades[i].join(", ")}</td></tr>`;
    }
    document.getElementById("tableBody").innerHTML = tableBody;
}

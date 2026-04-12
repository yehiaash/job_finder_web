let jobs = [
    ["Frontend Developer", "Google","Pending"],
    ["Backend Developer", "Amazon","Pending"],
    ["UI Designer", "Facebook","Pending"]
];

let table = document.getElementById("jobsTable");

for (let i = 0; i < jobs.length; i++) {
    table.innerHTML += "<tr><td>" + jobs[i][0] + "</td><td>" + jobs[i][1] + "</td><td>" + jobs[i][2] + "</td></tr>";
}
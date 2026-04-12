var jobs = [
  { id: 1, title: "Frontend Developer", company: "Google", category: "Tech", type: "Full-time", budget: "High", location: "Remote" },
  { id: 2, title: "UI/UX Designer", company: "Meta", category: "Design", type: "Part-time", budget: "Mid", location: "Cairo" },
  { id: 3, title: "Backend Developer", company: "Amazon", category: "Tech", type: "Full-time", budget: "High", location: "Remote" },
  { id: 4, title: "Data Analyst", company: "Microsoft", category: "Data", type: "Freelance", budget: "Mid", location: "Alexandria" },
  { id: 5, title: "Graphic Designer", company: "Adobe", category: "Design", type: "Full-time", budget: "Low", location: "Cairo" },
  { id: 6, title: "DevOps Engineer", company: "Netflix", category: "Tech", type: "Full-time", budget: "High", location: "Remote" },
  { id: 7, title: "Content Writer", company: "HubSpot", category: "Marketing", type: "Freelance", budget: "Low", location: "Cairo" },
  { id: 8, title: "Mobile Developer", company: "Spotify", category: "Tech", type: "Part-time", budget: "Mid", location: "Alexandria" },
];


function isLoggedIn() {
  var user = localStorage.getItem("loggedInUser");
  if (user) {
    return true;
  }
  return false;
}

function updateNav() {
  if (isLoggedIn()) {
    document.getElementById("Login").parentElement.style.display = "none";
    document.getElementById("Register").parentElement.style.display = "none";
    document.getElementById("Logout").parentElement.style.display = "inline-flex";
    document.querySelector('a[href="Profile.html"]').style.display = "inline-flex";
    document.querySelector('a[href="Applied_jobs.html"]').style.display = "inline-flex";
  } else {
    document.getElementById("Login").parentElement.style.display = "inline-flex";
    document.getElementById("Register").parentElement.style.display = "inline-flex";
    document.getElementById("Logout").parentElement.style.display = "none";
    document.querySelector('a[href="Profile.html"]').style.display = "none";
    document.querySelector('a[href="Applied_jobs.html"]').style.display = "none";
  }
}

document.getElementById("Logout").parentElement.onclick = function (e) {
  e.preventDefault();
  localStorage.removeItem("loggedInUser");
  updateNav();
  showJobs();
};

function populateFilters() {
  var categories = ["All Category"];
  var types = ["All types"];
  var budgets = ["Any Budget"];

  for (var i = 0; i < jobs.length; i++) {
    var found = false;
    for (var j = 0; j < categories.length; j++) {
      if (categories[j] == jobs[i].category) { found = true; break; }
    }
    if (!found) categories.push(jobs[i].category);

    found = false;
    for (var j = 0; j < types.length; j++) {
      if (types[j] == jobs[i].type) { found = true; break; }
    }
    if (!found) types.push(jobs[i].type);

    found = false;
    for (var j = 0; j < budgets.length; j++) {
      if (budgets[j] == jobs[i].budget) { found = true; break; }
    }
    if (!found) budgets.push(jobs[i].budget);
  }

  var catSel = document.getElementById("category");
  catSel.innerHTML = "";
  for (var i = 0; i < categories.length; i++) {
    var opt = document.createElement("option");
    opt.value = categories[i];
    opt.textContent = categories[i];
    catSel.appendChild(opt);
  }

  var typeSel = document.getElementById("jobType");
  typeSel.innerHTML = "";
  for (var i = 0; i < types.length; i++) {
    var opt = document.createElement("option");
    opt.value = types[i];
    opt.textContent = types[i];
    typeSel.appendChild(opt);
  }

  var budgetSel = document.getElementById("budget");
  budgetSel.innerHTML = "";
  for (var i = 0; i < budgets.length; i++) {
    var opt = document.createElement("option");
    opt.value = budgets[i];
    opt.textContent = budgets[i];
    budgetSel.appendChild(opt);
  }
}

function showJobs() {
  var search = document.getElementById("searchInput").value.toLowerCase();
  var category = document.getElementById("category").value;
  var jobType = document.getElementById("jobType").value;
  var budget = document.getElementById("budget").value;

  var ul = document.getElementById("Applied_jobs_list");
  ul.innerHTML = "";

  var count = 0;

  for (var i = 0; i < jobs.length; i++) {
    var job = jobs[i];

    var matchSearch = job.title.toLowerCase().indexOf(search) != -1 || job.company.toLowerCase().indexOf(search) != -1;
    var matchCategory = category == "All Category" || job.category == category;
    var matchType = jobType == "All types" || job.type == jobType;
    var matchBudget = budget == "Any Budget" || job.budget == budget;

    if (matchSearch && matchCategory && matchType && matchBudget) {
      count++;

      var applied = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
      var isDone = false;
      for (var j = 0; j < applied.length; j++) {
        if (applied[j] == job.id) { isDone = true; break; }
      }

      var btn = "";
      if (isLoggedIn()) {
        if (isDone) {
          btn = '<button class="apply-btn applied" disabled><i class="fas fa-check"></i> Applied</button>';
        } else {
          btn = '<button class="apply-btn" onclick="applyJob(' + job.id + ', this)"><i class="fas fa-paper-plane"></i> Apply</button>';
        }
      } else {
        btn = '<button class="apply-btn login-required" onclick="window.location.href=\'Login.html\'"><i class="fas fa-lock"></i> Login to Apply</button>';
      }

      var li = document.createElement("li");
      li.className = "job-card";
      li.innerHTML =
        '<div class="job-info">' +
        '<h3 class="job-title">' + job.title + '</h3>' +
        '<div class="job-details">' +
        '<span class="job-company"><i class="fas fa-building"></i> ' + job.company + '</span>' +
        '<span class="job-meta"><i class="fas fa-map-marker-alt"></i> ' + job.location + '</span>' +
        '<span class="job-meta"><i class="fas fa-briefcase"></i> ' + job.type + '</span>' +
        '<span class="job-meta"><i class="fas fa-dollar-sign"></i> ' + job.budget + '</span>' +
        '</div>' +
        '</div>' +
        '<div class="job-actions">' +
        '<span class="job-badge">' + job.category + '</span>' +
        '<a href="job_details.html?id=' + job.id + '" class="apply-btn">View Details</a>' +
        btn +
        '</div>';

      ul.appendChild(li);
    }
  }

  if (count == 0) {
    ul.innerHTML = "<li class='no-results'>No jobs found.</li>";
  }
}

function applyJob(id, btn) {
  var applied = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
  var found = false;

  for (var i = 0; i < applied.length; i++) {
    if (applied[i] == id) { found = true; break; }
  }

  if (!found) {
    applied.push(id);
    localStorage.setItem("appliedJobs", JSON.stringify(applied));
  }

  btn.innerHTML = '<i class="fas fa-check"></i> Applied';
  btn.classList.add("applied");
  btn.disabled = true;
}

document.getElementById("searchBtn").onclick = function () { showJobs(); };
document.getElementById("category").onchange = function () { showJobs(); };
document.getElementById("jobType").onchange = function () { showJobs(); };
document.getElementById("budget").onchange = function () { showJobs(); };

document.getElementById("searchInput").onkeyup = function (e) {
  if (e.key == "Enter") { showJobs(); }
};

document.querySelector("form").onreset = function () {
  setTimeout(function () { showJobs(); }, 0);
};

populateFilters();
updateNav();
showJobs();

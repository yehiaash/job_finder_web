var jobs = [
  { id: 1, title: "Frontend Developer",  company: "Google",    category: "Tech",      type: "Full-time", budget: "High", location: "Remote",     salary: 8000,  experience: 2, description: "We're looking for a talented Frontend Developer to join our team at Google. You will build and maintain high-quality web applications, collaborate with cross-functional teams, and contribute to cutting-edge products used by millions of users worldwide. Proficiency in React, TypeScript, and modern CSS is required." },
  { id: 2, title: "UI/UX Designer",      company: "Meta",      category: "Design",    type: "Part-time", budget: "Mid",  location: "Cairo",      salary: 5000,  experience: 3, description: "Meta is seeking a creative UI/UX Designer to craft intuitive and visually stunning user experiences. You'll conduct user research, create wireframes and prototypes, and work closely with engineers to bring designs to life. Figma expertise and a strong portfolio are a must." },
  { id: 3, title: "Backend Developer",   company: "Amazon",    category: "Tech",      type: "Full-time", budget: "High", location: "Remote",     salary: 9000,  experience: 3, description: "Join Amazon's engineering team as a Backend Developer. You'll design scalable microservices, build RESTful APIs, and work with cloud infrastructure on AWS. Strong knowledge of Node.js or Python, databases (SQL/NoSQL), and system design principles is expected." },
  { id: 4, title: "Data Analyst",        company: "Microsoft", category: "Data",      type: "Freelance", budget: "Mid",  location: "Alexandria", salary: 4500,  experience: 1, description: "Microsoft is looking for a Data Analyst to transform complex datasets into actionable business insights. Responsibilities include creating dashboards, writing SQL queries, and presenting findings to stakeholders. Experience with Power BI or Tableau is a strong plus." },
  { id: 5, title: "Graphic Designer",    company: "Adobe",     category: "Design",    type: "Full-time", budget: "Low",  location: "Cairo",      salary: 3000,  experience: 1, description: "Adobe needs a passionate Graphic Designer to create compelling visual content across digital and print media. You'll work on branding, marketing materials, and product visuals. Mastery of Adobe Creative Suite (Photoshop, Illustrator, InDesign) is required." },
  { id: 6, title: "DevOps Engineer",     company: "Netflix",   category: "Tech",      type: "Full-time", budget: "High", location: "Remote",     salary: 10000, experience: 4, description: "Netflix is hiring a DevOps Engineer to manage and improve our CI/CD pipelines, container orchestration with Kubernetes, and cloud infrastructure on AWS and GCP. You'll drive automation, reliability, and scalability for systems serving millions of users globally." },
  { id: 7, title: "Content Writer",      company: "HubSpot",   category: "Marketing", type: "Freelance", budget: "Low",  location: "Cairo",      salary: 2500,  experience: 1, description: "HubSpot is looking for a skilled Content Writer to produce engaging blog posts, whitepapers, and marketing copy. You'll research industry trends, optimize content for SEO, and collaborate with the marketing team to drive organic growth. Excellent English writing skills required." },
  { id: 8, title: "Mobile Developer",    company: "Spotify",   category: "Tech",      type: "Part-time", budget: "Mid",  location: "Alexandria", salary: 5500,  experience: 2, description: "Spotify is seeking a Mobile Developer to build and enhance features in our Android and iOS applications. You will work with React Native or Flutter, ensure smooth performance, and collaborate with designers to deliver great user experiences for our global audience." },
];

function getJobIdFromURL() {
  var params = new URLSearchParams(window.location.search);
  return parseInt(params.get("id"));
}

function isLoggedIn() {
  return !!localStorage.getItem("loggedInUser");
}

function isApplied(id) {
  var applied = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
  for (var i = 0; i < applied.length; i++) {
    if (applied[i] == id) return true;
  }
  return false;
}

function applyToJob(id) {
  var applied = JSON.parse(localStorage.getItem("appliedJobs") || "[]");
  if (!isApplied(id)) {
    applied.push(id);
    localStorage.setItem("appliedJobs", JSON.stringify(applied));
  }
}

function loadJobDetails() {
  var id  = getJobIdFromURL();
  var job = null;

  for (var i = 0; i < jobs.length; i++) {
    if (jobs[i].id === id) { job = jobs[i]; break; }
  }

  if (!job) {
    document.body.innerHTML = "<h2>Job not found.</h2><p><a href='index.html'>Back to Home</a></p>";
    return;
  }

  var inputs = document.querySelectorAll("input[readonly]");
  if (inputs[0]) inputs[0].value = job.title;
  if (inputs[1]) inputs[1].value = job.company;
  if (inputs[2]) inputs[2].value = job.salary;
  if (inputs[3]) inputs[3].value = job.experience;

  var textarea = document.querySelector("textarea[readonly]");
  if (textarea) textarea.value = job.description;

  document.title = job.title + " – CareerHub";

  var applyBtn = document.querySelector("form button");
  if (!applyBtn) return;

  applyBtn.closest("form").removeAttribute("action");

  if (!isLoggedIn()) {
    applyBtn.textContent = "Login to Apply";
    applyBtn.onclick = function (e) {
      e.preventDefault();
      window.location.href = "Login.html";
    };

  } else if (isApplied(id)) {
    applyBtn.textContent = "Already Applied";
    applyBtn.disabled = true;

  } else {
    applyBtn.textContent = "Apply for Job";
    applyBtn.onclick = function (e) {
      e.preventDefault();
      applyToJob(id);
      applyBtn.textContent = "Applied Successfully!";
      applyBtn.disabled = true;
      setTimeout(function () {
        window.location.href = "Applied_jobs.html";
      }, 1200);
    };
  }
}

loadJobDetails();
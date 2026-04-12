
let jobs=JSON.parse(localStorage.getItem("jobs"))||[];
    let table=document.getElementById("jobTable")
    function displayJobs() {
        table.innerHTML="";
        if (jobs.length===0) {
            table.innerHTML = "<tr><td colspan='5'>No Jobs Available</td></tr>";
        return;
        }

        jobs.forEach((job,index) => {
        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${job.title}</td>
                <td>${job.salary}</td>
                <td>${job.company}</td>
                <td>${job.status}</td>
                <td>
                         <button onclick="redirect(${index})" class="view-btn">
                            View
                        </button>
                    </td>
            </tr>
       ` ;
        table.innerHTML += row;
    });

}
let redirect= (index)=>{
    const uinfo=JSON.parse(localStorage.getItem("currentuser"));
    const jobs=JSON.parse(localStorage.getItem("jobs"));
    const currentjob=jobs[index];
    if(currentjob.company===uinfo.company){
        window.location.href="adminjob.html";
    }
    else{
        alert("Company doesn't match");
    }
}

displayJobs();
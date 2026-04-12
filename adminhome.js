if(localStorage.getItem("jobs")){
    
}
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
                        <button onclick="deleteJob(${index})" class="delete-btn">
                            Delete
                        </button>
                    </td>
            </tr>
       ` ;
        table.innerHTML += row;
    });

}
window.deleteJob=function(index){
    jobs.splice(index,1);
    localStorage.setItem("jobs",JSON.stringify(jobs));
    displayJobs();
}
displayJobs();
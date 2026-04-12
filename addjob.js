document.querySelector("form").addEventListener("submit", e=> {e.preventDefault();
    const input=document.querySelectorAll("input");
    let title=input[0].value;
    let salary=input[1].value;
    let company=input[2].value;
    const select=document.querySelectorAll("select");
    let status=select[0].value;
    let jobtype=select[1].value;
    let experience=input[3].value;
    let description=document.querySelector("textarea").value;
    let jobs=JSON.parse(localStorage.getItem("jobs"))||[];
    let job ={ 
        id:jobs.length+1,
        title:title,
        salary:salary,
        company:company,
        status:status,
        jtype:jobtype,
        experience:experience,
        desc:description
    };
    jobs.push(job);
    localStorage.setItem("jobs",JSON.stringify(jobs));
    alert("Added Job Successfully ");
    document.querySelector("form").reset();

    }) ;
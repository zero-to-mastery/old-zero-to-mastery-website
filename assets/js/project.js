const url = window.location.href;
const projectsLink = `${url.slice(0,url.indexOf('projects'))}assets/js/projects.json`;
const searchBox = document.getElementById("searchBox");

/*The search box handler*/
const handleSearch = () => {
    let value = searchBox.value.toLowerCase();
    let projects = document.getElementsByClassName("osProject");
    if(value.length > 0)
    {
        Array.prototype.forEach.call(projects, (project) => {
            h5 = project.getElementsByTagName("h5")[0];
            if (h5.innerHTML.toLowerCase().indexOf(value) > -1)
            {
                project.style.display = "";
            }
            else
            {
                project.style.display = "none";
            }
        });
    }
    else
    {
        Array.prototype.forEach.call(projects, (project) => {
            project.style.display = "";
        });
    }
}

/*The project display function*/
const displayProjects = () => {
    fetch(projectsLink).then(response => {
        return response.json();
    }).then(data => {
        data.forEach(project => {
            //Fetch the number of contributors on each project from github API
            fetch(`https://api.github.com/repos/zero-to-mastery/${project.name}/contributors`).then(resp => {
                return resp.json();
            }).then(contributors => {
                let pull_requests = contributors.reduce((acc, val) => acc + val.contributions, 0);
                document.getElementById("projects").insertAdjacentHTML("beforeend",
                `
                <div class="my-3 col-sm-6 col-md-4 col-lg-3 osProject">
                    <div class="card adventCard">
                        <div>
                            <h5 class="card-title">${project.name}</h5>
                            <img src=${project.image} class="projectIcon" data-toggle="tooltip" data-placement="top" alt=${project.name} title=${project.name}>
                        </div>
                        <div class="card-body text-center bg-dark">
                            <h6 class="btn-outline-warning">Contributors: ${contributors.length}</h6>
                            <h6 class="btn-outline-warning">Pull requests: ${pull_requests}</h6>
                            <a href=${project.projectUrl} target="_blank" class="btn btn-outline-warning btn-sm mt-3 mb-0">Contribute Now</a>
                        </div>
                    </div>
                </div>
                `);
            });
        });
    }).catch(err => {throw err;
});
}

displayProjects();
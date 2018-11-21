const projectsLink = "https://cors.io/?https://api.myjson.com/bins/76cq6";

const searchBox = document.getElementById("searchBox");
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

const displayProjects = () => {
    fetch(projectsLink).then(response => {
        return response.json();
    }).then(data => {
        data.forEach(project => {
            document.getElementById("projects").insertAdjacentHTML("beforeend", 
            `
            <div class="my-3 col-sm-6 col-md-4 col-lg-3 osProject">
                <div class="card adventCard">
                    <div>
                        <h5 class="card-title">${project.name}</h5>
                        <img src=${project.image} class="projectIcon" data-toggle="tooltip" data-placement="top" title=${project.name}>
                    </div>
                    <div class="card-body text-center bg-dark">
                        <a href=${project.projectUrl} class="btn btn-outline-warning btn-sm mt-3 mb-0">Contribute Now</a>
                    </div>
                </div>
            </div>
            `);
        });
    }).catch(err => {throw err;
});
}

displayProjects();
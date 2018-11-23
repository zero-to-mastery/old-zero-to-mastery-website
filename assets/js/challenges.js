const displayChallenges = () => {
    fetch("https://api.github.com/users/zero-to-mastery/repos").then(response => {
        return response.json();
    }).then(data => {
        let regex = /Coding_Challenge-\d/i;
        const challenges = data.filter((repo) => { //get all challenges repo from github api
            return regex.test(repo.name);
        });

        challenges.sort((a,b) => { //sort the array in ascending order
            return a.name.slice(a.name.indexOf('-') + 1) - b.name.slice(b.name.indexOf('-') + 1);
        });

        challenges.forEach(challenge => {
            document.getElementById("projects").insertAdjacentHTML("beforeend",
                `
                <div class="my-3 col-sm-6 col-md-4 col-lg-3 osProject">
                    <div class="card adventCard">
                        <div>
                            <h5 class="card-title challenge">Coding Challenge ${challenge.name.slice(challenge.name.indexOf('-') + 1)}</h5>
                            <img src="https://avatars1.githubusercontent.com/u/35373879?v=4" class="challengeIcon" data-toggle="tooltip" data-placement="top" alt=${challenge.name} title=${challenge.name}>
                        </div>
                        <div class="card-body text-center bg-dark">
                            <a href=${challenge.html_url} class="btn btn-outline-warning btn-lg mt-3 mb-0">View Challenge</a>
                        </div>
                    </div>
                </div>
            `);
        });
        
    }).catch(err => {throw err});
}

displayChallenges();
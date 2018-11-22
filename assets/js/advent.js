let currentUrl;

let currentView = document.getElementById('toggler').innerHTML.trim();

const stats = async () => {
    fetch("https://cors.io/?http://91.121.210.171:42550/data").then(response => {
        return response.json();
    }).then(data => {
        document.getElementById("statsTotal").innerHTML = data.all;
        document.getElementById("statsToday").innerHTML = data.day;
        document.getElementById("statsStudents").innerHTML = data.user;
    }).catch(err => {
        throw err;
    });
}
stats()

// Fetch Users for Dropdown
const users = async () => {
    fetch("https://cors.io/?http://91.121.210.171:42550/user").then(response => {
        return response.json();
    }).then(data => {
        data.forEach(user => {
            let uLink = "?user=" + user.username
            document.getElementById("studentFilter").insertAdjacentHTML('beforeend',
                `<a class="dropdown-item" id=${uLink} onclick=onClick(this.id)>${user.username}</a>`)
        });
    }).catch(err => {
        throw err;
    });
}
users()

const onClick = (param) => {
    document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Loading...</h3>`;
    if (param === "clear") fetchSolutions("solutions/all");
    if (param.includes("user")) displayUser(param);
    if (param.includes("day")) {
        $('#exampleModal').modal('hide');
        currentUrl = "solutions/" + param
        console.log(currentUrl)
        fetchSolutions("solutions/" + param)
    }
    if(param === "leaderboard") {
        // disable toggle button
        document.getElementById('toggler').disabled = true;
        leaderboard()
    }
}

// Fetch Solution
const fetchSolutions = (url) => {
    fetch("https://cors.io/?http://91.121.210.171:42550/" + url).then(response => {
        console.log(currentUrl)
        return response.json();
    }).then(data => {
        
        document.getElementById("solutions").innerHTML = ``;
        if (data.length < 1) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
        }
        if(url.includes("solutions/all")) {
            currentUrl = "https://cors.io/?http://91.121.210.171:42550/solutions/all";
            document.getElementById("adventTitle").innerHTML = `All Student's Solutions`;
        }
        if(url.includes("solutions/?day")) { 
            
            document.getElementById("adventTitle").innerHTML = `Solutions for ${url.slice(15)} December`;
        }
        data.forEach(sol => {
            if (currentView === "List") {
                insertCard(sol)
            } else {
                insertList(sol)
            }
        });

    }).catch(err => {
        throw err;
    });
}


const displayUser = (user) => {
    let name = user.slice(6)
    console.log(name)
    fetch("https://cors.io/?http://91.121.210.171:42550/solutions/all").then(response => {
        currentUrl = "https://cors.io/?http://91.121.210.171:42550/solutions/all";
        return response.json();
    }).then(data => {
        document.getElementById("solutions").innerHTML = ``;
        if (data.length < 1) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
        }
        document.getElementById("adventTitle").innerHTML = `${name}'s Solutions`;
        data.forEach(sol => {
            if (sol.userName === name) {
                if (currentView === "List") {
                    insertCard(sol)
                } else {
                    insertList(sol)
                }
            }
        });

    }).catch(err => {
        throw err;
    });
}

const leaderboard = () => {
    fetch("https://cors.io/?http://91.121.210.171:42550/user").then(response => {
        return response.json();
    }).then(data => {
        document.getElementById("solutions").innerHTML = `<div id="leaderboardd" class="w-100 bg-dark text-white p-3 m-3 text-left"><div class="row"></div></div>`;
        if (data.length < 1) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
        }
        document.getElementById("adventTitle").innerHTML = `Leaderboard`;

        function compare(a,b) {
            if (a.point > b.point)
                return -1;
                if (a.point > b.point)
              return 1;
            return 0;
          }
          
          let points = data.sort(compare);
          points.forEach((u, i) => {
              let medal = "noMedal";
              if(i === 0) medal = "goldMedal"
              if(i === 1) medal = "silverMedal"
              if(i === 2) medal = "bronzeMedal"
              document.getElementById('leaderboardd').insertAdjacentHTML('beforeend',
              `
                <div class="m-3">
                    <img class="leaderPlace d-inline ${medal}" src=${u.avatarUrl}>
                    <div class="leaderName d-inline pt-2">${u.username}</div>
                    <div class="leaderPoints d-inline pt-2 mx-3 float-right">${u.point} Points</div>
                    <hr class="leaderHr">
                </div>               
              `
          )
          });

    }).catch(err => {
        throw err;
    });
   
}


const qIndex = window.location.href.indexOf("?")
let qParam = (qIndex === -1 ? "solutions/all" : window.location.href.slice(qIndex))
if (qParam.includes("?day=")) fetchSolutions("solutions/" + qParam)
if (qParam.includes("?user=")) displayUser(qParam)
if (qParam === "solutions/all") fetchSolutions(qParam)


const toggleCard = () => {
    if (currentView === 'List') {
        document.getElementById('toggler').innerHTML = "Card";
        currentView = "Card"
        console.log(currentUrl)
        if (currentUrl === "https://cors.io/?http://91.121.210.171:42550/solutions/all") {
            onClick('clear');
        } else if (currentUrl.includes("day")) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Loading...</h3>`;
            fetchSolutions(currentUrl)
        } else {

        }
    } else if (currentView === 'Card') {
        document.getElementById('toggler').innerHTML = 'List';
        currentView = "List"
        if (currentUrl === "https://cors.io/?http://91.121.210.171:42550/solutions/all") {
            onClick('clear');
        } else if (currentUrl.includes("day")) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Loading...</h3>`;
            fetchSolutions(currentUrl)
        } else {

        }
    }
}

const insertCard = (sol) => {
    console.log('card enabled')

    // enable toggle button
    document.getElementById('toggler').disabled = false;

    let dayImgUrl = "../assets/images/days/" + sol.dayNumber + ".png";
    const tooltip = "Day-" + sol.dayNumber
    document.getElementById('solutions').insertAdjacentHTML('beforeend',
        `
        <div class="my-3 col-sm-6 col-md-4 col-lg-3">
            <div class="card adventCard">
                <img src="https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png" class="langIcon">
                <img src=${dayImgUrl} class="dayIcon" data-toggle="tooltip" data-placement="top" title=${tooltip}>
                <img class="card-img-top img-fluid" src=${sol.avatarUrl} alt=${sol.userName}>
                <div class="card-body text-center bg-dark">
                    <h5 class="card-title">
                        <a class="text-white" id="userNameHolder">${sol.userName}</a>
                    </h5>
                    <a href=${sol.url} target="_blank" class="btn btn-outline-warning btn-sm mt-3 mb-0">View Solution</a>
                </div>
            </div>
        </div>
    `)
}

const insertList = (sol) => {
    console.log('list enabled')

    // enable toggle button
    document.getElementById('toggler').disabled = false;

    let dayImgUrl = "../assets/images/days/" + sol.dayNumber + ".png";
    const tooltip = "Day-" + sol.dayNumber
    document.getElementById('solutions').insertAdjacentHTML('beforeend',
        `
        <div class="m-3">
            <img src=${dayImgUrl} class="dayIcon" data-toggle="tooltip" data-placement="top" title=${tooltip}>
            <img class="leaderPlace d-inline card-img-top img-fluid" src=${sol.avatarUrl}>
            <div class="leaderName d-inline pt-2">${sol.userName}</div><br>
            <a href=${sol.url} target="_blank" class="btn btn-outline-warning btn-sm mt-3 mb-0">View Solution</a>
            <hr class="leaderHr">
        </div>
    `)
}




// Modal Button Generator
let date = new Date();
let day = date.getDate()


while (day > 0) {
    let dayBtn = "../assets/images/days/" + day + ".png";
    let link = `?day=` + day
    document.getElementById('calBtn').insertAdjacentHTML('beforeend',
        `
    <a  id=${link} onclick=onClick(this.id)><img src=${dayBtn}></a>
    
    `);
    day--
}

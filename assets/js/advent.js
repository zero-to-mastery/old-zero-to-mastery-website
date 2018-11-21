
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
        fetchSolutions("solutions/" + param)
    }
    if(param === "leaderboard") leaderboard()
}

// Fetch Solution
const fetchSolutions = (url) => {
    fetch("https://cors.io/?http://91.121.210.171:42550/" + url).then(response => {
        return response.json();
    }).then(data => {
        
        document.getElementById("solutions").innerHTML = ``;
        if (data.length < 1) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
        }
        if(url.includes("solutions/all")) document.getElementById("adventTitle").innerHTML = `All Student's Solutions`;
        if(url.includes("solutions/?day")) { 
            
            document.getElementById("adventTitle").innerHTML = `Solutions for ${url.slice(15)} December`;
        }
        data.forEach(sol => {
            insertCard(sol)
        });

    }).catch(err => {
        throw err;
    });
}


const displayUser = (user) => {
    let name = user.slice(6)
    console.log(name)
    fetch("https://cors.io/?http://91.121.210.171:42550/solutions/all").then(response => {
        return response.json();
    }).then(data => {
        document.getElementById("solutions").innerHTML = ``;
        if (data.length < 1) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
        }
        document.getElementById("adventTitle").innerHTML = `${name}'s Solutions`;
        data.forEach(sol => {
            if (sol.userName === name) {
                insertCard(sol)
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


const insertCard = (sol) => {
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
                        <a class="text-white" href="#" onclick="playerModal('${sol.userName}')" id="userNameHolder">${sol.userName}</a>
                    </h5>
                    <a href=${sol.url} target="_blank" class="btn btn-outline-warning btn-sm mt-3 mb-0">View Solution</a>
                </div>
            </div>
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

playerModal = (u) => {
    document.getElementById("userModal-points").innerHTML =
        `<i class="fa fa-spinner fa-spin" style="color: #D4AF37; font-size: 0.8em"></i>`;
    fetch("https://cors.io/?http://91.121.210.171:42550/user").then(response => {
        return response.json();
    }).then(data => {
        let obj = data.find(obj => obj.username === u);
        document.getElementById("userModal-points").innerHTML = "Points: " + obj.point;

    }).catch(err => {
        throw err;
    });
    $('#student').modal('show');
}
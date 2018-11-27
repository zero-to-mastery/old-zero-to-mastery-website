let currentUrl;

let currentView = document.getElementById('toggler').innerHTML.trim();

const stats = async () => {
    fetch("https://cors.io/?http://91.121.210.171:42551/data").then(response => {
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
    fetch("https://cors.io/?http://91.121.210.171:42551/user").then(response => {
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
    fetch("https://cors.io/?http://91.121.210.171:42551/" + url).then(response => {
        return response.json();
    }).then(data => {
        
        document.getElementById("solutions").innerHTML = ``;
        if (data.length < 1) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
        }
        if(url.includes("solutions/all")) {
            currentUrl = "https://cors.io/?http://91.121.210.171:42551/solutions/all";
            document.getElementById("adventTitle").innerHTML = `All Student's Solutions`;
        }
        if(url.includes("solutions/?day")) { 
            console.log("url", url)
            currentUrl = url
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
    fetch("https://cors.io/?http://91.121.210.171:42551/solutions/all").then(response => {
        currentUrl = "https://cors.io/?http://91.121.210.171:42551/solutions/all";
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
    fetch("https://cors.io/?http://91.121.210.171:42551/user").then(response => {
        return response.json();
    }).then(data => {
        document.getElementById("solutions").innerHTML = `<div id="leaderboardd" class="w-100 bg-dark text-white p-3 m-3 text-left"><div class="row"></div></div>`;
        if (data.length < 1) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
        }
        document.getElementById("adventTitle").innerHTML = `Leaderboard`;

        function compare(a, b) {
            return b.point - a.point;
        }
         
          let points = data.sort(compare); console.log(points)
          points.forEach((u, i) => {
              let medal = "noMedal";
              if(i === 0) medal = "goldMedal"
              if(i === 1) medal = "silverMedal"
              if(i === 2) medal = "bronzeMedal"
            //   let avatar = (u.avatarUrl === null ? "../assets/images/advent/defaultAvatar.png" : u.avatarUrl)
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



const timeDifference = (current, previous) => {
    
    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;
    
    let elapsed = current - previous;
    
    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';
    }
    
    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' mins ago';
    }
    
    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
         return Math.round(elapsed/msPerDay) + ' days ago';
    }
    
    else if (elapsed < msPerYear) {
         return Math.round(elapsed/msPerMonth) + ' months ago';
    }
    
    else {
         return Math.round(elapsed/msPerYear ) + ' years ago';
    }
}


// current time
let currentTime = new Date();
let current= new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());
// alert(timeDifference(current, new Date(2011, 04, 24, 12, 30, 00, 00)));








const toggleCard = () => {
    if (currentView === 'List') {
        document.getElementById('toggler').innerHTML = "Card";
        currentView = "Card"
        // console.log(currentUrl)
        if (currentUrl === "https://cors.io/?http://91.121.210.171:42551/solutions/all") {
            onClick('clear');
        } else if (currentUrl.includes("day")) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Loading...</h3>`;
            fetchSolutions(currentUrl)
        } else {
            fetchSolutions("https://cors.io/?http://91.121.210.171:42551/" + currentUrl)
        }
    } else if (currentView === 'Card') {
        document.getElementById('toggler').innerHTML = 'List';
        currentView = "List"
        if (currentUrl === "https://cors.io/?http://91.121.210.171:42551/solutions/all") {
            onClick('clear');
        } else if (currentUrl.includes("day")) {
            document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Loading...</h3>`;
            fetchSolutions(currentUrl)
        } else {
            fetchSolutions("https://cors.io/?http://91.121.210.171:42551/" + currentUrl)
        }
    }
}

const insertCard = (sol) => {
    console.log('card enabled')

    // enable toggle button
    document.getElementById('toggler').disabled = false;

    let dbTime = new Date(sol.Time);

    let timeAgo = timeDifference(current, new Date(dbTime.getFullYear(), dbTime.getMonth(), dbTime.getDate(), dbTime.getHours(), dbTime.getMinutes(), dbTime.getSeconds(), dbTime.getMilliseconds()));

    // "https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png"
    let langName = "unknown";
    console.log(sol.langName)
    if(sol.langName) langName = sol.langName
    let dayImgUrl = "../assets/images/days/" + sol.dayNumber + ".png";
    let langImgUrl = "../assets/images/lang/" + langName.toLowerCase() + ".png";
    const tooltip = "Day-" + sol.dayNumber;
    const langToolTip = langName;
    let avatar = (sol.avatarUrl === null ? "../assets/images/advent/defaultAvatar.png" : sol.avatarUrl)
    let uName;
    if (sol.userName.length > 11) {
        uName = sol.userName.substring(0, 11)+"..."
    } else {
        uName = sol.userName
    }
    document.getElementById('solutions').insertAdjacentHTML('beforeend',
        `
        <div class="my-3 col-sm-6 col-md-4 col-lg-3">
            <div class="card adventCard">
                <img src=${langImgUrl} class="langIcon" title=${langToolTip}>
                <img src=${dayImgUrl} class="dayIcon" data-toggle="tooltip" data-placement="top" title=${tooltip}>
                <img class="card-img-top img-fluid" src=${avatar} alt=${sol.userName}>
                <div class="card-body text-center bg-dark">
                    <h5 class="card-title">
                        <a class="text-white" id="userNameHolder" title=${sol.userName}>${uName}</a>
                    </h5>
                    <a href=${sol.url} target="_blank" class="btn btn-outline-warning btn-sm mt-3 mb-0">View Solution</a>
                </div>
                <small class="py-2">Submitted ${timeAgo}<small>
            </div>
        </div>
    `)
}

const insertList = (sol) => {
    console.log('list enabled')

    // enable toggle button
    document.getElementById('toggler').disabled = false;

    let dbTime = new Date(sol.Time);

    let timeAgo = timeDifference(current, new Date(dbTime.getFullYear(), dbTime.getMonth(), dbTime.getDate(), dbTime.getHours(), dbTime.getMinutes(), dbTime.getSeconds(), dbTime.getMilliseconds()));

    let dayImgUrl = "../assets/images/days/" + sol.dayNumber + ".png";
    let langImgUrl = "../assets/images/lang/" + langName.toLowerCase() + ".png";
    const tooltip = "Day-" + sol.dayNumber;
    const langToolTip = langName;
    let avatar = (sol.avatarUrl === null ? "../assets/images/advent/defaultAvatar.png" : sol.avatarUrl)
    document.getElementById('solutions').insertAdjacentHTML('beforeend',
        `
        <div class="text-center col-sm-12 col-md-6 col-lg-6">
            <img class="listImg d-inline" src=${sol.avatarUrl}>
            <div class="leaderName d-inline pt-2">
            ${sol.userName}
            </div>
            <img src=${dayImgUrl} class="sizer" data-toggle="tooltip" data-placement="top" title=${tooltip}>
            <img src=${langImgUrl} class="sizer" title=${langToolTip}>
            <a href=${sol.url} target="_blank" class="btn btn-outline-warning btn-sm mb-0">View Solution</a><br>
            <small>Submitted ${timeAgo}<small>
            <hr class="leaderHr">
        </div>
        
    `)
}


// Modal Button Generator

//  time convertion to EST
let date = new Date();
let offset = -300; //Timezone offset for EST in minutes.
let estDate = new Date(date.getTime() + offset*60*1000);
let day = estDate.getDate();
console.log('est', estDate.getDate());


while (day > 0) {
    let dayBtn = "../assets/images/days/" + day + ".png";
    let link = `?day=` + day
    document.getElementById('calBtn').insertAdjacentHTML('beforeend',
        `
    <a  id=${link} onclick=onClick(this.id)><img src=${dayBtn}></a>
    
    `);
    day--
}
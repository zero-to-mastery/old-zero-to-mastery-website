// Function to fetch data
const letsFetch = async (url) => {
    let data = await fetch(url).then(async (response) => {
        return response.json();
    }).then(d => {
        return d
    }).catch(err => {
        throw err;
    });
    return data
}

let settins = { view: "card", curData: [], cron: "old"}

init = async () => {

    // Initialise Stats
    statObj = await letsFetch("https://cors.io/?http://91.121.210.171:42551/data");
    document.getElementById("statsTotal").innerHTML = statObj.all;
    document.getElementById("statsToday").innerHTML = statObj.day;
    document.getElementById("statsStudents").innerHTML = statObj.user;

    // Initialise Solutions
    soluObj = await letsFetch("https://cors.io/?http://91.121.210.171:42551/solutions/all");
    document.getElementById("adventTitle").innerHTML = `All Solutions`;
    drawCards(soluObj);
    settins.curData = soluObj

    // Initialise Users
    userObj = await letsFetch("https://cors.io/?http://91.121.210.171:42551/user");
    userList(userObj);

    // Generate Lang List
    let langArray = [];
    soluObj.forEach(sol => {
        if (!langArray.includes(sol.langName)) {
            langArray.push(sol.langName)
            document.getElementById("langFilter").insertAdjacentHTML('beforeend',
                `<a class="dropdown-item" id=?lang=${sol.langName} onclick=onClick(this.id)>${sol.langName}</a>`)
        }
    });
}

// Initialise the User List for Dropdown
const userList = (data) => {
    data.forEach(user => {
        document.getElementById("studentFilter").insertAdjacentHTML('beforeend',
            `<a class="dropdown-item" id="?user=${user.username}" onclick=onClick(this.id)>${user.username}</a>`)
    });
}

const drawCards = (d) => {

    document.getElementById("solutions").innerHTML = ""

    function compare(a, b) {
        if(settins.cron === "new") return b.dayNumber - a.dayNumber;
        if(settins.cron === "old") return a.dayNumber - b.dayNumber;
    }

    let sorted = d.sort(compare)

    if (settins.view === "card") {
        sorted.forEach(sol => {
            let langName = (sol.langName ? sol.langName : "unknown")
            let dbTime = new Date(sol.Time);
            let timeAgo = timeDifference(current, new Date(dbTime.getFullYear(), dbTime.getMonth(), dbTime.getDate(), dbTime.getHours(), dbTime.getMinutes(), dbTime.getSeconds(), dbTime.getMilliseconds()));
            let uName;
            if (sol.userName.length > 11) {
                uName = sol.userName.substring(0, 11)+"..."
            } else {
                uName = sol.userName
            }
            document.getElementById('solutions').insertAdjacentHTML('beforeend',
                `<div class="my-3 col-sm-6 col-md-4 col-lg-3">
            <div class="card adventCard">
                <img src=../assets/images/lang/${langName.toLowerCase()}.png 
                	class="langIcon" 
                	title="Written in: ${langName}"
                	onerror="this.src='../assets/images/lang/unknown.png';">
                <img src=../assets/images/days/${sol.dayNumber}.png class="dayIcon" data-toggle="tooltip" data-placement="top" title="Day ${sol.dayNumber}">
                <img class="card-img-top img-fluid" src=${sol.avatarUrl} alt=${sol.userName}>
                <div class="card-body text-center bg-dark">
                    <h5 class="card-title">
                        <a class="text-white" id="userNameHolder" title=${sol.userName}>${uName}</a>
                    </h5>
                    <a href=${sol.url} target="_blank" class="btn btn-outline-warning btn-sm mt-3 mb-0">View Solution</a>
                </div>
                <small class="py-2">Submitted ${timeAgo}<small>
            </div>
        </div>`
            )
        });
    } else if (settins.view === "list") {
        d.forEach(sol => {
            let langName = (sol.langName ? sol.langName : "unknown")
            let dbTime = new Date(sol.Time);
            let timeAgo = timeDifference(current, new Date(dbTime.getFullYear(), dbTime.getMonth(), dbTime.getDate(), dbTime.getHours(), dbTime.getMinutes(), dbTime.getSeconds(), dbTime.getMilliseconds()));

            document.getElementById('solutions').insertAdjacentHTML('beforeend',
                `
        <div class="text-center col-sm-12 col-md-6 col-lg-6">
            <img class="listImg d-inline" src=${sol.avatarUrl}>
            <div class="leaderName d-inline pt-2">
            ${sol.userName}
            </div>
            <img src=../assets/images/days/${sol.dayNumber}.png class="sizer" data-toggle="tooltip" data-placement="top" title="Day ${sol.dayNumber}">
            <img src=../assets/images/lang/${langName.toLowerCase()}.png class="sizer" title="Written in: ${langName}">
            <a href=${sol.url} target="_blank" class="btn btn-outline-warning btn-sm mb-0">View Solution</a><br>
            <small>Submitted ${timeAgo}<small>
            <hr class="leaderHr">
        </div>  
    `)
        });
    }
}

const toggleView = () => {
    if (settins.view === "card") {
        settins.view = "list"
        drawCards(settins.curData)
        document.getElementById('toggler').innerHTML = "Card";

    } else {
        settins.view = "card"
        drawCards(settins.curData)
        document.getElementById('toggler').innerHTML = "List";
    }
}

const toggleSortCron = () => {
    if(settins.cron === "old") {
        settins.cron = "new"
        document.getElementById('sortCron').innerHTML = "Newest First";
        drawCards(settins.curData)
    } else {
        settins.cron = "old"
        document.getElementById('sortCron').innerHTML = "Oldest First";
        drawCards(settins.curData)
    }
}

// Init Leaderboard
const leaderboard = (data) => {
    document.getElementById("solutions").innerHTML = `<div id="leaderboardd" class="w-100 bg-dark text-white p-3 m-3 text-left"><div class="row"></div></div>`;
    document.getElementById("adventTitle").innerHTML = `Leaderboard`;

    function compare(a, b) {
        return b.point - a.point;
    }

    let points = data.sort(compare)
    points.forEach((u, i) => {
        let medal = "noMedal";
        if (i === 0) medal = "goldMedal"
        if (i === 1) medal = "silverMedal"
        if (i === 2) medal = "bronzeMedal"
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
}

const filter = (a, b) => {
    filtered = [];
    soluObj.forEach(sol => {
        if (sol[a] === b) filtered.push(sol)
    });
    settins.curData = filtered;
    drawCards(filtered)
}

const onClick = async (param) => {
    // Reset Filter Buttons
    document.getElementById("sf").innerHTML = `Student Filter <i class="fas fa-caret-down"></i>`
    document.getElementById("df").innerHTML = `Date Filter`
    document.getElementById("lf").innerHTML = `Language Filter <i class="fas fa-caret-down"></i>`

    if (param === "clear") {
        document.getElementById("adventTitle").innerHTML = `All Solutions`;
        drawCards(soluObj);
    }
    else if (param === "leaderboard") {
        // disable toggle button
        document.getElementById('toggler').disabled = true;
        leaderboard(userObj)
    }
    else if (param === "solutions") {
        // disable toggle button
        document.getElementById('toggler').disabled = false;
        document.getElementById("solutions").innerHTML = ``;
        document.getElementById("adventTitle").innerHTML = `All Solutions`;
        drawCards(soluObj)
    }
    else {
        if (param.includes("user")) {
            document.getElementById("sf").innerHTML = `${param.slice(6)} <i class="fas fa-caret-down"></i>`
            document.getElementById("adventTitle").innerHTML = `${param.slice(6)}'s Solutions`;
            filter("userName", param.slice(6))
        }
        if (param.includes("day")) {
            document.getElementById("df").innerHTML = `Day ${param.slice(5)}`
            document.getElementById("adventTitle").innerHTML = `Day ${param.slice(6)}'s Solutions`;
            $('#exampleModal').modal('hide');
            filter("dayNumber", param.slice(5))
        }
        if (param.includes("lang")) {
            document.getElementById("lf").innerHTML = `${param.slice(6)} <i class="fas fa-caret-down"></i>`
            document.getElementById("adventTitle").innerHTML = `Solutions written in ${param.slice(6)}`;
            filter("langName", param.slice(6))
        }
    }
}

init()

const timeDifference = (current, previous) => {

    let msPerMinute = 60 * 1000;
    let msPerHour = msPerMinute * 60;
    let msPerDay = msPerHour * 24;
    let msPerMonth = msPerDay * 30;
    let msPerYear = msPerDay * 365;

    let elapsed = current - previous;

    if (elapsed < msPerMinute) {
        return Math.round(elapsed / 1000) + ' seconds ago';
    }

    else if (elapsed < msPerHour) {
        return Math.round(elapsed / msPerMinute) + ' mins ago';
    }

    else if (elapsed < msPerDay) {
        return Math.round(elapsed / msPerHour) + ' hours ago';
    }

    else if (elapsed < msPerMonth) {
        return Math.round(elapsed / msPerDay) + ' days ago';
    }

    else if (elapsed < msPerYear) {
        return Math.round(elapsed / msPerMonth) + ' months ago';
    }

    else {
        return Math.round(elapsed / msPerYear) + ' years ago';
    }
}

// Date Modal Init
// Time convertion to EST
let date = new Date();
let offset = -300; //Timezone offset for EST in minutes.
let estDate = new Date(date.getTime() + offset * 60 * 1000);
let day = (estDate.getDate() > 25 ? 25 : estDate.getDate())
// current time
let currentTime = new Date();
let current = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), currentTime.getHours(), currentTime.getMinutes(), currentTime.getSeconds(), currentTime.getMilliseconds());


while (day > 0) {
    let dayBtn = "../assets/images/days/" + day + ".png";
    let link = `?day=` + day
    document.getElementById('calBtn').insertAdjacentHTML('beforeend',
        `<a  id=${link} onclick=onClick(this.id)><img src=${dayBtn}></a>`);
    day--
}
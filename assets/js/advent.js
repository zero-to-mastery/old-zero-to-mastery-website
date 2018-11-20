
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

// Fetch Users
const users = async () => {
    fetch("https://cors.io/?http://91.121.210.171:42550/user").then(response => {
        return response.json();
    }).then(data => {
        data.forEach(user => {
            let uLink = "?user=" + user.username
            document.getElementById("studentFilter").insertAdjacentHTML('beforeend',  
            `<a class="dropdown-item" href=${uLink}>${user.username}</a>`)
        });
    }).catch(err => {
        throw err;
    });
}
users()

// Fetch Solution
const fetchSolutions = (url) => {
    fetch("https://cors.io/?http://91.121.210.171:42550/" + url).then(response => {
        return response.json();
    }).then(data => {
       if(data.length < 1) {
        document.getElementById("solutions").innerHTML = `<h5 class="p-5 m-5">Nothing to display</h5>`;
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
       if(data.length < 1) {
        document.getElementById("solutions").innerHTML = `<h5 class="p-5 m-5">Nothing to display</h5>`;
       }
        data.forEach(sol => {
            if(sol.userName === name){
            insertCard(sol)
            }
        });
        
    }).catch(err => {
        throw err;
    });
}


const qIndex = window.location.href.indexOf("?")
let qParam = (qIndex === -1 ? "solutions/all" : window.location.href.slice(qIndex))
if(qParam.includes("?day=")) fetchSolutions("solutions/" + qParam)
if(qParam.includes("?user=")) displayUser(qParam)
if(qParam === "solutions/all") fetchSolutions(qParam)
console.log(qParam)


const insertCard = (sol) => {
    let dayImgUrl = "../assets/images/days/" + sol.dayNumber + ".png";
    const tooltip = "Day-" + sol.dayNumber
    console.log("111",Object.keys(sol).length)
    if(Object.keys(sol).length === 0){
        console.log("NOPE")
    }
    document.getElementById('solutions').insertAdjacentHTML('beforeend', 
    `
        <div class="my-3 col-sm-6 col-md-4 col-lg-3">
            <div class="card adventCard">
                <img src="https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png" class="langIcon">
                <img src=${dayImgUrl} class="dayIcon" data-toggle="tooltip" data-placement="top" title=${tooltip}>
                <img class="card-img-top img-fluid" src=${sol.avatarUrl} alt=${sol.userName}>
                <div class="card-body text-center bg-dark">
                    <h5 class="card-title">
                        <a class="text-white"' href="#" onclick='playerModal()'>${sol.userName}</a>
                    </h5>
                    <a href=${sol.url} class="btn btn-outline-warning btn-sm mt-3 mb-0">View Solution</a>
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
    <a href=${link}><img src=${dayBtn}></a>
    

    `);
  day --
}

playerModal = (u) => {
    fetch("https://cors.io/?http://91.121.210.171:42550/user").then(response => {
        return response.json();
    }).then(data => {
        let obj = data.find(obj => obj.username === "Mattchow");
        document.getElementById("userContent").innerHTML = `<h5 class="p-5 m-5">Points: ${obj.point}</h5>`;
        console.log("User Obj", obj)
    }).catch(err => {
        throw err;
    });
    $('#student').modal('show');
}
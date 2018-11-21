
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
            `<a class="dropdown-item" id=${uLink} onclick=onClick(this.id)>${user.username}</a>`)
        });
    }).catch(err => {
        throw err;
    });
}
users()

const onClick = (param) => {
    document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Loading...</h3>`;
    if(param === "clear") fetchSolutions("solutions/all");
    if(param.includes("user")) displayUser(param);
    if(param.includes("day")) {
        $('#exampleModal').modal('hide');
        fetchSolutions("solutions/"+param)
    }

    console.log("Clicked", param)
}

// Fetch Solution
const fetchSolutions = (url) => {
    fetch("https://cors.io/?http://91.121.210.171:42550/" + url).then(response => {
        return response.json();
    }).then(data => {
        document.getElementById("solutions").innerHTML = ``;
       if(data.length < 1) {
        document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
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
       if(data.length < 1) {
        document.getElementById("solutions").innerHTML = `<h3 class="my-5 w-100">Nothing to display</h3>`;
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
  day --
}

playerModal = (u) => {
    console.log(u)
    document.getElementById("userModal-points").innerHTML = 
    `<i class="fa fa-spinner fa-spin" style="color: #D4AF37; font-size: 0.8em"></i>`;
    fetch("https://cors.io/?http://91.121.210.171:42550/user").then(response => {
        return response.json();
    }).then(data => {
        let obj = data.find(obj => obj.username === u);
        document.getElementById("userModal-points").innerHTML = "Points: "+obj.point;
        // document.getElementById("userContent").innerHTML = 
        // `<h5 class="p-5">Name: ${obj.username}</h5>
        // <h5 class="p-5">Points: ${obj.point}</h5>`;
        console.log("User Obj", obj)
    }).catch(err => {
        throw err;
    });
    $('#student').modal('show');
}
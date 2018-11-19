
let url = window.location.href
let paramLocation = url.indexOf("1")
let selection = url.slice(url.indexOf("?"))
console.log("selection", selection)
let fetchLink = (selection === "l" ? "https://cors.io/?http://91.121.210.171:42550/solutions/all" : `https://cors.io/?http://91.121.210.171:42550/solutions/${selection}`)

const dataFetch1 = () => {
    fetch(fetchLink).then(response => {
        return response.json();
    }).then(data => {
        data.forEach(sol => {
            console.log(sol)
            let dayImgUrl = "../assets/images/days/" + sol.dayNumber + ".png";
            console.log(dayImgUrl)
            document.getElementById('solutions').insertAdjacentHTML('beforeend', 
            `
            <div class="card coursecard">
            <img src="https://cdn2.iconfinder.com/data/icons/nodejs-1/512/nodejs-512.png" class="langIcon">
            <img src=${dayImgUrl} class="dayIcon">
            <img class="card-img-top" src=${sol.avatarUrl}
                alt="Card image cap">
            <div class="card-body text-center">
                <h5 class="card-title">${sol.userName}</h5>
                <a href=${sol.url} class="btn btn-outline-primary mt-3 mb-0">View Solution</a>
            </div>
        </div>
            `);

        });
    }).catch(err => {
        throw err;
    });
}

dataFetch1();

let date = new Date();
let day = date.getDate()
console.log(day)

while (day > 0) {
    let dayBtn = "../assets/images/days/" + day + ".png";
    let link = `?day=` + day
    document.getElementById('calBtn').insertAdjacentHTML('beforeend', 
    `
    <a href=${link}><img src=${dayBtn}></a>
    

    `);
  day --
}


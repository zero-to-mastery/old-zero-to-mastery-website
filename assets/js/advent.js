const url = window.location.href
const paramIndex = url.indexOf("?")
const fetchLink = (paramIndex === -1 ? "https://cors.io/?http://91.121.210.171:42550/solutions/all" : `https://cors.io/?http://91.121.210.171:42550/solutions/${url.slice(paramIndex)}`)



const fetchSolutions = () => {
    fetch(fetchLink).then(response => {
        return response.json();
    }).then(data => {
        data.forEach(sol => {


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
                        <h5 class="card-title">${sol.userName}</h5>
                        <a href=${sol.url} class="btn btn-outline-warning btn-sm mt-3 mb-0">View Solution</a>
                    </div>
                </div>
            </div>
            `);

        });
    }).catch(err => {
        throw err;
    });
}

fetchSolutions();


// Modal Button Generator
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




const dataFetch = () => {
	fetch('http://91.121.210.171:42550/solutions/all', {
        
        mode: "no-cors", // no-cors, cors, *same-origin
   
    }).then(response => {
	  	return response.json()
	}).then(data => {
	  	console.log(data)
	}).catch(err => {
	  	throw err;
	});
}

dataFetch();

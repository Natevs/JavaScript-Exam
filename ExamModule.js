const http = require('http');
const host = ('git.ucc.uwm.edu');

function getData(endpoint) {
    return new Promise((resolve, reject) => {
        let options = {
            host: host,
            path: endpoint
        };
        http.get(options, (res) => {//Assignment Example

            var responseString = ''; //String variable to which we will add the data when it arrives

            res.on('data', (data) => { //Callback called when data arrives from the server
                responseString += data;
            });

            res.on('end', () => { //Callback called when the request is completed
                resolve(JSON.parse(responseString)); //JSON.parse() converts the string data into a JavaScript object
            });
        }).on('error', (err) => { //Callback called when an error occurs
            reject(err);
            console.log(err.message);
        })
    });
}

function calcTotalRevenue(orderEndPoint) {
    return new Promise((resolve, reject) => {
        getData(orderEndPoint)
            .then(orderInfo => {

                var totalRevenue = 0;

                orderInfo.forEach(orderObj => {

                    totalRevenue += orderObj.price
                })
                console.log('The total revenue is ' + totalRevenue)
            })
    })
        .catch(error => {
            console.log(error);
        });
}

module.exports = {//  exports functions to App
    getData,
    calcTotalRevenue
}
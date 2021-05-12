var client;

// sends data to client line by line. converts 'JSON' to 'csv' format
function sendDataToServer(data) {
    var keys = Object.keys(data);
    var n = data[keys[0]].length;
    var line = '';
    for (col of keys) {
        line += col + ',';
    }
    line = line.slice(0,-1);
    line += '\n';
    client.write(line);

    for (var i = 0; i < n; i++) {
        line = '';
        for (col of keys) {
            line += data[col][i] + ',';
        }
        // remove last ','
        line = line.slice(0,-1);
        line += '\n';
        client.write(line);
    }
    client.write("done\n");
}

function doModelStuffz(userInput) {
    connectToAnomalyServer();
    client.write("1\n");

   
    if (userInput.algorithm == "Simple") {
        client.write("1\n");
    }
    else if (userInput.algorithm == "Hybrid") {
        client.write("2\n");
    }
    client.write("2\n");
    sendDataToServer(userInput.train_data);
    sendDataToServer(userInput.detect_data);


    //client.destroy();
}

function connectToAnomalyServer() {
    var net = require('net');
    client = new net.Socket();
    client.connect(5555, '127.0.0.1', function() {
        console.log("Connected!");
    });

    client.on('data', function(data) {
        console.log('Received: ' + data);
    });

    client.on('close', function() {
        console.log('Connection closed');
    });
}

module.exports.doModelStuffz = doModelStuffz;
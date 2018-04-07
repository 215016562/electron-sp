const Serialport = require('serialport'); 
Serialport.list((err, ports) => { 
    ports.forEach((port) => { 
        console.log(port.comName); 
    });
}); 
let cnt = 0; 
setInterval(() => { 
    document.getElementById('cnt').textContent = cnt;
     cnt++; 
    }, 1000)

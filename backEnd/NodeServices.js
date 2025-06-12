var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'IPScanService',
  description: 'The nodejs.org example web server.',
  script: 'D:\\Rao_Projects\\IPScan\\backEnd\\server\\server.js'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();
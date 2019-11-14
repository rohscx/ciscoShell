const sshShell = require('./lib/sshShell.js');
const md5Result = require('./lib/md5ResultParser.js');
const bootPath = require('./lib/bootPathParser.js');
const hostName = require('./lib/hostNameParser.js');
const acaSwitches = require('./import/acaSwitches.js');
const {objectKeyFilter} = require('nodeutilz');
const dotenv = require('dotenv').config()

const hostArray = ["10.121.220.10", "10.121.220.9", "10.121.221.9", "10.121.222.9", "10.121.223.10", "10.121.223.65", "10.121.225.10", "10.121.225.9", "10.121.228.9", "10.121.231.9", "10.121.232.9", "10.121.234.9", "10.121.236.10", "10.121.236.9", "10.121.237.10", "10.121.237.9", "10.121.239.9", "10.121.241.10", "10.121.241.9"];
const userName = dotenv.parsed.SSH_USERNAME;
const userPassword = dotenv.parsed.SSH_PASSWORD;


// just run a check to see if the boot image is correct
const test = true;

acaSwitches.forEach( (fE,i) => {
    const generalCommands = ['show terminal | in Length','terminal length 0','show boot | i BOOT.*path-list','dir | i .universal','terminal length 80','logout'];
    const md5VerifyCommands2960 = ['verify /md5 flash:c2960x-universalk9-mz.152-4.E7/c2960x-universalk9-mz.152-4.E7.bin c8148471111b33794391521dadb47ed6'];
    const md5VerifyCommands3560 = ['verify /md5 flash:c3560e-universalk9-mz.152-4.E7.bin b0b6f92755df8338231db3b8599891d2'];
    
    if (test == true) {
            // run this first and get a result
        // mostly a test to see if the boot file is correct
        sshShell({host: fE, userName, password: userPassword, commands: generalCommands, debug:false})
        .then(hostName)
        .then(bootPath)
        .then((t) => objectKeyFilter(t,['host', 'hostName', 'userName', 'bootPath']))
        .then(console.log)
        .catch(console.log)
    } else {
        // run this next and get a result
        // checks boot imgage MD5
        sshShell({host: fE, userName, password: userPassword, commands: md5VerifyCommands3560, debug:false})
        .then(md5Result)
        .then((t) => objectKeyFilter(t,['host', 'md5Status']))
        .then(console.log)
        .catch(console.log)
    }

})








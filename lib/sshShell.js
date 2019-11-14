const SSH2Shell = require ('ssh2shell');

module.exports = function (data){
    const {host, userName, password, commands, debug = false} = data;
    return new Promise ((resolve,reject) => {
        if (!host||!userName||!password) reject('Missing Auth')
        const config = {
            server: {
               host,
               port: "22",
               userName,
               password,
               hashMethod: "md5", 
               readyTimeout: 50000,
               tryKeyboard: true,
               algorithms: {
                  kex: [
                     'diffie-hellman-group1-sha1',
                     'ecdh-sha2-nistp256',
                     'ecdh-sha2-nistp384',
                     'ecdh-sha2-nistp521',
                     'diffie-hellman-group-exchange-sha256',
                     'diffie-hellman-group14-sha1'],
                  cipher: [
                     'aes128-ctr',
                     'aes192-ctr',
                     'aes256-ctr',
                     'aes128-gcm',
                     'aes128-gcm@openssh.com',
                     'aes256-gcm',
                     'aes256-gcm@openssh.com',
                     'aes256-cbc' ]
                  }
               },
               commands,
               msg: {
                  send: function ( message ) {
                     console.log("message: " + message);
                  },
                  resolve: function (message ) {
                      resolve(message);
                  }
               },
               verbose: debug,
               debug: debug,
               idleTimeOut: 10000,
               ["keyboard-interactive"]: function(name, instructions, instructionsLang, prompts, finish){
                  console.log('Connection :: keyboard-interactive');
                  console.log(prompts);
                  finish(["<password>"]);
               },
               onEnd: function( sessionText, sshObj ) {
                    // treat these as debugs
                    //sshObj.msg.send("--------- onEnd has ------------");
                    //sshObj.msg.send(sessionText);
                    sshObj.msg.resolve({host,userName,sessionText});
               }
         
         };

        //Create a new instance
         SSH = new SSH2Shell(config);
         
         //Start the process
         SSH.connect();
    });
}

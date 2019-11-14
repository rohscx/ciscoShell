module.exports = function (data) {
    return new Promise ((resolve,reject) => {
        const {host,userName,sessionText} = data;
        /*
            generates a multidmentional array [[],[],[[],[],[]]]
            filtes the periods out and split on new lines
        */
        const hostNameSplit = sessionText.split(new RegExp(/\r\n|\n/)).filter((f) => f.length > 0);
        // contains an array of the results
        const hostName = hostNameSplit[3].split('#')[0];
        resolve({...data,hostName});
    })
}
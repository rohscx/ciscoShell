module.exports = function (data) {
    return new Promise ((resolve,reject) => {
        const {host,userName,sessionText} = data;
        /*
            generates a multidmentional array [[],[],[[],[],[]]]
            filtes the periods out and split on new lines
        */
        const md5Split = sessionText.split(new RegExp(/(.)\1{9,}/)).filter((f) => f.length > 0).map((d) => d.split(new RegExp(/\r\n|\n/)).filter((f) => f.length > 0));
        // contains an array of the results
        const md5Status = md5Split[2][1].search('Verified') != -1 ? 'Verified' : 'Error';
        resolve({...data,md5Status});
    })
}
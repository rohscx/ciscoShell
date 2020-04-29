module.exports = function(data) {
    return new Promise((resolve, reject) => {
        const { host, userName, sessionText } = data;
        /*
            generates a multidmentional array [[],[],[[],[],[]]]
            filtes the periods out and split on new lines
        */
        const pathSplit = sessionText
            .split(new RegExp(/\r\n|\n/))
            .filter((f) => f.length > 0);
        // contains an array of the results
        const bootPath = pathSplit[4]; //pathSplit[2][1].search('Verified') != -1 ? 'Verified' : 'Error';
        resolve({ ...data, bootPath });
    });
};

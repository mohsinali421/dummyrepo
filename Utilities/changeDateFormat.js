// Convert Date format of DD/MM/YYYY to MM/DD/YYYY

const ConvertDateFormat = (d) => {

    var date = d.split('/')[0]
    var month = d.split('/')[1]
    var year = d.split('/')[2]
    const newdate = month + '/' + date + '/' + year
    return newdate;
    
};

module.exports = ConvertDateFormat;

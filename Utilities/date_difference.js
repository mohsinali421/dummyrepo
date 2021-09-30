// 1st you have to convert dates into String like -> currentDate().toString()  then pass the dates
// Format of "d1" date should be 25/01/2020 (DD/MM/YYYY)
// Formate of "d2" date should be 01/25/2020 (MM/DD/YYYY)


const GetDateDifference = (d1, d2) => {

    const monthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let d, m, y;

    let date1 = d1.split('/');
    let dt1 = {
        d: parseInt(date1[0]),
        m: parseInt(date1[1]),
        y: parseInt(date1[2])
    };

    let date2 = d2.split('/');
    let dt2 = {
        d: parseInt(date2[1]),
        m: parseInt(date2[0]),
        y: parseInt(date2[2])
    };

    // This function counts number of leap years before the given date 
    countLeapYears = (d) => {
        let years = d.y;
        if (d.m <= 2)
            years--;
        return years / 4 - years / 100 + years / 400;
    }

    // find out the difference between date
    getDifference = (dt1, dt2) => {
        // COUNT TOTAL NUMBER OF DAYS BEFORE FIRST DATE 'dt1' 
        let n1 = dt1.y * 365 + dt1.d;
        for (let i = 0; i < dt1.m - 1; i++)
            n1 += monthDays[i];

        // Since every leap year is of 366 days, Add a day for every leap year 
        n1 += parseInt(countLeapYears(dt1));

        // COUNT TOTAL NUMBER OF DAYS BEFORE 2ND DATE 'dt2' 
        let n2 = dt2.y * 365 + dt2.d;
        for (let i = 0; i < dt2.m - 1; i++)
            n2 += monthDays[i];

        n2 += parseInt(countLeapYears(dt2));

        // return difference between two counts 
        return (n2 - n1);
    }

    let dateDiff = getDifference(dt1, dt2);
    return dateDiff;
}

module.exports = GetDateDifference;
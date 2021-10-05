const express = require('express');
const app = express();
const JdtoPDF = require('./function/JDuploadS3PDF');

app.set('view engine','ejs');
app.set('views','views');

app.get('/',(req,res)=>{
    res.render('jobdescription')
})
app.get('/pdf',(req,res)=>{
    JdtoPDF( downloadURL => {
        return res.status(200).json({  downloadURL });
    });
})
app.get('/posted',(req,res)=>{
    const changeDateFormat = require('./Utilities/changeDateFormat');
    const DateDifference = require('./Utilities/date_difference');

    const posted =  "2021-09-30T05:33:42.886";   //element.createdAt
    const mydate = new Date(posted);

    jobDate = mydate.getDate()
    jobMonth = mydate.getMonth()
    jobYear = mydate.getFullYear()

    const d1 = `${jobDate}/${jobMonth}/${jobYear}`

    var t = Date.now()
    const nowDate = new Date(t)

    postedDate = nowDate.getDate()
    postedMonth = nowDate.getMonth()
    postedYear = nowDate.getFullYear()

    const d2 = `${postedMonth}/${postedDate}/${postedYear}`

    console.log(d1,d2)
    const numberofDays = DateDifference(d1,d2);

    console.log(numberofDays)
    res.json({datePosted:numberofDays})
})

app.listen(3000,()=>{
    console.log(`server running at 3000....`)
})

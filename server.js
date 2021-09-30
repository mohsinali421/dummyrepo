const express = require('express');
const app = express();
const JdtoPDF = require('./function/JDuploadS3PDF');

app.get('/',(req,res)=>{
    res.json('server started now')
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
    const d1 = new Date(posted).toLocaleDateString();

    var t = Date.now()
    const d = new Date(t).toLocaleDateString();
    const d2 = changeDateFormat(d);

    const numberofDays = DateDifference(d1,d2);

    console.log(numberofDays)
    res.json({datePosted:numberofDays})
})

app.listen(3000,()=>{
    console.log(`server running at 3000....`)
})

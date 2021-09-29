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

app.listen(3000,()=>{
    console.log(`server running at 3000....`)
})

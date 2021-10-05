const express = require('express');
const app = express();
const JdtoPDF = require('./function/JDuploadS3PDF');

app.set('view engine','ejs');
app.set('views','views');

app.get('/',(req,res)=>{
    res.render('jobdescription',{
        companyLogo : '',
        companyName: 'Lineupx pvt ltd',
        projectName: 'Internal',
        profile: 'Web Developer',
        designation: 'Senior',
        experienceImg : "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/experience.png",
        experience: 2 + ' to '+ 3 + ' years',
        ctcImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/ctc.png",
        ctc: 5+ ' to ' + 7 + ' Lakhs',
        jobImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/job.png",
        joblocation: 'Delhi, Mumbai',
        openingImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/openings.png",
        openings: 3,
        joiningImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/joining.png",
        joiningdate:  11-02-1998,
        daysleftImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/4daysleft.png",
        jobtypeImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/jobtype.png",
        jobtype: 'Permanent',
        rolesImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/roles.png",
        rolesAndResponsibilities: 'Should know the coding part',
        eligibilityImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/eligibility.png",
        checkImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/checkgreen.png",
        eligibility:['There is some eligibility.','this one','another'],
        requirements: 'I dont know the requirements',
        skillsImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/skills.png",
        skills: ['coding','writing','reading'],
        foundedIn: 1998,
        industry: 'IT',
        Funding: 1200,
        websiteLink: 'www.lineupx.com',
        LinkedInLink: 'www.lineupx.com',
        linkImg: "https://lineupx-storage.s3.ap-south-1.amazonaws.com/s3uploads/visitlinkedin.png",
        workweek: 3,
        aboutcompany: 'This is the about of company',
        companyImage1: '',
        companyImage2: ' ',
        companyImage3: ' '
    })
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

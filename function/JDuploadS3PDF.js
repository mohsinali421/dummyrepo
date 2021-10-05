const fs = require('fs');
var path = require('path');
const ejs = require('ejs');
const pdf = require('html-pdf');
const AWS  = require('aws-sdk');

const JdtoPDF = async (cb)=>{
    const s3 = new AWS.S3({
        accessKeyId: 'AKIA6GT7NWRIB7TTF3F7',
        secretAccessKey: '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',
        region: 'ap-south-1'
      });
    try {
        const data = {
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
        }
        const filePathName = path.resolve(__dirname, '../views/jobdescription.ejs');
        const htmlString = fs.readFileSync(filePathName).toString();
        let  options = { 
            "width": "1200px",
            "height": "2000px"
        };
        const ejsData = ejs.render(htmlString,data);
        await pdf.create(ejsData, options).toStream((err,response)=>{
            if (err) return console.log('the pdf conversion err is :: ',err);
            return new Promise((resolve, rej) => {
                const uploadParams = {
                    Bucket: 'mohsinalilineupx',
                    Key: `Job_Description-12345.pdf`,
                    ACL: 'public-read-write',
                    Body: response,
                  };
                  s3.upload(uploadParams, (err, data) => {
                    if (err) {
                        console.log("S3 upload error :: ", err);
                        return err;
                      rej('');
                    }
                   const downloadURL =  data.Location;
                   cb(downloadURL);
                    });

                });
               
           
        });
    }
    catch (err) {
        console.log("Error processing request: " + err);
        return "NO url"
    }
    
};


module.exports = JdtoPDF;
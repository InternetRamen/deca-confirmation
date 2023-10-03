const { google } = require("googleapis");
require("dotenv").config();
const nodemailer = require("nodemailer");

(async ()=> {
    

    const auth = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        null,
        process.env.PRIVATE_KEY,
        ["https://www.googleapis.com/auth/spreadsheets"],
    );

    const sheets = google.sheets({ version: "v4", auth });

    const range = `Sheet1!A:C`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range,
    });
    let rows = response.data.values;
   
    rows.shift();
    rows = rows.filter(val => val[0] !== "PENDING" && val[2] !== "1")

    const client = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    rows.forEach(val => {
        client.sendMail({
            from: "Poolesville DECA",
            to: val[0],
            subject: "[URGENT] DECA Online Membership Confirmation",
            text: `Please confirm your membership by clicking on this link.\nhttps://deca.jaden.mov/confirmation?id=${val[1]}`,
        }).then(() => {
            console.log(`Sent email to ${val[0]}`)
        }).catch(err => {
            console.error(err)
        })
    })
})()
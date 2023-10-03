import { google } from "googleapis";
export async function POST(req: Request, res: Response) {
    const body = await req.json();
    
    const auth = new google.auth.JWT(
        process.env.CLIENT_EMAIL,
        undefined,
        process.env.PRIVATE_KEY,
        ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    const A2C = `Sheet1!A:E`;

    const response = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SHEET_ID,
        range: A2C,
    });
    let rows = response.data.values;
    const id = body.id;
    const index = rows?.findIndex((val) => val[1] === id);
    if (!index) return new Response("not found", {
        status: 404
    });

    if (rows && rows[index][3] + " " + rows[index][4] != body.name) return new Response("incorrect name", {
        status: 400
    });

    if (rows && rows[index][2] != "") return new Response("already confirmed", {
        status: 409
    });
    const range = `Sheet1!C${index + 1}`;
    
    const r = await sheets.spreadsheets.values.update({
        spreadsheetId: process.env.SHEET_ID,
        range,
        valueInputOption: "RAW",
        requestBody: {
            values: [["1"]],
        },
    });

    return new Response("success");
}

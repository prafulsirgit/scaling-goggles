const { google } = require("googleapis");
const credentials = require("../google-credentials.json"); 
const sheetId = process.env.GOOGLE_SHEET_ID; 

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

exports.appendApplication = async (data) => {
  try {
    const client = await auth.getClient(); 
    const sheets = google.sheets({ version: "v4", auth: client });

    const email = data.email; 

    // Fetch all existing applications in the sheet to check for duplicates
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: "Application!A2:A", // email column
    });

    const existingEmails = response.data.values || [];

    // Check if the email already exists in the sheet
    const isDuplicate = existingEmails.some((row) => row[0] === email);

    if (isDuplicate) {
      console.log("Duplicate entry found for email:", email);
      return {
        success: false,
        message:
          "Duplicate entry found. Please try with a different contact number/email.",
      }; 
    }
    // Otherwise, proceed to append the data to the sheet
    const values = [
      [
        data.email,
        data.name,
        data.gender,
        data.age,
        data.contactNumber,
        data.college,
        data.collegeAmbassador ? "Yes" : "No",
        data.domain,
        data.linkedinFollowed ? "Yes" : "No",
        data.screenshot || "N/A",
        data.referrerName || "N/A",
        data.agreedToTerms ? "Yes" : "No",
        new Date().toISOString(),
      ],
    ];

    const range = "Application!A1"; // Adjust based on your sheet and range needs

    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: range, // Use dynamic range
      valueInputOption: "USER_ENTERED",
      requestBody: { values },
    });

    console.log("Application data appended successfully:", appendResponse);
    return { success: true, message: "Application submitted successfully!" };
  } catch (error) {
    console.error("Error submitting application:", error);
    return {
      success: false,
      message: "Error submitting application. Please try again later.",
    };
  }
};

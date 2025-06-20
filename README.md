# Internship Management Backend API

A powerful Node.js + Express.js backend for managing internship applications and verifying digital certificates. Built for scale, speed, and simplicity — this API integrates seamlessly with Google Sheets and MongoDB for efficient data storage and lookup.
# Demo Video
https://github.com/user-attachments/assets/0e05132d-d5b4-41d7-aedc-7d7b28c6d6f9

## Features

- **Internship Application Submission**

  - Validates incoming data from students
  - Securely stores applications to Google Sheets using the Google Sheets API
  - Duplicate detection based on contact number

- **Certificate Management & Verification**

  - Admin-only route to add certificates (protected by API key)
  - Fast certificate lookup by unique `certId`
  - MongoDB-powered schema for flexible certificate structure

- Security & Middleware
  - Helmet for HTTP headers security
  - CORS enabled
  - API-key-based admin protection
  - Centralized input validation

## Tech Stack

| Layer        | Technology         |
| ------------ | ------------------ |
| Server       | Node.js + Express  |
| Database     | MongoDB + Mongoose |
| Spreadsheet  | Google Sheets API  |
| Auth (Admin) | API Key            |
| Validation   | Express Validator  |

---

## Installation

```bash
git clone https://github.com/your-username/internship-backend.git

cd internship-backend
npm install
```

## Create `.env` file:

```env
PORT=3000
MONGO_URI=mongodb+srv://your-cluster.mongodb.net/db-name
GOOGLE_SHEET_ID=your_google_sheet_id
ADMIN_API_KEY=supersecureadminkey
```

## Add `google-credentials.json`

Create a Google Service Account and place your credentials JSON file at the root or in a /config directory. Don’t forget to share your sheet with the service account email!

## To Run the Server

```bash
npm run dev
```

## API Endpoints

### Internship Application

| Method | Endpoint     | Description                   |
| ------ | ------------ | ----------------------------- |
| POST   | `/api/apply` | Submit internship application |

## Admin Certificate Management

| Method | Endpoint            | Description           |
| ------ | ------------------- | --------------------- |
| POST   | `/api/certificates` | Add a new certificate |

## Headers:

```vbnet
api-key: <your-admin-api-key>
```

### Certificate Verification

| Method | Endpoint                           | Description           |
| ------ | ---------------------------------- | --------------------- |
| GET    | `/api/certificates/verify/:certId` | Get certificate by ID |

## Example Request

POST `/api/apply`

```json
{
  "name": "Ritika Gupta",
  "gender": "Female",
  "age": 22,
  "contactNumber": "9876543210",
  "college": "Pawan Institute of Tech",
  "collegeAmbassador": true,
  "domain": "Web Development",
  "linkedinFollowed": true,
  "screenshot": "screenshot_url_or_file",
  "referrerName": "Ayush Sinha",
  "agreedToTerms": true
}
```

## Upcoming Features

- Email confirmations to applicants
- Document upload uploads
- PDF Certificate Generator (Like Courcera)

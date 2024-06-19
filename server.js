const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3002;

app.use(bodyParser.json());
app.use(cors());

app.post('/api/form', async (req, res) => {
 
  const {

    Last_Name,
    Email,
    Phone,
    Postal_Code,
    French,
    English,
    Educational_Institution,
    Study_Program,
    Time_Remaining,
    Skills,
    Company_Institution,
    Position,
    CV,
    Experience_description,
    Reference_Name,
    Reference_Phone_Number
  } = req.body;

  try {
    const zohoEndpoint = 'https://www.zohoapis.ca/crm/v6/Leads';
    const accessToken = '1000.ec5a5a05a9a113bb6ebfdc57553d5e85.91596e7cb5b9dbd4dabc3f3934098266';
    

    const response = await axios.post(
      zohoEndpoint,
      {
        data: [
          {
            Last_Name: Last_Name,
            Email: Email,
            Phone:Phone,
            Postal_Code:Postal_Code,
            French:French,
            English: English,
            Educational_Institution:Educational_Institution,
            Study_Program:Study_Program,
            Time_Remaining:Time_Remaining,
            Skills:Skills,
            Company_Institution:Company_Institution,
            Position:Position,
            CV:CV,
            Experience_description:Experience_description,
           Reference_Name:Reference_Name,
           Reference_Phone_Number:Reference_Phone_Number,
          },
        ],
      },
      {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`,
        },
      }
    );
    console.log('Zoho CRM API Response:', response.data);
    res.status(200).json({ success: true, data: response.data });

    if(res.status(200)){
      console.log(response.data.data[0].details.id)
      // uploadFile(response.data.data[0].details.id)
    }
    
  } catch (error) {
    console.error('Error connecting to Zoho CRM', error);
    res.status(500).json({ success: false, error: error.message });
  }
});



app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});



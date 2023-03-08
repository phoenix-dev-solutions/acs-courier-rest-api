# ACS Courier API - Node.js Client

A Node.js client for the ACS Courier REST API. Easily interact with the ACS Courier REST API using this library.

## Installation

```
npm install acs-courier-rest-api
```

```
yarn add acs-courier-rest-api
```

## Getting started

GET API credentials from <https://www.acscourier.net/>
.

Ask ACS Courier API endpoints and data that can be manipulated from <https://www.acscourier.net/>.

## Setup

Setup for the REST API integration :

```js
var ACSRestApi = require('acs-courier-rest-api');

const acs = new ACSRestApi({
  Company_ID: 'xxxx',
  Company_Password: 'xxxx',
  User_ID: 'xxxx',
  User_Password: 'xxxx',
  AcsApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  Billing_Code: 'xxxxxxxxx',
  PrintType: 2,
});
```

### Options

| Option             | Type      | Required | Description                                                                                                         |
| ------------------ | --------- | -------- | ------------------------------------------------------------------------------------------------------------------- |
| `Company_ID`       | `String`  | yes      | Your Company ID                                                                                                     |
| `Company_Password` | `String`  | yes      | Your Company_Password                                                                                               |
| `User_ID`          | `String`  | yes      | Your User ID                                                                                                        |
| `User_Password`    | `String`  | yes      | Your User Password                                                                                                  |
| `Billing_Code`     | `String`  | yes      | Your Billing Code. If multiple, override with params object in post request                                         |
| `AcsApiKey`        | `String`  | no       | Your Acs Api Key                                                                                                    |
| `PrintType`        | `String`  | no       | Voucher Print Type. Use 1 for thermal, 2 for Laser (A4 - 3x)                                                        |
| `encoding`         | `String`  | no       | Encoding, default is `utf-8`                                                                                        |
| `timeout`          | `Integer` | no       | Define the request timeout                                                                                          |
| `axiosConfig`      | `Object`  | no       | Define the custom [Axios config](https://github.com/axios/axios#request-config), also override this library options |

## Methods

### GET

- `.get(endpoint, data)`
- `.get(endpoint, data, params)`

| Params     | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `endpoint` | `String` | ACS Courier API endpoint, example: `contacts` or `products` |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
| `params`   | `Object` | Query strings params                                        |

### POST

- `.post(endpoint, data)`
- `.post(endpoint, data, params)`

| Params     | Type     | Description                                                 |
| ---------- | -------- | ----------------------------------------------------------- |
| `endpoint` | `String` | ACS Courier API endpoint, example: `contacts` or `products` |
| `data`     | `Object` | JS object to be converted into JSON and sent in the request |
| `params`   | `Object` | Query strings params                                        |

## Example of use

```js
var ACSRestApi = require('acs-courier-rest-api');

const acs = new ACSRestApi({
  Company_ID: 'xxxx',
  Company_Password: 'xxxx',
  User_ID: 'xxxx',
  User_Password: 'xxxx',
  AcsApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  Billing_Code: 'xxxxxxxxx',
  PrintType: 2,
});

// Create Voucher
const voucherData = {
  Pickup_Date: '2022-02-23',
  Sender: 'ESHOP',
  Recipient_Name: 'TEST RECIPIENT',
  Recipient_Address: 'P. RALLI',
  Recipient_Address_Number: 45,
  Recipient_Zipcode: '10680',
  Recipient_Region: 'Athens',
  Recipient_Phone: '2101234567',
  Recipient_Cell_Phone: '6971234567',
  Recipient_Country: 'GR',
  Acs_Station_Branch_Destination: 1,
  Charge_Type: 2,
  Item_Quantity: 1,
  Weight: 0.5,
  Cod_Ammount: 50.5,
  Acs_Delivery_Products: 'COD',
};
acs
  .post('ACS_Create_Voucher', voucherData)
  .then((response) => {
    // Successful request
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log('Response Status:', error.response.status);
    console.log('Response Headers:', error.response.headers);
    console.log('Response Data:', error.response.data);
  })
  .finally(() => {
    // Always executed.
  });

// Search contacts by Code
acs
  .post('ACS_Delete_Voucher', {
    Voucher_No: 7400000000,
  })
  .then((response) => {
    // Successful request
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log('Response Status:', error.response.status);
    console.log('Response Headers:', error.response.headers);
    console.log('Response Data:', error.response.data);
  })
  .finally(() => {
    // Always executed.
  });

// Create Pickup List
acs
  .post('ACS_Issue_Pickup_List', {
    Pickup_Date: '2023-02-23',
  })
  .then((response) => {
    // Successful request
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log('Response Status:', error.response.status);
    console.log('Response Headers:', error.response.headers);
    console.log('Response Data:', error.response.data);
  })
  .finally(() => {
    // Always executed.
  });

// Tracking Details
acs
  .post('ACS_TrackingDetails', {
    Voucher_No: 7400000000,
  })
  .then((response) => {
    // Successful request
    console.log('Response Status:', response.status);
    console.log('Response Headers:', response.headers);
    console.log('Response Data:', response.data);
  })
  .catch((error) => {
    // Invalid request, for 4xx and 5xx statuses
    console.log('Response Status:', error.response.status);
    console.log('Response Headers:', error.response.headers);
    console.log('Response Data:', error.response.data);
  })
  .finally(() => {
    // Always executed.
  });
```

## Release History

- 2023-02-23 - v1.0.0 - Initial release.

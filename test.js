var assert = require('assert');
const ACSRestApi = require('./index');
var expect = require('chai').expect;

const acs = new ACSRestApi({
  Company_ID: 'demo',
  Company_Password: 'demo',
  User_ID: 'demo',
  User_Password: 'demo',
  AcsApiKey: '5328eb0603974ac6bd4fc8339356dbf2',
  Billing_Code: '2ΑΘ999999',
  PrintType: 2,
});

const createVoucher = async function () {
  const voucherData = {
    Pickup_Date: new Date().toISOString().substring(0, 10),
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

  return await acs.post('ACS_Create_Voucher', voucherData);
};

const printVoucher = async function (vouchers) {
  const voucherData = { voucherno: vouchers, StartFromNumber: 1 };
  return await acs.get('ACS_Print_Voucher', voucherData);
};

describe('ACS Testing', function () {
  before('ACS_Create_Voucher', async function () {
    voucher = await createVoucher();
    voucherData = voucher.data?.ACSOutputResponce?.ACSValueOutput?.[0];
  });

  describe('ACS Create Voucher', function () {
    it('Should return status 200', function () {
      expect(voucher.status).to.equal(200);
    });

    it('ACSExecutionErrorMessage should be empty', function () {
      expect(voucher.data.ACSExecutionErrorMessage).to.equal('');
    });

    it('Error_Message should be empty', function () {
      expect(voucherData.Error_Message).to.equal('');
    });

    it('Voucher_No should not be empty', function () {
      assert.notEqual(voucherData.Voucher_No, null);
    });
  });

  describe('ACS Print Voucher', function () {
    before('ACS_print_Voucher', async function () {
      printVoucherData = await printVoucher(voucherData.Voucher_No);
    });

    it('Should return status 200', function () {
      expect(printVoucherData.status).to.equal(200);
    });

    it('error message should be empty', function () {
      assert.notEqual(printVoucherData.error, null);
    });

    it('Print link should not be empty', function () {
      assert.notEqual(printVoucherData.url.href, null);

      // console.log(printVoucherData.url.href);
    });
  });

  after('', async function () {
    console.log();
    console.log('--------------------');
    console.log(`Created Voucher No : ${voucherData.Voucher_No}`);
    console.log(`URL for pdf : ${printVoucherData.url.href}`);
    console.log('--------------------');
  });
});

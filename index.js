'use strict';

const axios = require('axios');
const pjson = require('./package.json');

/**
 * ACS Courier REST API wrapper
 *
 * @param {Object} opt
 */
class ACSRestApi {
  /**
   * Class constructor.
   *
   * @param {Object} opt
   */
  constructor(opt) {
    if (!(this instanceof ACSRestApi)) {
      return new ACSRestApi(opt);
    }

    opt = opt || {};

    if (!opt.Company_ID) {
      throw new OptionsException('Company Id is required');
    }

    if (!opt.Company_Password) {
      throw new OptionsException('Company Password is required');
    }

    if (!opt.User_Password) {
      throw new OptionsException('User Password is required');
    }

    if (!opt.Billing_Code) {
      throw new OptionsException('Billing Code is required');
    }

    if (!opt.AcsApiKey) {
      throw new OptionsException('AcsApiKey is required');
    }

    this.classVersion = pjson.version;

    this._setDefaultsOptions(opt);
  }
  /**
   * Set default options
   *
   * @param {Object} opt
   */

  _setDefaultsOptions(opt) {
    this.url =
      'https://webservices.acscourier.net/ACSRestServices/api/ACSAutoRest';
    this.getVoucherUrl =
      'https://acs-eud2.acscourier.net/Eshops/GetVoucher.aspx';
    this.getListUrl = 'https://acs-eud2.acscourier.net/Eshops/getlist.aspx';
    this.Company_ID = opt.Company_ID;
    this.Company_Password = opt.Company_Password;
    this.User_ID = opt.User_ID;
    this.User_Password = opt.User_Password;
    this.Billing_Code = opt.Billing_Code;
    this.AcsApiKey = opt.AcsApiKey;
    this.PrintType = opt.PrintType || 2;
    this.encoding = opt.encoding || 'utf8';
    this.timeout = opt.timeout;
    this.axiosConfig = opt.axiosConfig || {};
  }
  /**
   * Parse params object.
   *
   * @param {Object} params
   * @param {Object} query
   */

  _parseParamsObject(params, query) {
    for (const key in params) {
      const value = params[key];

      if (typeof value === 'object') {
        for (const prop in value) {
          const itemKey = key.toString() + '[' + prop.toString() + ']';
          query[itemKey] = value[prop];
        }
      } else {
        query[key] = value;
      }
    }

    return query;
  }

  /**
   * Get URL
   *
   * @param  {String} endpoint
   * @param  {Object} params
   *
   * @return {String}
   */

  _getUrl(endpoint, params = {}) {
    if (endpoint === 'ACS_Print_Voucher') return this.getVoucherUrl;
    else if (endpoint === 'ACS_Print_List') return this.getListUrl;
    else return this.url;
  }

  /**
   * Do requests
   *
   * @param  {String} method
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */

  _request(method, endpoint, data, params = {}) {
    const url = this._getUrl(endpoint, params);

    let options = {
      url: url,
      method: method,
      responseEncoding: this.encoding,
      timeout: this.timeout,
      responseType: 'json',
      headers: {
        'User-Agent': 'ACS Courier REST API - JS Client/' + this.classVersion,
        Accept: 'application/json',
        AcsApiKey: this.AcsApiKey,
      },
    };

    if (endpoint === 'ACS_Print_Voucher' || endpoint === 'ACS_Print_List') {
      try {
        const printUrl = new URL(url);
        printUrl.searchParams.append('MainID', this.Company_ID);
        printUrl.searchParams.append('MainPass', this.Company_Password);
        printUrl.searchParams.append('UserID', this.User_ID);
        printUrl.searchParams.append('UserPass', this.User_Password);

        if (
          endpoint === 'ACS_Print_Voucher' &&
          !data.hasOwnProperty('PrintType')
        )
          printUrl.searchParams.append('PrintType', this.PrintType);

        for (const key in data) {
          printUrl.searchParams.append(key, data[key]);
        }

        return { status: 200, error: '', url: printUrl };
      } catch (error) {
        return { status: 500, error, url: null };
      }
    } else {
      data = {
        ACSAlias: endpoint,
        ACSInputParameters: {
          Company_ID: this.Company_ID,
          Company_Password: this.Company_Password,
          User_ID: this.User_ID,
          User_Password: this.User_Password,
          Billing_Code: this.Billing_Code,
          ...data,
        },
      };

      if (endpoint !== 'ACS_Create_Voucher')
        delete data.ACSInputParameters.Billing_Code;
    }

    options.params = { ...options.params, ...params };

    if (data) {
      options.headers['Content-Type'] = 'application/json';
      options.data = JSON.stringify(data);
    }

    options = { ...options, ...this.axiosConfig };

    return axios(options);
  }
  /**
   * GET requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */

  get(endpoint, data, params = {}) {
    return this._request('get', endpoint, data, params);
  }

  /**
   * POST requests
   *
   * @param  {String} endpoint
   * @param  {Object} data
   * @param  {Object} params
   *
   * @return {Object}
   */

  post(endpoint, data, params = {}) {
    return this._request('post', endpoint, data, params);
  }
}
/**
 * Options Exception.
 */

module.exports = ACSRestApi;

class OptionsException {
  /**
   * Constructor.
   *
   * @param {String} message
   */
  constructor(message) {
    this.name = 'Options Error';
    this.message = message;
  }
}

exports.OptionsException = OptionsException;

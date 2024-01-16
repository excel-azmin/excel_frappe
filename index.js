const requestPromise = require('request-promise');
const querystring = require('querystring');
class ERPNext {
  constructor(options) {
    this.username = options.username;
    this.password = options.password;
    this.baseUrl = options.baseUrl;
    this.cookieJar = requestPromise.jar();
  }

  async login() {
    const formData = querystring.stringify({
      usr: this.username,
      pwd: this.password
    });
    const contentLength = formData.length;
    const res = await requestPromise.post({
      url: `${this.baseUrl}/api/method/login`,
      jar: this.cookieJar,
      body: formData,
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return res;
  }

  async createDocs(doctype, data) {
    await this.login();
    const formData = querystring.stringify({ data: JSON.stringify(data) });
    const contentLength = formData.length;
    const url = `${this.baseUrl}/api/resource/${doctype}`;
    const res = await requestPromise.post({
      url,
      jar: this.cookieJar,
      body: formData,
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const parsedData = JSON.parse(res);
    return parsedData.data;
  }

  async getDocs(doctype, fields, filters, order_by_name, pageSize, page) {
    var _this = this;
    return _this.login().then(function (res) {
      var start = (page - 1) * pageSize;
      var params = {
        url: _this.baseUrl + `/api/resource/${doctype}?fields=${fields}&filters=${filters}`,
        jar: _this.cookieJar,
        qs: {
          limit_start: start,
          limit_page_length: pageSize,
          order_by: order_by_name,
        },
        
      };
      return requestPromise.get(params).then(function (customers) {
        customers = JSON.parse(customers);
        var totalCustomers = customers.data.length;
        var customerNames = customers.data.map(function (customer) {
          return customer;
        });
        return {
          totalCustomers: totalCustomers,
          customers: customerNames,
          currentPage: page,
          pageSize: pageSize
        };
      });
    });
  }

  async getDocByName(resource, name) {
    await this.login();
    const url = `${this.baseUrl}/api/resource/${resource}/${name}`;
    const res = await requestPromise.get({
      url,
      jar: this.cookieJar
    });
    return await JSON.parse(res);
  }

  async getTotalDocs(doctype, fields, filters ) {
    var _this = this;
    return _this.login().then(function (res) {
      var params = {
        url: _this.baseUrl + `/api/method/frappe.client.get_count?doctype=${doctype}&filters=${filters}&fields=${fields}`,
        jar: _this.cookieJar,
      };
      return requestPromise.get(params).then(function (data) {
        return JSON.parse(data);
      });
    });
  }

  async updateDocsByName(doctype, name, data) {
    await this.login();
    const formData = querystring.stringify({ data: JSON.stringify(data) });
    const contentLength = formData.length;
    const url = `${this.baseUrl}/api/resource/${doctype}/${name}`;
    const res = await requestPromise.put({
      url,
      jar: this.cookieJar,
      body: formData,
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const parsedData = JSON.parse(res);
    return parsedData.data;
  }

  async deleteDocsByName(doctype, name) {
    await this.login();
    const url = `${this.baseUrl}/api/resource/${doctype}/${name}`;
    const res = await requestPromise.delete({
      url,
      jar: this.cookieJar,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    return JSON.parse(res);
  }
}

module.exports = ERPNext;

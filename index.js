const requestPromise = require('request-promise');
const querystring = require('querystring');
const Promise = require('bluebird');

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

  async get(resource, name = '') {
    await this.login();
    const url = `${this.baseUrl}/api/resource/${resource}/${name}`;
    const res = await requestPromise.get({
      url,
      jar: this.cookieJar
    });
    const parsedData = JSON.parse(res);
    return parsedData.data;
  }

  async post(resource, data) {
    await this.login();
    const formData = querystring.stringify({ data: JSON.stringify(data) });
    const contentLength = formData.length;
    const url = `${this.baseUrl}/api/resource/${resource}`;
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

  async put(resource, name, data) {
    await this.login();
    const formData = querystring.stringify({ data: JSON.stringify(data) });
    const contentLength = formData.length;
    const url = `${this.baseUrl}/api/resource/${resource}/${name}`;
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

  async getCustomersName(pageSize, page) {
    var _this = this;
    return _this.login().then(function (res) {
      var start = (page - 1) * pageSize;
      const url = 'http://excel_erpnext.localhost:8000/api/resource/Customer';
      const fields = '["name", "customer_name", "territory"]';
      const filters = '[["customer_name", "=", "SOURCE AND SERVICE - MOTIJHEEL"]]';
      var params = {
        url: _this.baseUrl + `/api/resource/Customer?fields=${fields}&filters=${filters}`,

        jar: _this.cookieJar,
        qs: {
          limit_start: start,
          limit_page_length: pageSize,
          order_by: "name asc",
        },
        
      };

      console.log(params.url)

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

  async getCustomerByName(name) {
    return this.get('Customer', name);
  }

  async createCustomer(data) {
    return this.post('Customer', data);
  }

  async updateCustomerByName(name, data) {
    return this.put('Customer', name, data);
  }

  async getTotalCount() {
    var _this = this;
    return _this.login().then(function (res) {
      const doctype = 'Sales Invoice';
      const fields = '["count"(`tabSales Invoice`.`name`) AS total_count ]';
      const filters = '[["customer_name", "=", "SOURCE AND SERVICE - MOTIJHEEL"]]';
      var params = {
        url: _this.baseUrl + `/api/method/frappe.client.get_count?doctype=${doctype}&filters=${filters}&fields=${fields}`,
        jar: _this.cookieJar,
      };
  
      console.log(params.url)
  
      return requestPromise.get(params).then(function (data) {
        const result = JSON.parse(data);
        console.log(result);
        return result;
      });
    });
  }


   // return "http://excel_erpnext.localhost:8000/api/method/frappe.client.get_count?doctype=Customer&fields=%5B%22count(%20%60tabCustomer%60.name%29%20AS%20total_count%22%5D"
  // Add more methods for other resources and functionalities

  // Example usage:
  async main() {
//     const pageSize = 10; // Number of customers per page
//     const page = 1; // Current page number

//   try {
//     const result = await this.getCustomersName(pageSize, page);
//     const totalCustomers = result.totalCustomers;
//     const customers = result.customers;

//     console.log('Total Customers:', totalCustomers);
//     console.log('Customers:', customers);
//   } catch (error) {
//     console.error('An error occurred:', error);
//   }
  }
}

module.exports = ERPNext;

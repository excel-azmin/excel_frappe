const ERPNext = require('../index'); // Assuming ERPNext.js is in the same directory

const erpNext = new ERPNext({
  username: 'azmin',
  password: 'Azmin@123#',
  baseUrl: 'http://excel_erpnext.localhost:8000'
});

const pageSize = 10; // Number of customers per page
let currentPage = 1; // Current page number

function fetchCustomers() {
    erpNext
      .getCustomersName(pageSize, currentPage)
      .then((result) => {
        const totalCustomers = result.totalCustomers;
        const customers = result.customers;
        const currentPage = result.currentPage;
        const pageSize = result.pageSize;
  
        console.log('Total Customers:', totalCustomers);
        console.log('Customers:', customers);
        console.log('Current Page:', currentPage);
        console.log('Page Size:', pageSize);
      })
      .catch((error) => {
        console.error('An error occurred:', error);
      });
  }

  
  // fetchCustomers();

  console.log(erpNext.getTotalCount())

const ERPNext = require('../index'); // Assuming ERPNext.js is in the same directory

const erpNext = new ERPNext({
  username: 'azmin',
  password: 'Azmin@123#',
  baseUrl: 'https://hrv14.excelbd.com'
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


  // get Doctype Total Count

  console.log(erpNext.getTotalCount())


  // Get Single Document Data

  async function getSingleData() {
    try {
      const data = await erpNext.getCustomerByName('Sales Invoice','SINV-2021-20813');
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  // getSingleData();


  // create

  async function postData() {
    try {
      const data = await erpNext.post("Employee Checkin", {
        "employee": "ETL22040419",
        "employee_name": "Shaid Azmin",
        "time": "2024-01-16T12:36:12",
        "log_type": "OUT"
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  // postData();


  /// Update

  async function putData() {
    try {
      const data = await erpNext.put("Employee Checkin", "EMP-CKIN-01-2024-000004", {
        "employee": "ETL20050261",
        "employee_name": "Mehedi Hasan Emraz",
        "time": "2024-01-16T12:36:12",
        "log_type": "OUT"
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  // putData();



    /// Delete

    async function deleteData() {
      try {
        const data = await erpNext.delete("Employee Checkin", "EMP-CKIN-01-2024-000003");
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    // deleteData();
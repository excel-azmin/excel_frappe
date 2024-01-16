# excel_frappe

A package for NodeJS based ERPNext Custom Apps


## Install The Package

```
npm i excel_frappe

```

## Complete CRUD Example


```


const ERPNext = require('excel_frappe'); 

const erpNext = new ERPNext({
  username: 'user',
  password: 'pass',
  baseUrl: 'example.com'
});

  // # Create Docs

  async function createDocument() {
    try {
      const data = await erpNext.createDocs("Employee Checkin", {
        "employee": "ETL22040419",
        "employee_name": "Shaid Azmin",
        "time": "2024-01-16T15:36:12",
        "log_type": "OUT"
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

    
//  createDocument();


// # Read Docs with Filters, Sorting & Paggination

const pageSize = 10; // Number of customers per page
let currentPage = 1; // Current page number

      
const fields = '["name", "customer_name", "territory"]';
const filters = '[["customer_name", "=", "SOURCE AND SERVICE - MOTIJHEEL"]]';

function fetchAllDocs() {
    erpNext
      .getDocs("Customer", fields, '[["name", "!=", ""]]',  "name desc", pageSize, currentPage)
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
  
  // fetchAllDocs();

  // # get Docs Total Count
  async function getTotalDocs() {
    try {
      const data = await erpNext.getTotalDocs(
        'Customer', 
        '["count"(`Customer`.`name`) AS total_count ]',
        '[["name", "!=", ""]]' );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }

  // getTotalDocs()

  // # Get Single Doc By Name

  async function getDocByName() {
    try {
      const data = await erpNext.getDocByName('Sales Invoice','ACC-SINV-2023-00006');
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }
  
  // getDocByName();

  // #  Update Doc By Name

  async function updateDocsByName() {
    try {
      const data = await erpNext.updateDocsByName("Employee Checkin", "EMP-CKIN-01-2024-000002", {
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
  
  // updateDocsByName();



  // # Delete Docs By Name

    async function deleteDocsByName() {
      try {
        const data = await erpNext.deleteDocsByName("Employee Checkin", "EMP-CKIN-01-2024-000003");
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
    
    // deleteDocsByName();

```
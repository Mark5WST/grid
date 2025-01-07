# Project README

## Overview

This guide provides instructions on how to transition your Vue.js project from using a local JSON file (`csvjson.json`) as a data source to fetching data from an API backend. By leveraging API calls, your application can dynamically interact with real-time data, enabling better scalability and integration with other services.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Current Project Structure](#current-project-structure)
- [Step 1: Set Up the API Backend](#step-1-set-up-the-api-backend)
- [Step 2: Remove Local JSON Dependency](#step-2-remove-local-json-dependency)
- [Step 3: Update Vue Component to Fetch Data from API](#step-3-update-vue-component-to-fetch-data-from-api)
- [Step 4: Update CRUD Methods](#step-4-update-crud-methods)
- [Step 5: Handle Data Transformation](#step-5-handle-data-transformation)
- [Step 6: Configure API Client](#step-6-configure-api-client)
- [Step 7: Test the Integration](#step-7-test-the-integration)
- [Additional Considerations](#additional-considerations)
- [Troubleshooting](#troubleshooting)
- [Conclusion](#conclusion)

## Prerequisites

Before proceeding, ensure you have the following:

- **Node.js and npm**: Installed on your development machine.
- **Vue.js Project**: Existing project setup with Vue.js.
- **API Backend**: An operational API backend that provides the necessary endpoints for data operations (`GET`, `POST`, `PUT`, `DELETE`).
- **API Client**: Libraries like `axios` installed for making HTTP requests.

## Current Project Structure

Your project currently utilizes a local JSON file located at `src/assets/csvjson.json` to manage data. The main Vue component handling data operations is `GridTable2.vue` found in `src/components/`.

## Step 1: Set Up the API Backend

1. **Ensure API Availability**: Confirm that your API backend is up and running. It should expose endpoints to handle data retrieval and manipulation.

2. **Define Endpoints**: Commonly used endpoints include:
   - `GET /grid`: Fetch all grid data.
   - `POST /grid`: Create a new data entry.
   - `PUT /grid/:id`: Update an existing data entry.
   - `DELETE /grid/:id`: Delete a data entry.

3. **CORS Configuration**: If your frontend and backend are on different domains or ports, ensure that Cross-Origin Resource Sharing (CORS) is properly configured on the backend to allow requests from your frontend.

## Step 2: Remove Local JSON Dependency

1. **Delete JSON File**: If the local JSON file is no longer needed, you can remove it to prevent confusion.
   ```bash
   rm src/assets/csvjson.json
   ```

2. **Remove Imports**: Search through your project files (especially `GridTable2.vue`) and remove any import statements referencing the local JSON file.
   ```javascript
   // Remove or comment out lines like:
   // import localData from '@/assets/csvjson.json';
   ```

## Step 3: Update Vue Component to Fetch Data from API

1. **Update `fetchGridData` Method**: Modify the `fetchGridData` method to retrieve data from the API instead of the local JSON file.
   
   ```javascript
   methods: {
     async fetchGridData() {
       try {
         const response = await apiClient.get('/grid', {
           params: {
             id_code: this.id_code,
             bank_name: this.bank_name,
             sp_type: this.sp_type,
           },
         });
         this.data2 = response.data;

         // Transform sections into arrays if necessary
         for (let section in this.data2) {
           if (Array.isArray(this.data2[section])) {
             this.data2[section] = this.data2[section];
           } else if (typeof this.data2[section] === 'object') {
             this.data2[section] = Object.keys(this.data2[section]).map((key) => ({
               field_input: key,
               value: this.data2[section][key],
               name_th: key, // Replace with actual `name_th` if available
             }));
           }
         }
       } catch (error) {
         console.error('Error fetching grid data:', error);
         alert('เกิดข้อผิดพลาดในการดึงข้อมูลจากเซิร์ฟเวอร์');
       }
     },
     // ... other methods
   }
   ```

2. **Remove Local Data Initialization**: Ensure that your `data` property no longer initializes data from the local JSON.
   
   ```javascript
   data() {
     return {
       // Remove or comment out the following line if present:
       // data: localData,
       data: [],
       data2: [],
       // ... other data properties
     };
   },
   ```

## Step 4: Update CRUD Methods

Ensure that all Create, Read, Update, and Delete (CRUD) operations interact with the API backend.

1. **Create Data (`createData` Method)**:
   
   ```javascript
   async createData(newEntry) {
     try {
       const response = await apiClient.post('/grid', newEntry);
       this.data.push(response.data);
       alert('Data created successfully!');
     } catch (error) {
       console.error('Error creating data:', error);
       alert('Failed to create data.');
     }
   },
   ```

2. **Update Data (`updateData` Method)**:
   
   ```javascript
   async updateData(id, updatedEntry) {
     try {
       const response = await apiClient.put(`/grid/${id}`, updatedEntry);
       const index = this.data.findIndex(item => item.id === id);
       if (index !== -1) {
         this.$set(this.data, index, response.data);
         alert('Data updated successfully!');
       }
     } catch (error) {
       console.error('Error updating data:', error);
       alert('Failed to update data.');
     }
   },
   ```

3. **Delete Data (`deleteData` Method)**:
   
   ```javascript
   async deleteData(id) {
     try {
       await apiClient.delete(`/grid/${id}`);
       this.data = this.data.filter(item => item.id !== id);
       alert('Data deleted successfully!');
     } catch (error) {
       console.error('Error deleting data:', error);
       alert('Failed to delete data.');
     }
   },
   ```

## Step 5: Handle Data Transformation

Ensure that the data fetched from the API matches the structure expected by your application.

1. **Adjust Data Mapping**: If the API returns data in a different format than the local JSON, adjust your data mapping accordingly in the `fetchGridData` method.

2. **Validate Data Integrity**: Implement checks to ensure that the received data contains all necessary fields before processing.

## Step 6: Configure API Client

Ensure that your API client (`apiClient`) is correctly configured to communicate with your backend.

1. **Install Axios (if not already installed)**:
   
   ```bash
   npm install axios
   ```

2. **Create an API Client Instance**: You can create a separate file (e.g., `apiClient.js`) for configuring Axios.

   ```javascript
   // src/services/apiClient.js
   import axios from 'axios';

   const apiClient = axios.create({
     baseURL: 'https://your-api-base-url.com/api', // Replace with your API's base URL
     headers: {
       'Content-Type': 'application/json',
     },
   });

   export default apiClient;
   ```

3. **Import API Client in Vue Component**:
   
   ```javascript
   // In GridTable2.vue
   import apiClient from '@/services/apiClient';
   ```

## Step 7: Test the Integration

1. **Fetch Data**: Run your application and ensure that data is being fetched from the API.
   
   ```bash
   npm run serve
   ```

2. **Perform CRUD Operations**: Test creating, updating, and deleting entries to verify that API interactions work as expected.

3. **Handle Errors**: Simulate API failures to ensure that error handling and user notifications are functioning correctly.

## Additional Considerations

- **Authentication**: If your API requires authentication (e.g., JWT tokens), ensure that your API client includes the necessary headers.
  
  ```javascript
  apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  ```

- **Pagination and Filtering**: Implement pagination and filtering mechanisms if your dataset is large.

- **State Management**: Consider using Vuex for better state management, especially if multiple components need to access the grid data.

- **Environment Variables**: Store your API base URL in environment variables to manage different environments (development, staging, production).

  ```bash
  # .env.development
  VUE_APP_API_BASE_URL=https://dev-api.example.com/api
  ```

  ```javascript
  // apiClient.js
  const apiClient = axios.create({
    baseURL: process.env.VUE_APP_API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  ```

## Troubleshooting

- **CORS Issues**: If you encounter CORS errors, ensure that your backend is configured to allow requests from your frontend's origin.

- **API Endpoint Errors**: Double-check the endpoints and HTTP methods in your API client against the backend documentation.

- **Data Mismatch**: Ensure that the data structure returned by the API matches what your frontend expects. Adjust your data handling logic if necessary.

- **Network Issues**: Verify network connectivity and API server status.

## Conclusion

Transitioning from a local JSON file to an API backend enhances your application's scalability and real-time data handling capabilities. By following this guide, you can effectively update your Vue.js project to utilize dynamic data fetching, ensuring a more robust and flexible application architecture.

For further assistance or questions, feel free to contact the development team or consult the project's documentation.

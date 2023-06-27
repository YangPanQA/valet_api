const { test, expect } = require("@playwright/test");

// Array of different time periods to test -- I understand that the requirement is for the recent 10 weeks, just trying to make the code more reusable
const testWeeks = ['10', '100', '1000'];

// Currency to be tested
const testCurrency = 'FXCADAUD';

// Loop over each time period in the testWeeks array
for (const weeks of testWeeks) {
  
    // Define a test case for each time period
    test('get Forex conversion rate in ' + weeks + ' weeks', async ({ request, baseURL }) => {
  
        // Send a GET request to retrieve Forex conversion rates for the specified currency and time period
        const _response = await request.get(`${baseURL}/observations/${testCurrency}/json?recent_weeks=${weeks}`);
        
        // Assert that the response is successful and has a status code of 200
        expect(_response.ok()).toBeTruthy();
        expect(_response.status()).toBe(200);
        
        // Extract the JSON data from the response
        const jsonData = await _response.json();
        
        // Retrieve the array of observations from the JSON data
        const observations = jsonData.observations;
        
        // Initialize a variable to accumulate the values from each observation
        let sum = 0;
        
        // Iterate over each observation in the observations array
        observations.forEach(observation => {
            
            // Retrieve the value for the testCurrency from the current observation and convert it to a float
            const value = parseFloat(observation[testCurrency].v);
            
            // Add the value to the sum
            sum += value;
            
        }); 
        
        // Calculate the average value by dividing the sum by the number of observations
        const average = sum / observations.length;
        
        // Log the average value, rounded to 4 decimal places, along with the corresponding number of weeks
        console.log(`Average value of rate in the last ${weeks} weeks is: `, average.toFixed(4));
        
    }); 
      
}

// Negative test cases as below
test('get Forex conversion rate with invalid currency', async ({ request, baseURL }) => {
    const invalidCurrency = 'INVALID';
    
    const _response = await request.get(`${baseURL}/observations/${invalidCurrency}/json?recent_weeks=10`);
    
    // Assert that the response is not successful and has a status code other than 200
    expect(_response.ok()).toBeFalsy();
    expect(_response.status()).not.toBe(200);
  });
  
test('get Forex conversion rate with invalid time period', async ({ request, baseURL }) => {
    const invalidWeeks = 'abc$%';
    
    const _response = await request.get(`${baseURL}/observations/${testCurrency}/json?recent_weeks=${invalidWeeks}`);
    
    // Assert that the response is not successful and has a status code other than 200
    expect(_response.ok()).toBeFalsy();
    expect(_response.status()).not.toBe(200);
  });
  
  test('get Forex conversion rate without specifying currency', async ({ request, baseURL }) => {
    const _response = await request.get(`${baseURL}/observations/json?recent_weeks=10`);
    
    // Assert that the response is not successful and has a status code other than 200
    expect(_response.ok()).toBeFalsy();
    expect(_response.status()).not.toBe(200);
  });   
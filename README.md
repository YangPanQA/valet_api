# valet_api_automated_testing

How to run the test:

Run command line: npx playwright test valet_api_test.spec.js 

Run command line: npx playwright show-report to check the whole Playwright native HTML report

Observations:

Due to the limited visibilities we had regarding the Bank of Canada valet API (https://www.bankofcanada.ca/valet/observations/FXCADAUD/json?recent_weeks=10), I would suggest to test it from following perspectives:

1. Data Retrieval: The URL suggests that the Bank of Canada provides JSON data related to FX rates between the Canadian Dollar (FXCAD) and the Australian Dollar (FXAUD). From a testing perspective, it would be important to verify that the data retrieval mechanism is working correctly. This could involve checking for response codes, validating the JSON structure, and ensuring the data is up to date.

2. Data Accuracy: Testing should focus on the accuracy of the data being retrieved. It would be essential to compare the retrieved FXCAD/AUD rates with reliable external sources to confirm that the data aligns correctly. This helps ensure the accuracy and reliability of the information being provided to users or systems that rely on this data.

3. Data Consistency: It is important to test the consistency of the data over time. The "recent_weeks=10" parameter in the URL suggests that the data retrieved covers a period of 10 weeks. Testing should involve verifying that the data for each week is consistent and correctly ordered. This helps identify any anomalies or irregularities that might impact the analysis or usage of the data.

4. Performance and Scalability: If this API is intended to handle a large number of requests, testing its performance and scalability becomes crucial. Load testing can be performed to ensure that the API can handle high traffic and maintain acceptable response times. It's also important to check for potential bottlenecks or limitations in the system architecture that might affect its scalability.

5. Error Handling: Robust error handling is crucial for any API. Testing should cover scenarios such as invalid parameters and server errors. It's important to ensure that appropriate error messages and status codes are returned, and the API gracefully handles such situations without compromising data integrity.

Addtional steps I would have taken with more time:

1. CI intergrations using github actions.

2. Improve the test data storage -- to store them in github secrets, database, etc.

3. Enhance the automated testing coverage of error handlings as listed on https://www.bankofcanada.ca/valet/docs#errors.

4. Create a separate file with all the currency conversions (can be in a a utility file) and read from there.
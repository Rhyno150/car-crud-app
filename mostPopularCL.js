function mostPopularCarModelInStellenbosch(cars) {
    // Filter cars for Stellenbosch
    const stellenboschCars = cars.filter(car => car.reg_number.startsWith('CL'));
  

    
    // Create a map to count occurrences of each car model
    const modelCounts = new Map();
    stellenboschCars.forEach(car => {
      modelCounts.set(car.model, (modelCounts.get(car.model) || 0) + 1);
    });
  
    // Find the car model with the highest count
    let mostPopularModel = '';
    let maxCount = 0;
    for (const [model, count] of modelCounts) {
      if (count > maxCount) {
        maxCount = count;
        mostPopularModel = model;
      }
    }
  
    return mostPopularModel;
  }

  
  const axios = require('axios');

async function fetchCarData(apiUrl) {
  try {
    const response = await axios.get(apiUrl);
    return response.data;
  } catch (error) {
    console.error('Error fetching car data:', error);
    throw error; // Or handle the error as needed
  }
}

// Example usage:
const apiUrl = 'https://bootcamp.projectcodex.co/cars.json'; // Replace with actual API URL
fetchCarData(apiUrl)
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });



  // myModule.js
const myModule = {}; // Create an object to hold your functions

myModule.mostPopularCL = () => {
  console.log("mostPopularCL");
};


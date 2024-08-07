import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


const myModule = {}; 
const app = express();
app.use(bodyParser.json());
app.use(cors());

let cars = [
  { color: "orange", make: "Ford", model: "Fiesta", reg_number: "CL 77790", color: "white",
  make: "Volkswagen",
  model: "Polo",
  reg_number: "CL 61045"
},  {
  color: "red",
  make: "Toyota",
  model: "Tazz",
  reg_number: "CY 16875"
},  {
  color: "orange",
  make: "Nissan",
  model: "Juke",
  reg_number: "CK 32655"
},  {
  color: "orange",
  make: "Ford",
  model: "EcoSport",
  reg_number: "CL 11318"
},  {
  color: "white",
  make: "Nissan",
  model: "Micra",
  reg_number: "CJ 16103"
},  {
  color: "orange",
  make: "Nissan",
  model: "Juke",
  reg_number: "CL 42789"
},  {
  color: "blue",
  make: "Volkswagen",
  model: "Jetta",
  reg_number: "CA 46977"
},  {
  color: "white",
  make: "Volkswagen",
  model: "Polo",
  reg_number: "CY 25661"
},  {
  color: "white",
  make: "Nissan",
  model: "Micra",
  reg_number: "CY 35475"
},  {
  color: "white",
  make: "Toyota",
  model: "Corolla",
  reg_number: "CY 54886"
},  {
  color: "white",
  make: "Toyota",
  model: "Hilux",
  reg_number: "CJ 16455"
},  {
  color: "orange",
  make: "Toyota",
  model: "Corolla",
  reg_number: "CK 57166"
},  {
  color: "orange",
  make: "Ford",
  model: "Fiesta",
  reg_number: "CL 77790"
},  {
  color: "blue",
  make: "Nissan",
  model: "Juke",
  reg_number: "CY 98904"
},  {
  color: "white",
  make: "Ford",
  model: "Ranger",
  reg_number: "CF 75599"
},  {
  color: "red",
  make: "Toyota",
  model: "Corolla",
  reg_number: "CA 5510"
},  {
  color: "blue",
  make: "Ford",
  model: "Focus",
  reg_number: "CF 75586"
},  {
  color: "orange",
  make: "Toyota",
  model: "Tazz",
  reg_number: "CA 46137"
},  {
  color: "orange",
  make: "Ford",
  model: "Ranger",
  reg_number: "CK 22692"
},  {
  color: "red",
  make: "Toyota",
  model: "Corolla",
  reg_number: "CF 33543"
},  {
  color: "red",
  make: "Volkswagen",
  model: "Touran",
  reg_number: "CA 94890"
},  {
  color: "orange",
  make: "Toyota",
  model: "Tazz",
  reg_number: "CY 82252"
},  {
  color: "blue",
  make: "Toyota",
  model: "Yaris",
  reg_number: "CL 9538"
},  {
  color: "white",
  make: "Nissan",
  model: "Juke",
  reg_number: "CF 62002"
},  {
  color: "orange",
  make: "Ford",
  model: "Fiesta",
  reg_number: "CJ 67577"
},  {
  color: "blue",
  make: "Ford",
  model: "Ranger",
  reg_number: "CA 77852"
},  {
  color: "orange",
  make: "Toyota",
  model: "Hilux",
  reg_number: "CY 52435"
},  {
  color: "blue",
  make: "Toyota",
  model: "Corolla",
  reg_number: "CL 76173"
},  {
  color: "red",
  make: "Toyota",
  model: "Tazz",
 reg_number: "CL 38315"
},  {
  color: "orange",
  make: "Toyota",
  model: "Corolla",
  reg_number: "CK 41166" }
   
]
// Create
app.post('/cars', (req, res) => {
  const car = req.body;
  cars.push(car);
  res.status(201).send(car);
});

// Read
app.get('/cars', (req, res) => {
  res.send(cars);
});


// Update
app.put('/cars/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  const updatedCar = req.body;
  cars = cars.map(car => car.reg_number === reg_number ? updatedCar : car);
  res.send(updatedCar);
});

// Delete
app.delete('/cars/:reg_number', (req, res) => {
  const { reg_number } = req.params;
  cars = cars.filter(car => car.reg_number !== reg_number);
  res.status(204).send();
});

// New Route for /mostPopularCL
app.get('/mostPopularCL', (req, res) => {
  // Example response; customize based on your needs
  res.send({ message: "Most Popular Car: CL 61045" });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




function carWidget() {
  return {
    model: '',
    loading: true,
    async fetchData() {
      try {
        const response = await axios.get('/api/cars');
        const cars = response.data;
        this.model = mostPopularCarModelInStellenbosch(cars);
      } catch (error) {
        console.error('Error fetching car data:', error);
      } finally {
        this.loading = false;
      }
    }
  };
}










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
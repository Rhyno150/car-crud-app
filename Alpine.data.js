import Alpine from 'alpinejs';
import axios from 'axios';

document.addEventListener('alpine:init', () => {
  Alpine.data('carCrudApp', () => ({
    cars: [],
    newCar: { color: '', make: '', model: '', reg_number: '' },
    currentCar: { color: '', make: '', model: '', reg_number: '' },
    editing: false,

    init() {
      this.getCars();
    },

    async getCars() {
      try {
        const response = await axios.get('http://localhost:3000/cars');
        this.cars = response.data;
      } catch (error) {
        console.error('Error fetching cars:', error);
      }
    },

    async createCar() {
      try {
        const response = await axios.post('http://localhost:3000/cars', this.newCar);
        this.cars.push(response.data);
        this.newCar = { color: '', make: '', model: '', reg_number: '' };
      } catch (error) {
        console.error('Error creating car:', error);
      }
    },

    async deleteCar(reg_number) {
      try {
        await axios.delete(`http://localhost:3000/cars/${reg_number}`);
        this.cars = this.cars.filter(car => car.reg_number !== reg_number);
      } catch (error) {
        console.error('Error deleting car:', error);
      }
    },

    editCar(car) {
      this.currentCar = { ...car };
      this.editing = true;
    },

    async updateCar() {
      try {
        const response = await axios.put(`http://localhost:3000/cars/${this.currentCar.reg_number}`, this.currentCar);
        this.cars = this.cars.map(car => car.reg_number === this.currentCar.reg_number ? response.data : car);
        this.editing = false;
      } catch (error) {
        console.error('Error updating car:', error);
      }
    }
  }));
});


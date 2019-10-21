import fs from "fs";
import appRoot from "app-root-path";

const hotelDB = `${appRoot}/src/database/hotel.json`;
const recycledhotelDB = `${appRoot}/src/database/recycledhotel.json`;
const userDB = `${appRoot}/src/database/user.json`;

export default {
  loadHotels: hotelDB => {
    const dataBuffer = fs.readFileSync(hotelDB);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  },
  loadRecycledHotels: recycledhotelDB => {
    const dataBuffer = fs.readFileSync(recycledhotelDB);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  },
  loadUsers: userDB => {
    const dataBuffer = fs.readFileSync(userDB);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  },
  saveHotel: newHotel => {
    const dataJSON = JSON.stringify(newHotel);
    fs.writeFileSync(hotelDB, dataJSON);
  },
  saveRecycledHotel: newRecycledHotel => {
    const dataJSON = JSON.stringify(newRecycledHotel);
    fs.writeFileSync(recycledhotelDB, dataJSON);
  },
  saveUser: newUser => {
    const dataJSON = JSON.stringify(newUser);
    fs.writeFileSync(userDB, dataJSON);
  }
};

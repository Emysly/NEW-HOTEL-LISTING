import fs from "fs";
import appRoot from "app-root-path";
const hotelDB = `${appRoot}/src/database/hotel.json`;
const userDB = `${appRoot}/src/database/user.json`;

export default {
  loadHotels: hotelDB => {
    const dataBuffer = fs.readFileSync(hotelDB);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  },
  saveHotel: newHotel => {
    const dataJSON = JSON.stringify(newHotel);
    fs.writeFileSync(hotelDB, dataJSON);
  },
  loadUsers: userDB => {
    const dataBuffer = fs.readFileSync(userDB);
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  },
  saveUser: newUser => {
    const dataJSON = JSON.stringify(newUser);
    fs.writeFileSync(userDB, dataJSON);
  }
};

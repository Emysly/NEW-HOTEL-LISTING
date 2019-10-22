import Helper from "../helper/index";
import appRoot from "app-root-path";
import _ from "lodash";

const hotelDB = `${appRoot}/src/database/hotel.json`;
const userDB = `${appRoot}/src/database/user.json`;

export default class HotelController {
  static async getAllHotels(req, res) {
    res.sendFile(`${appRoot}/public/hotel.html`);
  }

  static async create(req, res) {
    try {
      let id;

      const {
        name,
        website,
        city,
        state,
        rating,
        price,
        user_id: created_by
      } = req.body;
      //load the hotels first
      const hotels = await Helper.loadHotels(hotelDB);

      if (hotels.length === 0) {
        id = 1;
      } else {
        id = hotels[hotels.length - 1].id + 1;
      }

      // create the new hotel
      const newHotel = {
        id,
        name,
        website,
        city,
        state,
        rating,
        price,
        created_by
      };

      // add it to the former ones
      hotels.push(newHotel);
      await Helper.saveHotel(hotels);

      // return the newly created hotel
      return res.status(201).json({
        status: "success",
        data: newHotel
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        error: {
          message: err.message
        }
      });
    }
  }

  static async getAll(req, res) {
    try {
      const user_id = parseInt(req.body.user_id);

      if (user_id) {
        // load all hotels
        const hotels = await Helper.loadHotels(hotelDB);

        if (hotels.length === 0) {
          return res.status(200).json({
            status: "success",
            data: "No hotels found"
          });
        }

        // return the hotels
        return res.status(200).json({
          status: "success",
          data: hotels
        });
      }
      return res.status(200).json({
        status: "success",
        data: `you are not authorized to view this hotel/hotels`
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        error: {
          message: err.message
        }
      });
    }
  }

  static async getOne(req, res) {
    try {
      const user_id = parseInt(req.body.user_id);
      const hotel_id = Number(req.params.id);

      // load all hotels
      const hotels = await Helper.loadHotels(hotelDB);

      //load all users
      const users = await Helper.loadUsers(userDB);

      // find one hotel by the id
      const getHotel = hotels.find(hotel => hotel.id === hotel_id);
      const getUser = users.find(user => user.is_admin === true);
      console.log(getUser.hasOwnProperty("is_admin"));
      if (_.isUndefined(getHotel)) {
        return res.status(404).json({
          status: "error",
          error: `Hotel #${hotel_id} not found`
        });
      }
      if (getHotel.created_by === user_id) {
        const hotel = await hotels.filter(hotel => hotel.id === hotel_id);
        // return the hotel that was found
        return res.status(200).json({
          status: "success",
          data: hotel
        });
      }
      return res.status(200).json({
        status: "success",
        data: `you are not authorized to view this hotel`
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        error: {
          message: err.message
        }
      });
    }
  }

  static async deleteOne(req, res) {
    try {
      const user_id = parseInt(req.body.user_id);
      const hotel_id = Number(req.params.id);

      // load all hotels
      const allHotels = await Helper.loadHotels(hotelDB);
      const hotelToBeDeleted = allHotels.find(hotel => hotel.id === hotel_id);

      //load all users
      const users = await Helper.loadUsers(userDB);
      const getUser = users.find(user => user.is_admin === true);

      if (_.isUndefined(hotelToBeDeleted)) {
        return res.status(404).json({
          status: "error",
          error: `hotel #${hotel_id} not found`
        });
      }

      if (hotelToBeDeleted.created_by === user_id) {
        const remainingHotels = await allHotels.filter(
          hotel => hotel.id !== hotel_id
        );
        await Helper.saveHotel(remainingHotels);

        return res.status(200).json({
          status: "success",
          data: `Hotel #${hotel_id} has been deleted`
        });
      }

      return res.status(200).json({
        status: "success",
        data: `you are not authorized to delete this hotel`
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        error: {
          message: err.message
        }
      });
    }
  }

  static async deleteAll(req, res) {
    try {
      // load the hotels
      const hotels = await Helper.loadHotels(hotelDB);

      while (hotels.length > 0) {
        hotels.pop();
      }
      await Helper.saveHotel(hotels);

      return res.status(200).json({
        status: "success",
        data: "All hotels deleted."
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        error: {
          message: err.message
        }
      });
    }
  }

  static async updateOne(req, res) {
    try {
      const { name, website, city, state, rating, price } = req.body;
      const user_id = parseInt(req.body.user_id);
      const hotel_id = Number(req.params.id);

      // load all hotels
      const hotels = Helper.loadHotels(hotelDB);

      //load all users
      const users = Helper.loadUsers(userDB);
      const getUser = users.find(user => user.is_admin === true);

      const index = hotels.findIndex(hotel => hotel.id === hotel_id);
      const hotelToBeUpdated = await hotels.find(
        hotel => hotel.id === hotel_id
      );

      if (index > -1) {
        hotels[index]["name"] = name || hotels[index]["name"];
        hotels[index]["website"] = website || hotels[index]["website"];
        hotels[index]["city"] = city || hotels[index]["city"];
        hotels[index]["state"] = state || hotels[index]["state"];
        hotels[index]["rating"] = rating || hotels[index]["rating"];
        hotels[index]["price"] = price || hotels[index]["price"];

        await Helper.saveHotel(hotels);
      }
      if (_.isUndefined(hotelToBeUpdated)) {
        return res.status(404).json({
          status: "error",
          error: `The hotel you are trying to update does not exist`
        });
      }

      if (hotelToBeUpdated.created_by === user_id) {
        res.status(200).json({
          status: "success",
          data: hotels[index]
        });
        return res.status(200).json({
          status: "success",
          data: `Hotel #${hotel_id} has been updated`
        });
      }
      return res.status(200).json({
        status: "success",
        data: `you are not authorized to update this hotel`
      });
    } catch (err) {
      return res.status(400).json({
        status: "error",
        error: {
          message: err.message
        }
      });
    }
  }
}
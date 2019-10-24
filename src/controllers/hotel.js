import Helper from "../helper/index";
import appRoot from "app-root-path";
import _ from "lodash";

const hotelDB = `${appRoot}/src/database/hotel.json`;
const userDB = `${appRoot}/src/database/user.json`;

export default class HotelController {
  static async getAllHotels(req, res) {
    try {
      //get the user id from req body
      const user_email = req.body.email;

      // load all hotels
      const hotels = await Helper.loadHotels(hotelDB);

      if (hotels.length === 0) {
        return res.status(200).json({
          status: "success",
          data: "No hotels found"
        });
      }

      //filter the hotel to get the hotels that match the actual creator's email
      const filteredHotels = hotels.filter(
        hotel => hotel.created_by === user_email
      );
      // return the filtered hotels
      return res.status(200).json({
        status: "success",
        data: filteredHotels
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

  static async create(req, res) {
    try {
      let id;
      //destructuring the req.body
      const {
        name,
        website,
        city,
        state,
        rating,
        price,
        email: created_by
      } = req.body;

      //load the hotels first
      const hotels = await Helper.loadHotels(hotelDB);

      //check if no hotel exist
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
      // load all hotels
      const hotels = await Helper.loadHotels(hotelDB);

      //check if no hotel exist
      if (hotels.length === 0) {
        return res.status(200).json({
          status: "success",
          data: "No hotels found"
        });
      }

      //if hotel exist return the hotels collection
      return res.status(200).json({
        status: "success",
        data: hotels
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
      //get the id from req params
      const hotelID = Number(req.params.id);

      // load all hotels
      const hotels = await Helper.loadHotels(hotelDB);

      // filter hotel by the id that match the req params
      const hotel = hotels.filter(hotel => hotel.id === hotelID);

      //check if no hotel exist
      if (hotel.length === 0) {
        return res.status(404).json({
          status: "error",
          error: `Hotel with ${id} not found`
        });
      }

      //if hotel exist return the hotels collection
      return res.status(200).json({
        status: "success",
        data: hotel
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
      //get the id from req params
      const hotel_id = Number(req.params.id);

      // load all hotels
      const allHotels = await Helper.loadHotels(hotelDB);

      // filter hotel by the id that match the req params
      const remainingHotels = await allHotels.filter(
        hotel => hotel.id !== hotel_id
      );
      await Helper.saveHotel(remainingHotels);

      //check if no hotel exist
      if (allHotels.length === 0) {
        return res.status(404).json({
          status: "error",
          error: `hotel #${hotel_id} not found`
        });
      }

      //if hotel exist delete the hotel
      return res.status(200).json({
        status: "success",
        data: `Hotel #${hotel_id} has been deleted`
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

      //keep removing hotel from the hotel array until the hotel array is empty
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
      //get the id from req params
      const hotel_id = Number(req.params.id);

      //destructuring the req.body
      const { name, website, city, state, rating, price } = req.body;

      // load the hotel db
      const hotels = Helper.loadHotels(hotelDB);

      //find the index of the hotel id
      const index = hotels.findIndex(hotel => hotel.id === hotel_id);

      //check if the index exist in the hotel array
      if (index > -1) {
        hotels[index]["name"] = name || hotels[index]["name"];
        hotels[index]["website"] = website || hotels[index]["website"];
        hotels[index]["city"] = city || hotels[index]["city"];
        hotels[index]["state"] = state || hotels[index]["state"];
        hotels[index]["rating"] = rating || hotels[index]["rating"];
        hotels[index]["price"] = price || hotels[index]["price"];

        await Helper.saveHotel(hotels);

        //if index exist update the hotel and return the updated hotels
        return res.status(200).json({
          status: "success",
          data: hotels[index]
        });
      }

      //if not exist return the not exist error message
      return res.status(404).json({
        status: "error",
        error: `The hotel you are trying to update does not exist`
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
  static async getAllUserHotels(req, res) {
    try {
      // load all hotels
      const hotels = await Helper.loadHotels(hotelDB);

      //check if no hotel exist
      if (hotels.length === 0) {
        return res.status(200).json({
          status: "success",
          data: "No hotels found"
        });
      }
      //if hotel exist return the hotels collection
      return res.status(200).json({
        status: "success",
        data: hotels
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

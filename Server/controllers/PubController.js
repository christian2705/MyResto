const { Cuisine } = require("../models");

class PubController {
  static async pubShowCuisine(req, res) {
    try {
      const cuisines = await Cuisine.findAll()
      res.status(200).json(cuisines)
      const { page, sort, filter } = req.query;
      const paramQuerySQL = {};
      let limit;
      let offset;

      if (filter !== "" && typeof filter !== "undefined") {
        const query = filter.category.split(",").map((item) => ({
          [Op.eq]: item,
        }));

        paramQuerySQL.where = {
          categoryId: { [Op.or]: query },
        };
      }
      //sort
      if (sort !== "" && typeof sort !== "undefined") {
        let query;
        if (sort.charAt(0) !== "-") {
          query = [[sort, "ASC"]];
        } else {
          query = [[sort.replace("-", ""), "DESC"]];
        }

        paramQuerySQL.order = query;
      }
      // pagination
      if (page !== "" && typeof page !== "undefined") {
        if (page.size !== "" && typeof page.size !== "undefined") {
          limit = page.size;
          paramQuerySQL.limit = limit;
        }

        if (page.number !== "" && typeof page.number !== "undefined") {
          offset = page.number * limit - limit;
          paramQuerySQL.offset = offset;
        }
      } else {
        limit = 10; // limit item
        offset = 0;
        paramQuerySQL.limit = limit;
        paramQuerySQL.offset = offset;
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async pubDetailCuisine(req, res) {
    try {
      const cuisine = await Cuisine.findByPk(req.params.id);
      if (!cuisine) throw { name: "Not Found" };
      res.status(200).json(cuisine);
    } catch (error) {
      if (error.name === "Not Found") {
        res.status(404).json({ message: "Cuisine not found" });
      } else {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}

module.exports = PubController;

const swag = require('../models/swag');

module.exports = {
  search: (req, res, next) => {
    console.log('search controller:');
    const { category } = req.query;
    // console.log('category:', category);
    if (!category) {
      res.status(200).send(swag);
      console.log('.send(swag):', swag);
    } else {
      const filteredSwag = swag.filter(swag => swag.category === category);
      console.log('filteredSwag:', filteredSwag);
      res.status(200).send(filteredSwag);
    }
  }
};

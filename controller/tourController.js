const Tour = require("../model/tourModel.js");
const FeatureAPI = require("../utility/FeatureAPI.js");

const getToursAll = async (req, res) => {
  try {
    const tours = new FeatureAPI(req.query, Tour)
      .filter()
      .sorting()
      .field()
      .pagination();

    const data = await tours.databaseQuery;
    res.status(200).json({
      status: "success",
      reults: data.length,
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

const createTour = async (req, res) => {
  // const newTour = new Tour(req.body);
  // newTour.save();
  const data = await Tour.create(req.body);
  if (!data) {
    throw new Error();
  }
  res.status(201).json({
    status: "Success",
    data: { data },
  });
};

const getTourById = async (req, res) => {
  try {
    const data = await Tour.findById({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: { data },
    });
  } catch {
    res.status(404).json({
      message: "Not Found",
    });
  }
};

const updateTourById = async (req, res) => {
  try {
    const data = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      status: "success",
      data: { data },
    });
  } catch {
    res.status(404).json({
      message: "Not Found",
    });
  }
};

const deleteTourById = async (req, res) => {
  try {
    const data = await Tour.findByIdAndDelete({ _id: req.params.id });
    res.status(200).json({
      status: "success",
      data: { data },
    });
  } catch {
    res.status(404).json({
      message: "Not Found",
    });
  }
};

const tourStats = async (rea, res) => {
  try {
    const data = await Tour.aggregate([
      {
        $match: { duration: { $gte: 10 } },
      },
    ]);
    res.status(200).json({
      status: "success",
      results: data.length,
      data: data,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err.message,
    });
  }
};

module.exports = {
  getToursAll,
  createTour,
  getTourById,
  updateTourById,
  deleteTourById,
  tourStats,
};

const Binhluan = require("../models/binhluan.js");
exports.create = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    // Create a binhluan
    const binhluan = new Binhluan({
     id_bl: null,
     masp:req.body.masp,
     ten:req.body.ten,
     noidung:req.body.noidung,
     ngay:req.body.ngay,
    });
    // Save binhluan in the database
    Binhluan.create(Binhluan, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating...",
        });
      else res.send(data);
    });
  };

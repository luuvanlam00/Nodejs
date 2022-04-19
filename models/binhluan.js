const sql = require("./db.js");
const Binhluan = function(binhluan){
    this.id_bl = binhluan.id_bl;
    this.masp = binhluan.masp;
    this.ten = binhluan.ten;
    this.noidung = binhluan.noidung;
    this.ngay = binhluan.ngay;
  
};
Binhluan.findByMasp = (id, result) => {
  sql.query(
    `SELECT * FROM binhluan WHERE masp=${id}  order by id_bl desc`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("binhluan: ", res);
      result(null, res);
    }
  );
};
Binhluan.create = (newbinhluan, result) => {
  sql.query("INSERT INTO binhluan SET ?", newbinhluan, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created newbinhluan: ", {...newbinhluan });
    result(null, {...newbinhluan });
  });
};

module.exports = Binhluan;
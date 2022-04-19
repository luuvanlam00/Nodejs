const sql = require("./db.js");
const Nguoidung = function(nguoidung){
    this.taikhoan = nguoidung.taikhoan,
    this.matkhau = nguoidung.matkhau,
    this.vaitro = nguoidung.vaitro
};

Nguoidung.create = (newnguoidung, result) => {
  sql.query("INSERT INTO nguoidung SET ?", newnguoidung, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created newnguoidung: ", {...newnguoidung });
    result(null, {...newnguoidung });
  });
};
module.exports = Nguoidung;
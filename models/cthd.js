const sql = require("./db.js");
const Cthd = function(cthd){
   this.id_cthd = cthd.id_cthd;
   this.id_hd = cthd.id_hd;
   this.masp = cthd.masp;
   this.giaban = cthd.giaban;
   this.soluong = cthd.soluong;
};
Cthd.create = (newcthd, result) => {
  sql.query("INSERT INTO cthd SET ?", newcthd, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created newcthd: ", {...newcthd });
    result(null, {...newcthd });
  });
};
Cthd.findByid = (id, result) => {
  sql.query(
    `select c.id_cthd,c.id_hd,s.tensp,c.soluong,c.giaban from cthd c INNER JOIN sanpham s ON c.masp=s.masp  where id_hd=${id}  `,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
      console.log("cthd: ", res);
      result(null, res);
    }
  );
};
module.exports = Cthd;
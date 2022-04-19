const sql = require("./db.js");
const Khachhang = function(khachhang){
   this.id_kh = khachhang.id_kh;
   this.tenkh= khachhang.tenkh;
   this.email = khachhang.email;
   this.sdt = khachhang.sdt;
  
};
Khachhang.create = (newkhachhang, result) => {
  sql.query("INSERT INTO khachhang SET ?", newkhachhang, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created newkhachhang: ", {...newkhachhang });
    result(null, {...newkhachhang });
  });
};
Khachhang.getAll = (result)=>{
  sql.query(
      "select * from khachhang order by id_kh desc ",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("Khachhang: ", res);
        result(null, res);
      }
    );
  
};
Khachhang.updateById = (khachhang, result) => {
  sql.query(
    "UPDATE khachhang set tenkh=?,email=?,sdt=?  WHERE id_kh = ?",
    [
    
      khachhang.tenkh,
      khachhang.email,
      khachhang.sdt,
      khachhang.id_kh
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        result({ kind: "not_found" }, null);
        return;
      }
      result(null,res);
    }
  );
};
Khachhang.findById = (id, result) => {
  sql.query(
    `select * from khachhang where id_kh = ${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found: ", res[0]);
        result(null, res[0]);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};
Khachhang.remove = (id, result) => {
  sql.query("DELETE FROM khachhang WHERE id_kh = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted Khachhang with id: ", id);
    result(null, res);
  });
};
module.exports = Khachhang;
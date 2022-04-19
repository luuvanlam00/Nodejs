const sql = require("./db.js");
const Danhmuc = function(danhmuc){
    this.maloai = danhmuc.maloai;
    this.tenloai = danhmuc.tenloai;
};
Danhmuc.getAll = (result)=>{
    sql.query(
        "select * from loaisp order by maloai desc",
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("danhmuc: ", res);
          result(null, res);
        }
      );
    
};
Danhmuc.create = (newDanhmuc, result) => {
  sql.query("INSERT INTO loaisp SET ?", newDanhmuc, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newDanhmuc.maloai = res.insertId;
    console.log("created newDanhmuc: ", {...newDanhmuc });
    result(null, {...newDanhmuc });
  });
};
Danhmuc.updateById = (danhmuc, result) => {
  sql.query(
    "UPDATE loaisp set tenloai=?  WHERE maloai = ?",
    [
    danhmuc.tenloai,
    danhmuc.maloai,
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
Danhmuc.findById = (id, result) => {
  sql.query(
    `select * from loaisp where maloai = ${id}`,
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
Danhmuc.remove = (id, result) => {
  sql.query("DELETE FROM loaisp WHERE maloai = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted danhmuc with id: ", id);
    result(null, res);
  });
};
module.exports = Danhmuc;
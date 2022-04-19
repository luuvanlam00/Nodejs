const sql = require("./db.js");
const Hoadon = function(hoadon){
   this.id_hd = hoadon.id_hd;
   this.thoigian = hoadon.thoigian;
   this.tenkh = hoadon.tenkh;
   this.sdt = hoadon.sdt;
   this.email = hoadon.email;
   this.diachi = hoadon.diachi;
   this.trangthai = hoadon.trangthai;
   this.thanhtoan = hoadon.thanhtoan;
  
};
Hoadon.create = (newhoadon, result) => {
  sql.query("INSERT INTO hoadon SET ?", newhoadon, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newhoadon.id_hd = res.insertId;
    console.log("created newhoadon: ", {...newhoadon });
    result(null, {...newhoadon });
  });
};
Hoadon.getAll = (result)=>{
  sql.query(
      "select * from hoadon order by id_hd desc",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("hoadon: ", res);
        result(null, res);
      }
    );
  
};
Hoadon.updateById = (hoadon, result) => {
  sql.query(
    "UPDATE hoadon set tenkh=?,sdt=?,email=?,diachi=?,trangthai=?  WHERE id_hd = ?",
    [
    
     
      hoadon.tenkh,
      hoadon.sdt,
      hoadon.email,
      hoadon.diachi,
      hoadon.trangthai,
      hoadon.id_hd
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
Hoadon.remove = (id, result) => {
  sql.query("DELETE FROM hoadon WHERE id_hd = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted hoadon with id: ", id);
    result(null, res);
  });
};
Hoadon.tongtien = (id,result)=>{
  sql.query(
      `SELECT SUM(soluong*giaban) as tongtien FROM cthd where id_hd = ${id} `,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("hoadon: ", res);
        result(null, res);
      }
    );
  
};
Hoadon.findById = (id, result) => {
  sql.query(
    `select * from hoadon where id_hd = ${id}`,
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
module.exports = Hoadon;
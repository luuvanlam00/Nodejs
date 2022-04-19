const sql = require("./db.js");
const Sanpham = function(sanpham){
    this.masp = sanpham.masp;
    this.tensp = sanpham.tensp;
    this.anh = sanpham.anh;
    this.mota = sanpham.mota;
    this.chitiet = sanpham.chitiet;
    this.giaban = sanpham.giaban;
    this.giakm = sanpham.giakm;
    this.maloai = sanpham.maloai;
    this.mancc = sanpham.mancc;
};
Sanpham.create = (newsanpham, result) => {
  sql.query("INSERT INTO sanpham SET ?", newsanpham, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created newsanpham: ", {...newsanpham });
    result(null, {...newsanpham });
  });
};
Sanpham.getAll = (result)=>{
    sql.query(
        "select * from sanpham",
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("sanpham: ", res);
          result(null, res);
        }
      );
    
};
Sanpham.getSp = (result)=>{
  sql.query(
      "select * from sanpham  INNER JOIN ncc ON sanpham.mancc=ncc.mancc inner join loaisp on sanpham.maloai=loaisp.maloai order by masp desc",
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        console.log("sanpham: ", res);
        result(null, res);
      }
    );
  
};
Sanpham.get1 = (result)=>{
    sql.query(
        "select * from sanpham limit 0,4",
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("sanpham: ", res);
          result(null, res);
        }
      );
    
};
Sanpham.get2 = (result)=>{
    sql.query(
        "select * from sanpham limit 5,4",
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("sanpham: ", res);
          result(null, res);
        }
      );
    
};
Sanpham.findById = (id, result) => {
  sql.query(
    `select * from sanpham where masp = ${id}`,
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
Sanpham.updateById = (sanpham, result) => {
  sql.query(
    "UPDATE sanpham set tensp=?,anh=?,mota=?,chitiet=?,giaban=?,giakm=?,maloai=?,mancc=?  WHERE masp = ?",
    [
      sanpham.tensp,
      sanpham.anh,
      sanpham.mota,
      sanpham.chitiet,
      sanpham.giaban,
      sanpham.giakm,
      sanpham.maloai,
      sanpham.mancc,
      sanpham.masp
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
Sanpham.searchdm = (maloai, result) => {
  sql.query(
    `select * from sanpham where maloai = ${maloai}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};
Sanpham.searchprice = (price, result) => {
  if(price==1){
    sql.query(
      `SELECT * FROM sanpham order by giaban asc`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("found: ", res);
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
        
      });
  }
  if(price==2){
    sql.query(
      `SELECT * FROM sanpham order by giakm desc`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("found: ", res);
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
        
      });
  }
  if(price==3){
    sql.query(
      `SELECT * FROM sanpham where giakm < 5000000`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("found: ", res);
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
        
      });
  }
  if(price==4){
    sql.query(
      `SELECT * FROM sanpham where giakm between 5000000 and 10000000`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("found: ", res);
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
        
      });
  }
  if(price==5){
    sql.query(
      `SELECT * FROM sanpham where  giakm between 10000000 and 20000000`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("found: ", res);
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
        
      });
  }
  if(price==6){
    sql.query(
      `SELECT * FROM sanpham where giakm > 20000000`,
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        if (res.length) {
          console.log("found: ", res);
          result(null, res);
          return;
        }
        result({ kind: "not_found" }, null);
        
      });
  }
  
};
Sanpham.search = (key, result) => {
  sql.query(
    `select * from sanpham where tensp like '%${key}%'`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        console.log("found: ", res);
        result(null, res);
        return;
      }
      result({ kind: "not_found" }, null);
    }
  );
};
Sanpham.remove = (id, result) => {
  sql.query("DELETE FROM sanpham WHERE masp = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted sanpham with id: ", id);
    result(null, res);
  });
};
module.exports = Sanpham;
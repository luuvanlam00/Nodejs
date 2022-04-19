const sql = require("./db.js");
const Ncc = function(ncc){
    this.mancc = ncc.mancc;
    this.tenncc = ncc.tenncc;
};
Ncc.getAll = (result)=>{
    sql.query(
        "select * from ncc order by mancc desc",
        (err, res) => {
          if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
          }
          console.log("ncc: ", res);
          result(null, res);
        }
      );
    
};
Ncc.create = (newncc, result) => {
  sql.query("INSERT INTO ncc SET ?", newncc, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    newncc.maloai = res.insertId;
    console.log("created newncc: ", {...newncc });
    result(null, {...newncc });
  });
};
Ncc.updateById = (ncc, result) => {
  sql.query(
    "UPDATE ncc set tenncc=?  WHERE mancc = ?",
    [
    ncc.tenncc,
    ncc.mancc,
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
Ncc.findById = (id, result) => {
  sql.query(
    `select * from ncc where mancc = ${id}`,
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
Ncc.remove = (id, result) => {
  sql.query("DELETE FROM ncc WHERE mancc = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("deleted ncc with id: ", id);
    result(null, res);
  });
};
module.exports = Ncc;
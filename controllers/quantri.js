const sql = require("../models/db.js");
const Danhmuc = require("../models/danhmuc.js");
const Ncc = require("../models/ncc.js");
const Khachhang = require("../models/khachhang.js");
const Sanpham = require("../models/sanpham.js");
const Hoadon = require("../models/hoadon.js");
const Nguoidung = require("../models/nguoidung.js");
const Cthd = require("../models/cthd.js");
const multer = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })
exports.home = function (req, res,next) {    
    res.render('backend/quantri');   
  };
  exports.danhMuc = function (req, res,next) {  
    Danhmuc.getAll((err, danhmuc) => {
        if (err) 
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving...",
        });
      else {
        
        res.render('backend/danhmucsp', {danhmuc:danhmuc });
      }
    });  
  };
  exports.creatDanhmuc = (req, res) => {
    const danhmuc = new Danhmuc({
        maloai: null,
        tenloai:req.body.tenloai,
     
       });
       Danhmuc.create(danhmuc, (err, danhmuc) => {
        if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating...",
        });
        else 	{req.flash('success_msg', 'Thêm mới Thành Công');
            res.redirect('/quantri/danhmuc');}

      });
  };
  exports.findByIdDm = (req, res) => {
    var id = req.params.id;
     Danhmuc.findById(id, (err, data) => {
        res.render('backend/suadm',{danhmuc:data});
    }); 
 
  };
  exports.getCreatdm = (req, res) => {
    res.render('backend/themdm');

  };
  exports.updateDanhmuc = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const danhmuc = new Danhmuc({  
        tenloai:req.body.tenloai,
        maloai: req.body.maloai,
     
       });
     
    Danhmuc.updateById(danhmuc, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.maloai}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.maloai,
          });
        }
      } else { req.flash('success_msg', 'Đã sửa Thành Công');
          res.redirect('/quantri/danhmuc');}
    });
  };
  exports.deleteDm = (req, res) => {
    Danhmuc.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found danh muc with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete danhmuc with id " + req.params.id,
          });
        }
      } else {
         req.flash('success_msg', 'Đã xóa Thành Công');
          res.redirect('/quantri/danhmuc');
         
        
        }
    });
  };
///
  exports.ncc = function (req, res,next) {  
    Ncc.getAll((err, ncc) => {
        if (err) 
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving...",
        });
      else {
        
        res.render('backend/ncc', {ncc:ncc });
      }
    });  
  };
  exports.createNcc = (req, res) => {
    const ncc = new Ncc({
        mancc: null,
        tenncc:req.body.tenncc,
     
       });
       Ncc.create(ncc, (err, ncc) => {
        if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating...",
        });
        else 	{req.flash('success_msg', 'Thêm mới Thành Công');
            res.redirect('/quantri/ncc');}

      });
  };
  exports.findByIdNcc = (req, res) => {
    var id = req.params.id;
     Ncc.findById(id, (err, data) => {
        res.render('backend/suancc',{ncc:data});
    }); 
 
  };
  exports.getCreatNcc = (req, res) => {
    res.render('backend/themncc');

  };
  exports.updateNcc = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const ncc = new Ncc({
        mancc: req.body.mancc,
        tenncc:req.body.tenncc,
     
       });
     
    Ncc.updateById(ncc, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.mancc}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.mancc,
          });
        }
      } else { req.flash('success_msg', 'Đã sửa Thành Công');
          res.redirect('/quantri/ncc');}
    });
  };
  exports.deleteNcc = (req, res) => {
    Ncc.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found ncc with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete ncc with id " + req.params.id,
          });
        }
      } else {
         req.flash('success_msg', 'Đã xóa Thành Công');
          res.redirect('/quantri/ncc');
         
        
        }
    });
  };
  //
  exports.khachhang = function (req, res,next) {  
    Khachhang.getAll((err, khachhang) => {
        if (err) 
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving...",
        });
      else {
        
        res.render('backend/khachhang', {khachhang:khachhang });
      }
    });  
  };
  exports.createKh = (req, res) => {
    const khachhang = new Khachhang({
        id_kh: null,
        tenkh:req.body.tenkh,
        email:req.body.email,
        sdt:req.body.sdt
     
       });
       Khachhang.create(khachhang, (err, data) => {
        if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating...",
        });
        else 	{req.flash('success_msg', 'Thêm mới Thành Công');
            res.redirect('/quantri/khachhang');}

      });
  };
  exports.findByIdKh = (req, res) => {
    var id = req.params.id;
    Khachhang.findById(id, (err, data) => {
        res.render('backend/suakh',{khachhang:data});
    }); 
 
  };
  exports.getCreatKh = (req, res) => {
    res.render('backend/themkh');

  };
  exports.updateKh = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const khachhang = new Khachhang({
        id_kh: req.body.id_kh,
        tenkh:req.body.tenkh,
        email:req.body.email,
        sdt:req.body.sdt
     
       });
     
    Khachhang.updateById(khachhang, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.id_kh}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.id_kh,
          });
        }
      } else { req.flash('success_msg', 'Đã sửa Thành Công');
          res.redirect('/quantri/khachhang');}
    });
  };
  exports.deleteKh = (req, res) => {
    Khachhang.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete  with id " + req.params.id,
          });
        }
      } else {
         req.flash('success_msg', 'Đã xóa Thành Công');
          res.redirect('/quantri/khachhang');
         
        
        }
    });
  };
  //
  exports.sanpham = function (req, res,next) {  
    Sanpham.getSp((err, sanpham) => {
        if (err) 
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving...",
        });
      else {
        
        res.render('backend/sanpham', {sanpham:sanpham });
      }
    });  
  };
  exports.getCreatSp = (req, res) => {
    Danhmuc.getAll((err, danhmuc) => {
        Ncc.getAll((err, ncc) => {
            if (err) 
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving...",
            });
          else {
            
            res.render('backend/themsp',{danhmuc:danhmuc,ncc:ncc});
          }
        });  
    });  
  };
  exports.createSp = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const sanpham = new Sanpham({
        masp:null,
        tensp:req.body.tensp,
        anh:req.file.originalname,
        mota:req.body.mota,
        chitiet:req.body.chitiet,
        giaban:req.body.giaban,
        giakm:req.body.giakm,
        maloai:req.body.maloai,
        mancc:req.body.mancc,
      
       });
       Sanpham.create(sanpham, (err, data) => {
        if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating...",
        });
        else 	{req.flash('success_msg', 'Thêm mới Thành Công');
            res.redirect('/quantri/sanpham');}

      });
  };
  exports.updateSp = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    var anh;
    Sanpham.findById(req.body.masp, (err, data) => {
      if(req.file){
          anh= req.file.originalname;
      }
      else{
        anh=data.anh;
      } 
      const sanpham = new Sanpham({
        masp:req.body.masp,
        tensp:req.body.tensp,
        anh:anh,
        mota:req.body.mota,
        chitiet:req.body.chitiet,
        giaban:req.body.giaban,
        giakm:req.body.giakm,
        maloai:req.body.maloai,
        mancc:req.body.mancc,
      
       });
       Sanpham.updateById(sanpham, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found with id ${req.params.masp}.`,
            });
          } else {
            res.status(500).send({
              message: "Error updating with id " + req.params.masp,
            });
          }
        } else { req.flash('success_msg', 'Đã sửa Thành Công');
            res.redirect('/quantri/sanpham');}
      });
    });
  };
  exports.deleteSp = (req, res) => {
    Sanpham.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete  with id " + req.params.id,
          });
        }
      } else {
         req.flash('success_msg', 'Đã xóa Thành Công');
          res.redirect('/quantri/sanpham');
         
        
        }
    });
  };
  exports.findByIdSp = (req, res) => {
    var id = req.params.id;
    Sanpham.findById(id, (err, data) => {
      Danhmuc.getAll((err, danhmuc) => {
        Ncc.getAll((err, ncc) => {
          res.render('backend/suasp',{sanpham:data,danhmuc:danhmuc,ncc:ncc});
        }); 
      }); 
    }); 
   
  };
  //
  exports.hoadon = function (req, res,next) {  
    Hoadon.getAll((err, hoadon) => {
        if (err) 
        res.status(500).send({
          message: err.message || "Some error occurred while retrieving...",
        });
      else {
        
        res.render('backend/hoadon', {hoadon:hoadon });
      }
    });  
  };
  exports.cthd = (req, res) => {
    var id = req.params.id;
    Cthd.findByid(id, (err, data) => {
      Sanpham.getAll((err, sanpham) => {
        Hoadon.tongtien(id,(err, tongtien) => {
          res.render('backend/cthd',{cthd:data,sanpham:sanpham,tongtien:tongtien});
        });
      });
        
    }); 
   
  };
  exports.deletehd = (req, res) => {
    Hoadon.remove(req.params.id, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.id}.`,
          });
        } else {
          res.status(500).send({
            message: "Could not delete  with id " + req.params.id,
          });
        }
      } else {
         req.flash('success_msg', 'Đã xóa Thành Công');
          res.redirect('/quantri/hoadon');
         
        
        }
    });
  };
  exports.findByIdhd = (req, res) => {
    var id = req.params.id;
    Hoadon.findById(id, (err, data) => {
        res.render('backend/suahd',{hoadon:data});
    }); 
 
  };
  exports.trongngay = (req, res) => {
    var ngay = new Date();
    Hoadon.trongngay(ngay, (err, data) => {
        res.render('backend/hoadon',{hoadon:data});
    }); 
 
  };
  exports.updatehd = (req, res) => {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    const hoadon = new Hoadon({
        id_hd: req.body.id_hd,
        tenkh:req.body.tenkh,
        sdt:req.body.sdt,
        email:req.body.email,
        diachi: req.body.diachi,
        trangthai:req.body.trangthai
     
       });
    
    Hoadon.updateById(hoadon, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found with id ${req.params.id_hd}.`,
          });
        } else {
          res.status(500).send({
            message: "Error updating with id " + req.params.id_hd,
          });
        }
      } else { req.flash('success_msg', 'Đã sửa Thành Công');
          res.redirect('/quantri/hoadon');}
    });
  };
//
exports.getlogin = (req, res) => {
      res.render('backend/login');
};
exports.getregister = (req, res) => {
  res.render('backend/register');
};
exports.login = (req, res) => {
  sql.query(
    `SELECT * FROM nguoidung WHERE taikhoan = '${req.body.user}' and matkhau = '${req.body.pass}'  `,
    (err, nguoidung) => {
      if (err) {
        req.flash('error_msg', 'Tài khoản hoặc mật khẩu sai');
        res.redirect('/getlogin');
      }
      else{
       
        if(nguoidung[0].vaitro == 'admin'){
              res.redirect('/quantri');
             }
             else{
              req.flash('success_msg', nguoidung);
              res.redirect('/');
             }
      } 
    }
  );
  
};
exports.register = (req, res) => {
  if(req.body.mk == req.body.mk2){
    var vaitro = 'user';
    const nguoidung = new Nguoidung({
        taikhoan: req.body.ten,
        matkhau:req.body.mk,
        vaitro:vaitro,
       
       });
       Nguoidung.create(nguoidung, (err, data) => {
        if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating...",
        });
        else 	{req.flash('success_msg', 'Tạo tài khoản thành công');
            res.redirect('/getlogin');}
  
      });
    
  }
  else{
    req.flash('error_msg', 'Mật khẩu không khớp');
    res.redirect('getregister');
  }
  
};
var express = require('express');
var router = express.Router();
const sanpham = require("../controllers/sanphamController.js");
const quantri = require("../controllers/quantri.js");
const Sanpham = require("../models/sanpham.js");
var multer  = require('multer');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/images')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  }
});

var upload = multer({ storage: storage });
router.get('/', sanpham.home);
router.get('/sanpham', sanpham.findAll);
router.get("/sanpham/chitiet/:id",sanpham.findOne);
router.post("/sanpham/create/binhluan",sanpham.createBinhluan);
router.post("/sanpham/search",sanpham.search);       
router.get("/sanpham/:maloai",sanpham.searchdm);
router.get("/sanpham/price/:price",sanpham.searchprice);  
router.get('/add-cart/:id',sanpham.addCart);
router.get('/giohang', sanpham.gioHang);    
router.post("/update/giohang",sanpham.updategioHang);
router.post("/delete/giohang",sanpham.deletegioHang);
router.get('/dathang', sanpham.datHang);  
router.post('/hoanthanh', sanpham.hoanThanh);  
//
router.get('/quantri', quantri.home); 

router.get('/quantri/danhmuc', quantri.danhMuc); 
router.post('/quantri/danhmuc/create', quantri.creatDanhmuc);  
router.get('/quantri/danhmuc/getcreate', quantri.getCreatdm); 
router.get('/quantri/danhmuc/getupdate/:id', quantri.findByIdDm);  
router.post('/quantri/danhmuc/update', quantri.updateDanhmuc);
router.get('/quantri/danhmuc/delete/:id', quantri.deleteDm);
//
router.get('/quantri/ncc', quantri.ncc); 
router.post('/quantri/ncc/create', quantri.createNcc);  
router.get('/quantri/ncc/getcreate', quantri.getCreatNcc); 
router.get('/quantri/ncc/getupdate/:id', quantri.findByIdNcc);  
router.post('/quantri/ncc/update', quantri.updateNcc);
router.get('/quantri/ncc/delete/:id', quantri.deleteNcc);
//
router.get('/quantri/khachhang', quantri.khachhang);
router.post('/quantri/khachhang/create', quantri.createKh);  
router.get('/quantri/khachhang/getcreate', quantri.getCreatKh); 
router.get('/quantri/khachhang/getupdate/:id', quantri.findByIdKh);  
router.post('/quantri/khachhang/update', quantri.updateKh);
router.get('/quantri/khachhang/delete/:id', quantri.deleteKh);
//
router.get('/quantri/sanpham', quantri.sanpham); 
router.get('/quantri/sanpham/getcreate', quantri.getCreatSp);  
router.get('/quantri/sanpham/delete/:id', quantri.deleteSp);
router.post('/quantri/sanpham/create', upload.single('anh'),quantri.createSp);
router.get('/quantri/sanpham/getupdate/:id',quantri.findByIdSp);  
router.post('/quantri/sanpham/update', upload.single('anh'),quantri.updateSp);
//
router.get('/quantri/hoadon', quantri.hoadon); 
router.get('/quantri/hoadon/chitiet/:id',quantri.cthd);  
router.get('/quantri/hoadon/delete/:id', quantri.deletehd);
router.get('/quantri/hoadon/getupdate/:id',quantri.findByIdhd);
router.post('/quantri/hoadon/update', quantri.updatehd);
//
router.get('/getlogin', quantri.getlogin); 
router.get('/getregister', quantri.getregister); 
router.post('/login', quantri.login); 
router.post('/register', quantri.register); 
module.exports = router;

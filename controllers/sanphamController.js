const Sanpham = require("../models/sanpham.js");
const Danhmuc = require("../models/danhmuc.js");
const Binhluan = require("../models/binhluan.js");
var GioHang = require('../models/giohang.js');
const Hoadon = require('../models/hoadon.js');
const Cthd = require('../models/cthd.js');
const Khachhang = require('../models/khachhang.js');
exports.findAll = function (req, res,next) {
    Sanpham.getAll((err, sanpham) => {
        Danhmuc.getAll((err, danhmuc) => {
            if (err) 
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving...",
            });
          else {
            
            res.render('frontend/sanpham', { sanpham: sanpham,danhmuc:danhmuc });
          }
        });
    });
  };

	exports.search = function (req, res,next) {
    Sanpham.search(req.body.search,(err, sanpham) => {
        Danhmuc.getAll((err, danhmuc) => {
            if (err) 
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving...",
            });
          else {
            
            res.render('frontend/sanphamsearch', { sanpham: sanpham,danhmuc:danhmuc });
          }
        });
    });
  };

  exports.searchdm = function (req, res,next) {
    Sanpham.searchdm(req.params.maloai,(err, sanpham) => {
        Danhmuc.getAll((err, danhmuc) => {
            if (err) 
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving...",
            });
          else {
            
            res.render('frontend/sanphamdm', { sanpham: sanpham,danhmuc:danhmuc });
          }
        });
    });
  };
  exports.searchprice = function (req, res,next) {
    Sanpham.searchprice(req.params.price,(err, sanpham) => {
        Danhmuc.getAll((err, danhmuc) => {
            if (err) 
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving...",
            });
          else {
            
            res.render('frontend/sanphamprice', { sanpham: sanpham,danhmuc:danhmuc });
          }
        });
    });
  };
  exports.home = function (req, res,next) {
    Sanpham.get1((err, sanpham1) => {
        Sanpham.get2((err, sanpham2) => {
            if (err) 
            res.status(500).send({
              message: err.message || "Some error occurred while retrieving...",
            });
          else {
            res.render('index', { sanpham1: sanpham1 ,sanpham2:sanpham2});
          }	
        });
      });
  };
  exports.findOne = (req, res) => {
    Sanpham.findById(req.params.id, (err, data) => {
      Binhluan.findByMasp(req.params.id,(err,data2) =>{
        Sanpham.get1((err,sanpham) =>{
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found with id ${req.params.id}.`,
              });
            } else {
              res.status(500).send({
                message: "Error retrieving with id " + req.params.id,
              });
            }
          }  res.render('frontend/chitiet', { sanpham1: data,binhluan:data2,sanpham2:sanpham, masp:req.params.id});
     
        });
      });
      }); 
   
  };
  exports.addCart = (req, res) => {
    var id = req.params.id;
	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
  Sanpham.findById(id, (err, data) => {
    giohang.add(id, data);
		req.session.cart = giohang;
		res.redirect('/giohang')
    }); 
 
  };
  exports.gioHang = (req, res) => {
  	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
	  var data = giohang.convertArray();
   	res.render('frontend/giohang', {data: data}); 
  };
  exports.datHang = (req, res) => {
  	var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
	  var data = giohang.convertArray();
   	res.render('frontend/dathang', {data: data}); 
  };
  exports.updategioHang = (req, res) => {

    var id 			= req.body.id;;
    var soluong 	= req.body.soluong;
    var giohang 	= new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
    giohang.updateCart(id, soluong);
    req.session.cart = giohang;
    res.json({st: 1});
  };
  exports.deletegioHang = (req, res) => {
    var id 			= req.body.id;
    var giohang 	= new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
    giohang.delCart(id);
    req.session.cart = giohang;
    res.json({st: 1});
  };
  exports.hoanThanh = (req, res) => {
    var giohang = new GioHang( (req.session.cart) ? req.session.cart : {items: {}} );
    var data = giohang.convertArray();
    let date = new Date();
    var trangthai = 'Chưa xác nhận';
    var thanhtoan = 'Offline';
    const khachhang = new Khachhang({
      id_kh: null,
      tenkh:req.body.name,
      email: req.body.email,
      sdt: req.body.dt,
     });
    const hoadon = new Hoadon({
     id_hd: null,
     thoigian: date,
     tenkh:req.body.name,
     sdt: req.body.dt,
     email: req.body.email,
     diachi: req.body.add,
     trangthai:trangthai,
     thanhtoan:thanhtoan,
    });
    Khachhang.create(khachhang, (err, khachhang) => {
      if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating...",
      });
    });
    Hoadon.create(hoadon, (err, hoadon1) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating...",
        });
      else {   
        if(data){
         data.forEach(function(item){
           const cthd = new Cthd({
              id_cthd:null,
              id_hd : hoadon1.id_hd,
              masp :item.item.masp,
              giaban: item.item.giakm,
              soluong :item.soluong,
           });
           Cthd.create(cthd,(err,cthd) =>{
            if (err)
            res.status(500).send({
              message: err.message || "Some error occurred while creating...",
            });
           });
           giohang.delCart(item.item.masp);
         });
         res.render('frontend/hoanthanh');
        }
      }
    });
  };
  exports.createBinhluan = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
    }
    // Create a binhluan
    let date = new Date();
    const binhluan = new Binhluan({
     id_bl: null,
     masp:req.body.masp,
     ten:req.body.ten,
     noidung:req.body.noidung,
     ngay:date,
    });
    // Save binhluan in the database
    Binhluan.create(binhluan, (err, data) => {
      if (err)
        res.status(500).send({
          message: err.message || "Some error occurred while creating...",
        });
      else res.redirect('/sanpham/chitiet/'+binhluan.masp+'');
    });
  };
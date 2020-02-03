var express = require('express');
var router = express.Router();
const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'mydb',
  password: '123123',
  port: 5432,
})

/* GET home page. */
router.get('/', function(req, res, next) {});

// GET data to frontend from postgre sql
router.get('/getdata01', function(req, res, next) {

  pool.query('SELECT * FROM products',(error,response) => {
    if(error){
      console.log(error);
    }else{
      res.send(response.rows);
    }
  })
});

// Add Data
router.get('/add', function(req, res, next) {
  res.render('add',{});
});

router.post('/add', function(req, res, next) {
  var product_name = req.body.product_name,
  product_price = req.body.product_price,
  image = req.body.image ;

  pool.query("INSERT INTO products (product_name,product_price,image) VALUES ($1,$2,$3)",[product_name,product_price,image],(err,res)=>{
    if(err){
      console.log(err);
    }else{
      console.log("Đã thêm dữ liệu thành công");
    }
  });

});

module.exports = router;

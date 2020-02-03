import React, { Component } from 'react';
import './App.css';
import HeadTitle from './HeadTitle';
import Product from './Product';
import axios from 'axios';

const getProductData = () => axios.get('/getdata01').then((res) => res.data)
const addProductAction = (product_name,product_price,image) => (axios.post('/add',{product_name,product_price,image}).then((resp) => resp.data))

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data:null,
      product_name: '',
      product_price: '',
      image: ''
    }
  }
  
  componentWillMount() {
    if(this.state.data === null){
      getProductData().then((res) => {
        this.setState({
          data:res
        });
      })
    }
  }
  
  printData = () => {
    if(this.state.data !== null){
      return this.state.data.map((value,key) => (
        <Product
        key = {key}
        product_name = {value.product_name}
        product_price = {value.product_price}
        image = {value.image}
      ></Product>
        ) 
      )
    }
  }

  isChange = (event) => {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
        [name]:value
    })
  }

  handleClick = () => {
      var {product_name,product_price,image} = this.state;
      var dataTemp = [];
      var item = {};

      item.product_name = product_name;
      item.product_price = product_price;
      item.image = image;

      dataTemp = this.state.data;
      if(item.product_name !== ''){
        dataTemp.push(item);
      }
      console.log(dataTemp);
      addProductAction(product_name,product_price,image).then((response) => {
          console.log(response);
      })
  }

  render() {
    return (
      <div>
        <HeadTitle></HeadTitle>
        <div className="container-fluid">
          <div className="row">
            <div className="col-9">
            <div className="row">
              {this.printData()}
            </div>
            </div>
            <div className="col-3">
              <form action="/add" method="post">
                    <div className="form-group">
                        <label >Tên sản phẩm</label>
                        <input onChange = {(event) => this.isChange(event)} type="text" name="product_name" id="product_name" className="form-control" placeholder="Nhập tên sản phẩm" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Tên sản phẩm</small>
                    </div>
                    <div className="form-group">
                        <label >Giá</label>
                        <input onChange = {(event) => this.isChange(event)} type="text" name="product_price" id="product_price" className="form-control" placeholder="Nhập giá sản phẩm" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Giá sản phẩm</small>
                    </div>
                    <div className="form-group">
                        <label >Ảnh sản phẩm</label>
                        <input onChange = {(event) => this.isChange(event)} type="text" name="image" id="image" className="form-control" placeholder="Thêm link sản phẩm" aria-describedby="helpId" />
                        <small id="helpId" className="text-muted">Link sản phẩm</small>
                    </div>
                    <button type="reset" onClick={() => this.handleClick()} className="btn btn-block btn-primary">Thêm dữ liệu</button>
                </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

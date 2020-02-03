import React, { Component } from 'react';
import axios from 'axios';

const addProductAction = (product_name,product_price,image) => (axios.post('/add',{product_name,product_price,image}).then((resp) => resp.data))
     
class AddNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product_name: '',
            product_price: '',
            image: ''
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
        addProductAction(product_name,product_price,image).then((response) => {
            console.log(response);
        })
    }

    render() {
        return (
            <div>
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
        );
    }
}

export default AddNew;
import React, { Component } from 'react';

class Product extends Component {
    render() {
        return (
            <div className="col-4">
                <div className="card text-left">
                    <img className="card-img-top" src={this.props.image} alt="" />
                    <div className="card-body">
                    <h4 className="card-title float-left">
                        {this.props.product_name}
                    </h4>
                    <p className="card-text float-right">
                        {this.props.product_price}
                    </p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
import React, {useEffect, useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {loadProducts} from '../../reducers/rootReducer'

const StoreDetail = ({store_id, category_id}) => {
    const [categoryProducts, setCategoryProducts] = useState([])

    const products = useSelector((state) => state.products);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadProducts())
    }, [])
    // console.log(categoryProducts)
    
    useEffect(() => {
        products.data && setCategoryProducts(products.data.filter(product => {
            return (
                (category_id ? parseInt(product.category_id) === category_id : true) && (product.store_id === store_id)
            )
        }))
    }, [store_id, category_id, products])

    return (
            categoryProducts.map((product, key) => {
                return(
                    <div key={key} className='productCard'>
                        <div className='productImgWrapper'>
                            <img src='https://media.wired.com/photos/5c9040ee4950d24718d6da99/master/w_2560%2Cc_limit/shoppingcart-1066110386.jpg' alt=''/>
                        </div>
                        <div className='productInfo'>
                            <div>{`${product.product_name} - $${product.price}`}</div>
                            <div>{product.category_name}</div>
                        </div>
                    </div>
                )
            })
    )
}

// const mapDispatchToProps = (dispatch) => {
// 	return {
//         loadProducts: () => dispatch(loadProducts()),
// 	}
// }
  
export default StoreDetail
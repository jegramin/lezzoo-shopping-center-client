import React, {useEffect, useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {loadCategories, loadStores} from '../../reducers/rootReducer'
import axios from 'axios'
import AddCategory from '../categories/AddCategory'
import AddProductForm from '../products/AddProductForm'
import CategoriesList from '../categories/CategoriesList'
import ProductsList from '../products/ProductsList'

const StoreDetail = (props) => {
    const [store, setStore] = useState([])
    const [selectedCategory, setSelectedCategory] = useState()
    const [toggleProducts, setToggleProducts] = useState(false)

    const stores = useSelector((state) => state.stores);
    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadStores())
        dispatch(loadCategories())
    }, [props])

    useEffect(() => {
        stores.data && setStore(stores.data.find(store => store.id === props.id))
    }, [stores, categories])

    const clickHandler = (id) => {
        setSelectedCategory(id)
    }
    const toggleForm = () => {
        setToggleProducts(false)
    }

    return (
        <div className='storesContainer'>
            <div className='storeDetails'>
                <div className='categoryHeader'>
                    <h1>{store.name}</h1>
                    <AddCategory store_id={store.id}/>
                </div>
                <div>
                    <CategoriesList store_id={props.id} selectedCategory={selectedCategory} clickHandler={clickHandler} /> 
                </div>
            </div>
            <div className='productsWrapper'>
            {!toggleProducts ? <ProductsList store_id={store.id} category_id={selectedCategory}/> : <AddProductForm store_id={store.id} category_id={selectedCategory} toggleForm={toggleForm}/>}
            </div>
            <div className='addProductsBtnWrapper'>
                <button onClick={() => setToggleProducts(!toggleProducts)}>
                    {
                        !toggleProducts ? 'Add New Product to Selected Category' : 'Cancel'
                    }
                </button>
            </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => {
    let id = parseInt(ownProps.match.params.id);
    
    return {
      id
    }
  }
  
const mapDispatchToProps = (dispatch) => {
	return {
        loadStores: () => dispatch(loadStores()),
        loadCategories: () => dispatch(loadCategories())
	}
}
  
  export default connect(mapStateToProps, mapDispatchToProps)(StoreDetail)
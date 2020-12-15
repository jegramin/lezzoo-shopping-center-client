import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {loadCategories} from '../../reducers/rootReducer'

const CategoriesList = ({store_id, selectedCategory, clickHandler}) => {
    const [storeCategories, setStoreCategories] = useState([])

    const categories = useSelector((state) => state.categories);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(loadCategories())
    }, [])
    // console.log(categoryProducts)
   
    useEffect(() => {
        categories.data && setStoreCategories(categories.data.filter(category => category.store_id === store_id))
    }, [categories])

    return (
            storeCategories.map((category, key) => {
                return (
                    <div key={key} onClick={() => clickHandler(category.id)}>
                        <div className='imgWrapper'>
                            <img src='https://media.wired.com/photos/5c9040ee4950d24718d6da99/master/w_2560%2Cc_limit/shoppingcart-1066110386.jpg' alt=''/>
                        </div>
                        <p style={{color: selectedCategory === category.id && '#027be3'}}>{category.name}</p>
                    </div>
                )
            })
    )
}
  
export default CategoriesList
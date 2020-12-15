import {setStores} from '../actions/storeActions'
import {setCategories} from '../actions/categoryActions'
import {setProducts} from '../actions/productActions'

const initState = {
    stores: [],
    categories: [],
    products: [],
  }
  
  const rootReducer = (state = initState, action) => {
    switch(action.type){
        case 'SET_STORES': {
          return {...state, stores: action.payload}
        }
        case 'SET_CATEGORIES': {
          return {...state, categories: action.payload}
        }
        case 'SET_PRODUCTS': {
          return {...state, products: action.payload}
        }
        default:
          return state
      }
  }

  export const loadStores = () => async (dispatch, getState) => {
    const stores = await fetch("http://localhost:5000/getAllStores").then(res => res.json())
    dispatch(setStores(stores))
  } 
  export const loadCategories = () => async (dispatch, getState) => {
    const categories = await fetch(`http://localhost:5000/getAllCategories`).then(res => res.json())
    dispatch(setCategories(categories))
  } 
  export const loadProducts = () => async (dispatch, getState) => {
    const products = await fetch(`http://localhost:5000/getAllProducts`).then(res => res.json())
    dispatch(setProducts(products))
  } 
  
  export default rootReducer
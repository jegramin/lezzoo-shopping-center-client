import React, {useState} from 'react'
import { useDispatch } from 'react-redux'
import {loadProducts} from '../../reducers/rootReducer'
import axios from 'axios'

const AddStore = ({store_id, category_id, toggleForm}) => {
    const [productName, setProductName] = useState([])
    const [productPrice, setProductPrice] = useState(0)
    const [selectedFile, setSelectedFile] = useState('')

    const dispatch = useDispatch();

    const fileChangedHandler = event => {
        setSelectedFile(event.target.files[0])
    }

    const clickHanler = () => {
        if (category_id) {
            const formData = new FormData()
            formData.append(
            'myFile',
            selectedFile,
            selectedFile.name
            )
            axios.post('http://localhost:5000/picture', formData)
                .then((res) => {
                    axios.post('http://localhost:5000/addNewProduct', {
                    store_id,
                    category_id,
                    name: productName,
                    price: productPrice,
                    image_reference: res.data.reference
                }).then(() => {
                    dispatch(loadProducts())
                    toggleForm()
                })
            })
            .catch(err => console.log(err))
            

        } else {
            alert('Please choose a category')
        }
        
    }

    return (
        <span className='productFormWrapper'>
            <div>
                <input type='text' value={productName} placeholder="New Product" onChange={(e) => setProductName(e.target.value)}/>
                <input type='number' value={productPrice} placeholder="Price" onChange={(e) => setProductPrice(e.target.value)}/>
                <input type='file' name='picture' onChange={fileChangedHandler}/>
                <button onClick={clickHanler}>Add Product</button>
            </div>
        </span>
    )
}
export default AddStore
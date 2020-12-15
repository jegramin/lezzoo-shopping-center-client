import React, {useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {loadCategories} from '../../reducers/rootReducer'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddStore = ({store_id}) => {
    const [categoryName, setCategoryName] = useState([])
    const [selectedFile, setSelectedFile] = useState('')

    const dispatch = useDispatch();

    const fileChangedHandler = event => {
        setSelectedFile(event.target.files[0])
    }

    const clickHanler = () => {
        const formData = new FormData()
        formData.append(
          'myFile',
          selectedFile,
          selectedFile.name
        )
        axios.post('http://localhost:5000/picture', formData)
        .then((res) => {
            axios.post('http://localhost:5000/addNewCategoryToStore', {
                store_id,
                name: categoryName,
                image_reference: res.data.reference
            }).then(() => dispatch(loadCategories()))
        })
        
    }

    return (
        <span className='formWrapper'>
            <div>
                <input type='text' value={categoryName} placeholder="New Category" onChange={(e) => setCategoryName(e.target.value)}/>
                <input type='file' name='picture' onChange={fileChangedHandler}/>
            <button onClick={clickHanler}>Add Category</button>
            </div>
        </span>
    )
}

// const mapStateToProps = (state) => {
// 	return {
// 		stores: state.stores
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		loadStores: () => dispatch(loadStores())
// 	}
// }
export default AddStore
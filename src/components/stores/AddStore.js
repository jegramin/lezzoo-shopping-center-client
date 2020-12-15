import React, {useState} from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import {loadStores} from '../../reducers/rootReducer'
import axios from 'axios'
import { useHistory } from "react-router-dom";

const AddStore = (props) => {
    const [storeName, setStoreName] = useState('')
    const [selectedFile, setSelectedFile] = useState('')

    const history = useHistory();

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
            axios.post('http://localhost:5000/addNewStore', {
                name: storeName,
                logo_reference: res.data.reference
            })
        })
        .then(() => dispatch(loadStores()))
        
        history.push("/")
    }

    return (
        <div className='storesContainer'>
            <div className='form'>
                <input type='text' value={storeName} placeholder="Store Name" onChange={(e) => setStoreName(e.target.value)}/>
                <input type='file' name='storeImage' name='picture' onChange={fileChangedHandler}/>
                <button onClick={clickHanler}>Add Store</button>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
	return {
		stores: state.stores
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadStores: () => dispatch(loadStores())
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(AddStore)
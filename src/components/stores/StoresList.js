import React, {useEffect} from 'react'
import { connect, useDispatch } from 'react-redux'
import {loadStores, loadCategories, loadProducts} from '../../reducers/rootReducer'
import StoreCard from './StoreCard'
import {Link} from 'react-router-dom'

const Store = (props) => {
    const dispatch = useDispatch();
	const {data} = props.stores
	
    useEffect(() => {
        dispatch(loadStores())
        dispatch(loadCategories())
        dispatch(loadProducts())
    }, [])

    const cardGrid = data && data.map((data, key) => <StoreCard data={data} key={key}/>)

    return(
		<div className='storesContainer'>
			<div>
				<Link to='/add-store'>
					<button>
						Add Store
					</button>
				</Link>
			</div>
			<div>{cardGrid}</div>
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
		loadStores: () => dispatch(loadStores()),
		loadCategories: () => dispatch(loadCategories())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Store)
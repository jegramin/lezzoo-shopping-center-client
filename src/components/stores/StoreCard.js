import React from 'react'
import {Link} from 'react-router-dom'

const storeCard = ({data}) => {
    return (
        <Link to={`/store-detail/${data.id}`} className='link'>
            <div key={data.id} className='storeCard'>
                <img src={'https://media.wired.com/photos/5c9040ee4950d24718d6da99/master/w_2560%2Cc_limit/shoppingcart-1066110386.jpg'} alt=''/>
                <h3>{data.name}</h3>
            </div>
        </Link>
    )
}

export default storeCard

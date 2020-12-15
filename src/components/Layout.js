import React from 'react'
import Header from './Header'

const layout = (props) => {
    return (
        <div className='layoutContainer'>
            <Header />
            <div className='content'>
                {props}
            </div>
        </div>
    )
}

export default layout
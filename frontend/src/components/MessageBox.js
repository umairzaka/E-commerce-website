import React from 'react'

function MessageBox(props) {
    return (
        <div>
            <h2 className='error-variant'>{props.children}</h2>
        </div>
    )
}

export default MessageBox

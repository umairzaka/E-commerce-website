import React from 'react'

function MessageBox(props) {
    return (
        <div>
            <h2 className={`alert alert-${props.variant || 'info'}`}>{props.children}</h2>
        </div>
    )
}

export default MessageBox

import React from 'react'

class Task extends React.Component {
    
    render(){
        return (
            Array(100).fill().map( (_, i)=> {
                return <p key={i}>{i} 1234</p>
            })
        )
    }
}

export default Task
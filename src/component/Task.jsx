import React from 'react'
import MainContainer from './container/MainContainer'

class Task extends React.Component {

    render() {
        return (
            <MainContainer>
                {Array(100).fill().map((_, i) => {
                    return <p key={i}>{i} 1234</p>
                })}
            </MainContainer>
        )
    }
}

export default Task
import React from "react"

class ShowWinner extends React.Component{
    state = { user: ""};

    render(){
        const {winner, users} = this.props;
        console.log(winner)
        console.log(users)
        console.log(users[winner-1])
        return (
            <div>
                <p>
                    Winner : {users[winner-1]}
                </p>
            </div>
        )
    }
}

export default ShowWinner;

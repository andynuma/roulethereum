import React from "react";

class SetUserName extends React.Component{
    constructor(props){
        super(props)
        this.state = { name : ""}
    }

    handleChange = (e) => {
        const username = e.target.value;
        this.setState({name:username})
    }

    handleSubmit = async(e) => {
        e.preventDefault();
        await this.props.addUser(this.state.name);
        console.log("name",this.state.name)
        await this.setState({name : ""})
    }

    render(){
        return(
            <div>
                {/* <p>SetUserName</p> */}
                <form onSubmit={this.handleSubmit}>
                    <input value={this.state.name} onChange={this.handleChange} placeholder="Candicate's name" />
                    <input type="submit" value="Add" />
                </form>
            </div>
        )
    }

}

export default SetUserName;
import React from "react"
import Roulette from "./contracts/Roulette"
import SetUserName from "./components/setUserName";
import List from "./components/List"
// import getInstance from './web3/getInstance';
import web3  from './web3/provider'

export default class App extends React.Component{

  state = {contract : null,accounts:null,storageValue:null, users: []}

  componentDidMount = async () => {
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = Roulette.networks[networkId];
    const instance = new web3.eth.Contract(
      Roulette.abi,
      deployedNetwork.address,
      { from: web3.eth.defaultAccount }
      // {from:accounts[0]}
    );
    await this.setState({contract:instance, accounts:accounts})
    console.log("Your account:",accounts)
    console.log("Contract Instance :",this.state.contract)
  };

  runExample = async () => {
    const { accounts, contract } = await this.state;
    const response = await contract.methods.getTest().call();
    await this.setState({ storageValue: response });
    console.log("Response : ",this.state.storageValue)
  };

  addUser = async(name) =>  {
    const {users, nextId, contract, accounts} = await this.state;
    await this.setState({
      users : [...users, name:name],
      nextId : nextId + 1
    })
  }

  getUsersArray = async () => {
    const { accounts, contract } = await this.state;
    const response = await contract.methods.setUserName(this.state.users)
    await this.setState({ storageValue: response });
    console.log("Response users name : ",this.state.storageValue.arguments[0])
    const response2 = await contract.methods.viewResult().call()
    console.log("Responce winner :",response2)

  };

  generateRandomNumber = async () => {
    const { accounts, contract } = await this.state;
    const response = await contract.methods.generateRandomNumber()
    await this.setState({ storageValue: response });
    console.log("Response random number: ",this.state.storageValue)
  };

    render() {
         return (
            <div>
              {/* <GetOwnerInfo/> */}
              <button onClick={() => this.runExample()}>TEST</button>
              <SetUserName addUser={this.addUser}/>
              <List users={this.state.users}/>
              <button onClick={() => this.getUsersArray()}>TEST</button>
              <button onClick={() => this.generateRandomNumber()}>Random</button>

            </div>
        )
    }
}

// export defalut App;
import React from "react"
import Roulette from "./contracts/Roulette"
import SetUserName from "./components/setUserName";
import ShowWinner from "./components/winner"
import List from "./components/List"
// import getInstance from './web3/getInstance';
import web3  from './web3/provider'

export default class App extends React.Component{

  state = {contract : null,accounts:null,storageValue:null, users: [], winner : ""}

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

  runTest = async () => {
    const { accounts, contract } = await this.state;
    const response = await contract.methods.setTest(99).send({from:accounts[0]});
    await this.setState({ storageValue: response });
    console.log("Response : ",this.state.storageValue)
  };

  addUser = async(name) =>  {
    const {users, contract, accounts} = await this.state;
    this.setState({
      users : [...users, name:name]
    })
    console.log("state array usrs :",this.state.users)
  }

  getUsersArray = async () => {
    const { accounts, contract,users } = await this.state;
    console.log(users)
    const response = await contract.methods.setUserName(users).send({from:accounts[0]})
    this.setState({ storageValue: response });
    console.log("Response users name : ",response)

    const response2 = await contract.methods.viewUsers().call()
    await console.log("Number of User :",response2)

    // const response3 = await contract.methods.getUserNames().send({from:accounts[0]})
    // console.log("User names :",response3)
  };

  generateRandomNumber = async () => {
    const { accounts, contract } = await this.state;
    const response = await contract.methods.generateRandomNumber().send({from:accounts[0]})
    await this.setState({ storageValue: response });
    console.log("Response random number: ",this.state.storageValue)
    const winNum = await contract.methods.getWinner().call()
    this.setState({winner:winNum})
    console.log(winNum)
    console.log(this.state.winner)
  };

    render() {
         return (
            <div className="top-content">
              {/* <GetOwnerInfo/> */}
              {/* <button onClick={() => this.runTest()}>set 99</button>
              <button onClick={() => this.runExample()}>TEST</button> */}
              <h1>Roulette on Ethereum</h1>
              <SetUserName addUser={this.addUser}/>
              <List users={this.state.users}/>
              <p>Send use information to the blockchain</p>
              <button onClick={() => this.getUsersArray()}>Set</button>
              <br/>
              <p>Start Roulette</p>
              <button onClick={() => this.generateRandomNumber()}>Start</button>
              {/* <button onClick={() => this.winnerDecide()}>Decide Winner</button> */}
              <ShowWinner winner={this.state.winner} users={this.state.users} />

              <style jsx>{`
                .top-content{

                }

                button{
                    padding: 8px 24px;
                    color: blue;
                    display: inline-block;
                    opacity: 0.8;
                    border-radius: 4px;

                :hover {
                    opacity: 1;
                  }
                }

              `}</style>

            </div>
        )
    }
}
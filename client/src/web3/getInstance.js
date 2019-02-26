// import web3 from "./provider";
// import Roulette from "../contracts/Roulette"

// const getInstance = async(artifact) => {

//     const contract = await JSON.parse(artifact)

//     const accounts = await web3.eth.getAccounts();
//     // console.log(accounts)
//     // Get the contract instance.
//     const networkId = await web3.eth.net.getId();
//     const deployedNetwork = await contract.networks[networkId];
//     const instance = await new web3.eth.Contract(
//       contract.abi,
//       deployedNetwork && deployedNetwork.address,
//     );
//     // console.log(instance)
// }
// export default getInstance;
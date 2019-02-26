const Roulette = artifacts.require("../contracts/Roulette.sol")

contract("Roulette",(accounts) => {

    beforeEach(async () => {
        contractInstance = await Roulette.deployed()
        organizer = await accounts[0]
        user =  await accounts[1]
    })

    it("can make roulette",async() => {

        user1 = "numa"
        user2 = "andy"
        user3 = "mewtwo"
        user4 = "mizu"

        const tx1 = await contractInstance.setUserName(user1,{from:organizer});
        const tx2 = await contractInstance.setUserName(user2,{from:organizer});
        const tx3 = await contractInstance.setUserName(user3,{from:organizer});
        const tx4 = await contractInstance.setUserName(user4,{from:organizer});

        assert.isOk(tx1);
        assert.isOk(tx2);
        assert.isOk(tx3);
        assert.isOk(tx4);
    })

    it("can make random number",async() => {
        //TODO:random numberがうまく生成できていない
        const tx = await contractInstance.generateRandomNumber();
        const winner = await contractInstance.winner.call();
        const result = await winner.toNumber()
        console.log("winner number : ",result)
        assert.isOk(tx);
    })

    it("can view result",async() => {
        const tx = await contractInstance.viewResult();
        // console.log("result:",tx)
        assert.isOk(tx);
    })

    it("making random number is limited only once",async() => {
        // const tx = await contractInstance.generateRandomNumber();
        let err = null

        try{
            // generate two time
            await contractInstance.generateRandomNumber();
            await contractInstance.generateRandomNumber();
        }catch(error){
            err = error
        }
        assert.ok(err instanceof Error)
    })

    it.skip("winner number check",async() => {
        const tx = await contractInstance.winner.call();
        // console.log("result:",tx)
        const result = await tx.toNumber();
        // console.log(result)
        assert.isOk(tx);
    })
})
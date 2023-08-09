 # 👋
# INTRODUCTION   
_________________________________________________________________________________________________________________________________________________________________________________________________________________
## This repositry contains three types of Nft
* simple-nft
* random-nft
* dynamic-nft

### simple-nft is created on simple ERC721 token standard by using mint and tokenURI function
-----------------------------------------------------------------------------------------------
[ERC721 Token_standard](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
------------------------------------
**we have used ipfs protocol to keep things decentralized**
## png of simple-nft

![Alt Text](https://ipfs.io/ipfs/QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8?filename=pug.png)

--------------------------------------------------------------------------------
*random-nft is created based on randomness we have used  [vrf](https://github.com/smartcontractkit/chainlink/blob/develop/contracts/src/v0.8/vrf/VRFConsumerBaseV2.sol) for fulfilling
random words and then after we have choosen three nft based on rarety logic we have minted that nft which we have got from randomness logic and here pinata is also pinning our nft othervthan our local ipfs*
----------------------------------------------------------------------------------------------------------------------------------------
 
   ![Alt Text](https://ipfs.io/ipfs/QmSsYRx3LpDAb1GZQm7zZ1AuHZjfbPkD6J7s9r41xu1mf8?filename=pug.png)  ![Alt Text](https://github.com/helloiampratyush/NFT/blob/main/images/randomNft/st-bernard.png)
                                                       
   ![Alt Text](https://github.com/helloiampratyush/NFT/blob/main/images/randomNft/shiba-inu.png) 

 ------------------------------------------------------------------------------------------------------------------------------------------
## dynamic nft

Here we have stored nft on chain thats cost highest gas cost but if we use svg(scalling vector graphics) it can be minimized.
we have manipulated the logic with the hlp of chainlink aggregator that if ETH/USD price increases to some specific price then we will get other nft if 
price remains below to that spcefic price

  
  <img src="https://github.com/helloiampratyush/NFT/blob/main/images/dynamicNft/happy.svg " alt="Alt Text" width="300" height="300">      <img src="https://github.com/helloiampratyush/NFT/blob/main/images/dynamicNft/frown.svg" alt="Alt Text" width="300" height="300">


  ---------------------------------------------------------------------------------------------------
  frown if prices goes below to the specified price happy if price go above sheduled price

   ### we have used solidity code and hardhat frameWork

   you can clone this repositry by 

   ```bash
git clone https://github.com/helloiampratyush/NFT.git
```
             
 ## 🙏 Thank you for going throgh
   



   





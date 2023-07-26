const { network, ethers } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
module.exports = async ({ getNamedAccounts }) => {
  const { deployer } = await getNamedAccounts();
  //basicNft
  const getBasicNft = await ethers.getContract("BasicNft", deployer);
  const txScript = await getBasicNft.mintNft();
  await txScript.wait();
  console.log("waiting for response..........................");

  console.log(`nft minted at index 0 is ${await getBasicNft.tokenURI(0)}`);
  console.log("done basic nft");

  //dynamic nft
  console.log("going for dynamic nft ");
  const dynamicSvgNft = await ethers.getContract("DynamicSvgNft", deployer);
  const ethValue = ethers.utils.parseEther("5000");
  const transactionForDynamicNft = await dynamicSvgNft.mintNft(ethValue);
  await transactionForDynamicNft.wait();
  console.log(
    `token uri for dynamic  svg at tokenId 0 is ${await dynamicSvgNft.tokenURI(
      1
    )}`
  );
  //randomIpfsNft
  const getRandomIpfsNft = await ethers.getContract("RandomIpfsNft", deployer);
  //const mintFee = await getRandomIpfsNft.getMintFee();
  await new Promise(async (resolve, reject) => {
    setTimeout(resolve, 3000000);
    getRandomIpfsNft.once("NftMinted", async function () {
      resolve();
    });
    const mintFee = ethers.utils.parseEther("0.01");
    const randomIpfsNftTx = await getRandomIpfsNft.requestNft({
      value: mintFee,
    });
    const randomIpfsNftTxReceipt = await randomIpfsNftTx.wait();
    if (developmentChains.includes(network.name)) {
      const requestId =
        randomIpfsNftTxReceipt.events[1].args.requestId.toString();
      const vrfCoordinatorV2Mock = await ethers.getContract(
        "VRFCoordinatorV2Mock",
        deployer
      );
      await vrfCoordinatorV2Mock.fulfillRandomWords(
        requestId,
        getRandomIpfsNft.address
      );
    }
  });
  console.log("waited emough isn't it");
  console.log(
    `token uri after nft minting at tokenid 0 is ${await getRandomIpfsNft.tokenURI(
      0
    )}`
  );
  console.log("all done!!!!!!!!!!!!!!!!!!!!!!!!!");
};

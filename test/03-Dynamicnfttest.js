const { network, deployments, getNamedAccounts, ethers } = require("hardhat");
const { assert, expect } = require("chai");
const { developmentChains } = require("../helper-hardhat-config");

const lowSvgJsonLink =
  "data:application/json;base64,eyJuYW1lIjoiRHluYW1pYyBTVkcgTkZUIiwgImRlc2NyaXB0aW9uIjoiQW4gTkZUIHRoYXQgY2hhbmdlcyBiYXNlZCBvbiB0aGUgQ2hhaW5saW5rIEZlZWQiLCAiYXR0cmlidXRlcyI6IFt7InRyYWl0X3R5cGUiOiAiY29vbG5lc3MiLCAidmFsdWUiOiAxMDB9XSwgImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQRDk0Yld3Z2RtVnljMmx2YmowaU1TNHdJaUJ6ZEdGdVpHRnNiMjVsUFNKdWJ5SS9QZ284YzNabklIZHBaSFJvUFNJeE1ESTBjSGdpSUdobGFXZG9kRDBpTVRBeU5IQjRJaUIyYVdWM1FtOTRQU0l3SURBZ01UQXlOQ0F4TURJMElpQjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaVBnb2dJRHh3WVhSb0lHWnBiR3c5SWlNek16TWlJR1E5SWswMU1USWdOalJETWpZMExqWWdOalFnTmpRZ01qWTBMallnTmpRZ05URXljekl3TUM0MklEUTBPQ0EwTkRnZ05EUTRJRFEwT0MweU1EQXVOaUEwTkRndE5EUTRVemMxT1M0MElEWTBJRFV4TWlBMk5IcHRNQ0E0TWpCakxUSXdOUzQwSURBdE16Y3lMVEUyTmk0MkxUTTNNaTB6TnpKek1UWTJMall0TXpjeUlETTNNaTB6TnpJZ016Y3lJREUyTmk0MklETTNNaUF6TnpJdE1UWTJMallnTXpjeUxUTTNNaUF6TnpKNklpOCtDaUFnUEhCaGRHZ2dabWxzYkQwaUkwVTJSVFpGTmlJZ1pEMGlUVFV4TWlBeE5EQmpMVEl3TlM0MElEQXRNemN5SURFMk5pNDJMVE0zTWlBek56SnpNVFkyTGpZZ016Y3lJRE0zTWlBek56SWdNemN5TFRFMk5pNDJJRE0zTWkwek56SXRNVFkyTGpZdE16Y3lMVE0zTWkwek56SjZUVEk0T0NBME1qRmhORGd1TURFZ05EZ3VNREVnTUNBd0lERWdPVFlnTUNBME9DNHdNU0EwT0M0d01TQXdJREFnTVMwNU5pQXdlbTB6TnpZZ01qY3lhQzAwT0M0eFl5MDBMaklnTUMwM0xqZ3RNeTR5TFRndU1TMDNMalJETmpBMElEWXpOaTR4SURVMk1pNDFJRFU1TnlBMU1USWdOVGszY3kwNU1pNHhJRE01TGpFdE9UVXVPQ0E0T0M0Mll5MHVNeUEwTGpJdE15NDVJRGN1TkMwNExqRWdOeTQwU0RNMk1HRTRJRGdnTUNBd0lERXRPQzA0TGpSak5DNDBMVGcwTGpNZ056UXVOUzB4TlRFdU5pQXhOakF0TVRVeExqWnpNVFUxTGpZZ05qY3VNeUF4TmpBZ01UVXhMalpoT0NBNElEQWdNQ0F4TFRnZ09DNDBlbTB5TkMweU1qUmhORGd1TURFZ05EZ3VNREVnTUNBd0lERWdNQzA1TmlBME9DNHdNU0EwT0M0d01TQXdJREFnTVNBd0lEazJlaUl2UGdvZ0lEeHdZWFJvSUdacGJHdzlJaU16TXpNaUlHUTlJazB5T0RnZ05ESXhZVFE0SURRNElEQWdNU0F3SURrMklEQWdORGdnTkRnZ01DQXhJREF0T1RZZ01IcHRNakkwSURFeE1tTXRPRFV1TlNBd0xURTFOUzQySURZM0xqTXRNVFl3SURFMU1TNDJZVGdnT0NBd0lEQWdNQ0E0SURndU5HZzBPQzR4WXpRdU1pQXdJRGN1T0MwekxqSWdPQzR4TFRjdU5DQXpMamN0TkRrdU5TQTBOUzR6TFRnNExqWWdPVFV1T0MwNE9DNDJjemt5SURNNUxqRWdPVFV1T0NBNE9DNDJZeTR6SURRdU1pQXpMamtnTnk0MElEZ3VNU0EzTGpSSU5qWTBZVGdnT0NBd0lEQWdNQ0E0TFRndU5FTTJOamN1TmlBMk1EQXVNeUExT1RjdU5TQTFNek1nTlRFeUlEVXpNM3B0TVRJNExURXhNbUUwT0NBME9DQXdJREVnTUNBNU5pQXdJRFE0SURRNElEQWdNU0F3TFRrMklEQjZJaTgrQ2p3dmMzWm5QZ289In0=";
const highSvgJsonLink =
  "data:application/json;base64,eyJuYW1lIjoiRHluYW1pYyBTVkcgTkZUIiwgImRlc2NyaXB0aW9uIjoiQW4gTkZUIHRoYXQgY2hhbmdlcyBiYXNlZCBvbiB0aGUgQ2hhaW5saW5rIEZlZWQiLCAiYXR0cmlidXRlcyI6IFt7InRyYWl0X3R5cGUiOiAiY29vbG5lc3MiLCAidmFsdWUiOiAxMDB9XSwgImltYWdlIjoiZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCMmFXVjNRbTk0UFNJd0lEQWdNakF3SURJd01DSWdkMmxrZEdnOUlqUXdNQ0lnSUdobGFXZG9kRDBpTkRBd0lpQjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jaVBnb2dJRHhqYVhKamJHVWdZM2c5SWpFd01DSWdZM2s5SWpFd01DSWdabWxzYkQwaWVXVnNiRzkzSWlCeVBTSTNPQ0lnYzNSeWIydGxQU0ppYkdGamF5SWdjM1J5YjJ0bExYZHBaSFJvUFNJeklpOCtDaUFnUEdjZ1kyeGhjM005SW1WNVpYTWlQZ29nSUNBZ1BHTnBjbU5zWlNCamVEMGlOakVpSUdONVBTSTRNaUlnY2owaU1USWlMejRLSUNBZ0lEeGphWEpqYkdVZ1kzZzlJakV5TnlJZ1kzazlJamd5SWlCeVBTSXhNaUl2UGdvZ0lEd3ZaejRLSUNBOGNHRjBhQ0JrUFNKdE1UTTJMamd4SURFeE5pNDFNMk11TmprZ01qWXVNVGN0TmpRdU1URWdOREl0T0RFdU5USXRMamN6SWlCemRIbHNaVDBpWm1sc2JEcHViMjVsT3lCemRISnZhMlU2SUdKc1lXTnJPeUJ6ZEhKdmEyVXRkMmxrZEdnNklETTdJaTgrQ2p3dmMzWm5QZz09In0=";
const lowSvgImageLink =
  "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8c3ZnIHdpZHRoPSIxMDI0cHgiIGhlaWdodD0iMTAyNHB4IiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik01MTIgNjRDMjY0LjYgNjQgNjQgMjY0LjYgNjQgNTEyczIwMC42IDQ0OCA0NDggNDQ4IDQ0OC0yMDAuNiA0NDgtNDQ4Uzc1OS40IDY0IDUxMiA2NHptMCA4MjBjLTIwNS40IDAtMzcyLTE2Ni42LTM3Mi0zNzJzMTY2LjYtMzcyIDM3Mi0zNzIgMzcyIDE2Ni42IDM3MiAzNzItMTY2LjYgMzcyLTM3MiAzNzJ6Ii8+CiAgPHBhdGggZmlsbD0iI0U2RTZFNiIgZD0iTTUxMiAxNDBjLTIwNS40IDAtMzcyIDE2Ni42LTM3MiAzNzJzMTY2LjYgMzcyIDM3MiAzNzIgMzcyLTE2Ni42IDM3Mi0zNzItMTY2LjYtMzcyLTM3Mi0zNzJ6TTI4OCA0MjFhNDguMDEgNDguMDEgMCAwIDEgOTYgMCA0OC4wMSA0OC4wMSAwIDAgMS05NiAwem0zNzYgMjcyaC00OC4xYy00LjIgMC03LjgtMy4yLTguMS03LjRDNjA0IDYzNi4xIDU2Mi41IDU5NyA1MTIgNTk3cy05Mi4xIDM5LjEtOTUuOCA4OC42Yy0uMyA0LjItMy45IDcuNC04LjEgNy40SDM2MGE4IDggMCAwIDEtOC04LjRjNC40LTg0LjMgNzQuNS0xNTEuNiAxNjAtMTUxLjZzMTU1LjYgNjcuMyAxNjAgMTUxLjZhOCA4IDAgMCAxLTggOC40em0yNC0yMjRhNDguMDEgNDguMDEgMCAwIDEgMC05NiA0OC4wMSA0OC4wMSAwIDAgMSAwIDk2eiIvPgogIDxwYXRoIGZpbGw9IiMzMzMiIGQ9Ik0yODggNDIxYTQ4IDQ4IDAgMSAwIDk2IDAgNDggNDggMCAxIDAtOTYgMHptMjI0IDExMmMtODUuNSAwLTE1NS42IDY3LjMtMTYwIDE1MS42YTggOCAwIDAgMCA4IDguNGg0OC4xYzQuMiAwIDcuOC0zLjIgOC4xLTcuNCAzLjctNDkuNSA0NS4zLTg4LjYgOTUuOC04OC42czkyIDM5LjEgOTUuOCA4OC42Yy4zIDQuMiAzLjkgNy40IDguMSA3LjRINjY0YTggOCAwIDAgMCA4LTguNEM2NjcuNiA2MDAuMyA1OTcuNSA1MzMgNTEyIDUzM3ptMTI4LTExMmE0OCA0OCAwIDEgMCA5NiAwIDQ4IDQ4IDAgMSAwLTk2IDB6Ii8+Cjwvc3ZnPgo=";
const highSvgImageLink =
  "data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjAwIDIwMCIgd2lkdGg9IjQwMCIgIGhlaWdodD0iNDAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDxjaXJjbGUgY3g9IjEwMCIgY3k9IjEwMCIgZmlsbD0ieWVsbG93IiByPSI3OCIgc3Ryb2tlPSJibGFjayIgc3Ryb2tlLXdpZHRoPSIzIi8+CiAgPGcgY2xhc3M9ImV5ZXMiPgogICAgPGNpcmNsZSBjeD0iNjEiIGN5PSI4MiIgcj0iMTIiLz4KICAgIDxjaXJjbGUgY3g9IjEyNyIgY3k9IjgyIiByPSIxMiIvPgogIDwvZz4KICA8cGF0aCBkPSJtMTM2LjgxIDExNi41M2MuNjkgMjYuMTctNjQuMTEgNDItODEuNTItLjczIiBzdHlsZT0iZmlsbDpub25lOyBzdHJva2U6IGJsYWNrOyBzdHJva2Utd2lkdGg6IDM7Ii8+Cjwvc3ZnPg==";
!developmentChains.includes(network.name)
  ? describe.skip
  : describe("dynamicNft", function () {
      let deployer, testContract, subtestContract;
      beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
        testContract = await ethers.getContract("DynamicSvgNft", deployer);
        subtestContract = await ethers.getContract(
          "MockV3Aggregator",
          deployer
        );
      });
      describe("constructor", function () {
        it("it will verify constructor elements", async function () {
          const act1 = await testContract.name();
          const act2 = await testContract.symbol();
          const act3 = await testContract.getPriceFeed();
          const act4 = await testContract.getLowSVG();
          const act5 = await testContract.getHighSVG();
          //console.log(act4);
          const res1 = subtestContract.address;
          assert.equal(act1.toString(), "Dynamic SVG NFT");
          assert.equal(act2.toString(), "DSN");
          assert.equal(act3.toString(), res1.toString());
          assert.equal(act4.includes("data:image/svg+xml;base64"), true);
          assert.equal(act5.includes("data:image/svg+xml;base64"), true);
          expect(act4.length > 40 && act5.length > 40);
        });
      });
      describe("mintNft", function () {
        const ethValue = ethers.utils.parseEther("1860");
        it("it will mint nft and emit event and will give us tokenId", async function () {
          const transactionResponse = await testContract.mintNft(ethValue);
          0xb368ea2fd887eccdf0f746e6e39e9b742f8ae89f;
          expect(transactionResponse).to.emit(
            testContract.address,
            "CreatedNFT"
          );
        });
        it("it will update token counter or token id ", async function () {
          const responseBymintNft = await testContract.mintNft(ethValue);
          const res1 = await testContract.getTokenCounter();

          assert.equal(res1.toString(), "1");
        });
        it("it will confirm tokenid and it`s owner", async function () {
          const resonse = await testContract.mintNft(ethValue);
          const res1 = await testContract.getTokenCounter();
          const owner = await testContract.ownerOf(res1.toString());
          const newBalance = await testContract.balanceOf(owner);
          assert.equal(owner, deployer);
          assert.equal(newBalance.toString(), "1");
        });
      });
      describe("tokenURI", function () {
        it("it will reverted if we provide wrong token id", async function () {
          const ethValue = ethers.utils.parseEther("1000");
          const minting = await testContract.mintNft(ethValue);
          await expect(testContract.tokenURI(78)).to.be.revertedWith(
            "ERC721Metadata__URI_QueryFor_NonExistentToken"
          );
        });
        it("it will response lowsvg if we set highValue greater than price", async function () {
          const ethValue = ethers.utils.parseEther("2800");
          const minting = await testContract.mintNft(ethValue);
          const tokenId = await testContract.getTokenCounter();
          const getLowSvgLink = await testContract.tokenURI(tokenId);

          assert.equal(getLowSvgLink.toString(), lowSvgJsonLink);
        });
        it("it will response highsvg if we set highValue lower than price", async function () {
          const ethValue = ethers.utils.parseEther("100");
          const minting = await testContract.mintNft(ethValue);
          const tokenId = await testContract.getTokenCounter();
          const gethighSvgLink = await testContract.tokenURI(tokenId);
          assert.equal(gethighSvgLink.toString(), highSvgJsonLink);
        });
        it("it will create continuous token id", async function () {
          const lowEthValue = ethers.utils.parseEther("100");
          const highEthValue = ethers.utils.parseEther("2800");
          const response1 = await testContract.mintNft(lowEthValue);
          const response2 = await testContract.mintNft(highEthValue);
          const gethighSvgLink = await testContract.tokenURI(1);
          const getLowSvgLink = await testContract.tokenURI(2);
          assert.equal(gethighSvgLink.toString(), highSvgJsonLink);
          assert.equal(getLowSvgLink.toString(), lowSvgJsonLink);
        });
      });
    });

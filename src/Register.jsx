import { useState, useRef } from "react";
import { ethers, BigNumber } from "ethers";
import { Flex, Box, Text, Input, Button, Textarea } from '@chakra-ui/react';
import ABI from "./ABI.json";
import { keccak256 } from "ethers/lib/utils";



const NftAddress = "0x77C469eC60fCCdbBDe9FC6Fd05B6E3D70ee8D245";


const Register = ({ accounts, setAccounts }) => {
    const [address, setAddress] = useState(0);
    const [hex, setHex] = useState(0);
    const isConnected = Boolean(accounts[0]);
    const phoneref = useRef(null);
    const bytescoderef = useRef(null);
    const numberref = useRef(null);
    var contract;




    async function clickregister() {


        const factorycontractaddr = phoneref.current.value;
        const bytecode = bytescoderef.current.value;
        
        // console.log(aaa);
        // const bytecodehash = ethers.utils.solidityKeccak256(["string"],[bytescoderef.current.value]);
        // console.log("bytecodehash is : ", bytecodehash);
        // const str = ethers.utils.solidityPack([ "string", "string","uint256","bytes32" ], [ "0xff",addr,phoneref.current.value,bytecodehash]);
        // console.log("str is : ",str);
        // const hash = ethers.utils.solidityKeccak256(["uint256"],[phoneref.current.value]);
        // console.log("hash is : ",hash);

        //const contractaddr = "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3";
        const contractaddr = factorycontractaddr;

        const initcode = bytecode;
        const initcodehash = keccak256(initcode);
        console.log("initcode is : ", initcodehash);



        const salt = "0x7c5ea36004851c764c44143b1dcb59679b11c9a68e5f41497f6cf3d480715331";
        const saltbig = ethers.BigNumber.from(salt);
        console.log("salt is : ", saltbig);



        for (var i = 0;i < 100000000;i++) {

            const saltbigadd = saltbig.add(i);

            const hex = ethers.utils.hexValue(saltbigadd);
        
            const getcreat2addr = ethers.utils.getCreate2Address(contractaddr, hex, initcodehash);

            const substr = getcreat2addr.substring(37, 42);
        

            if (substr == numberref.current.value) {

                console.log("Salt : ", hex);
                setHex(hex);
                console.log("getcreat2addr : ", getcreat2addr);
                setAddress(getcreat2addr);
                break;
            }



        }



        //const hash = keccak256(abi.encodePacked(bytes1(0xff),address(this),_salt,keccak256(bytecode)));



        //console.log(hash);

        // if (window.ethereum) {
        //     const provider = new ethers.providers.Web3Provider(window.ethereum);
        //     const signer = provider.getSigner();
        //     contract = new ethers.Contract(ABI.ADDR, ABI.ABI, signer);






        // }
        // try {


        //     const instance = await genAPI(window.ethereum)
        //     const arseedUrl = '<https://arseed.web3infra.dev>'

        //     const data = Buffer.from('/icon/twitter_32x32.png')
        //     const payCurrency = 'bnb' // everpay supported all tokens
        //     const ops = {
        //         tags: [{ name: "wAtwitter240.png", value: 'image/png' }]
        //     }
        //     const res = await instance.sendAndPay(arseedUrl, data, payCurrency, ops)
        //     console.log('res', res)

        // }
        // catch (err) {
        //     console.log('err is :', err);
        // }

        // if (window.ethereum) {
        //     const provider = new ethers.providers.Web3Provider(window.ethereum);
        //     const signer = provider.getSigner();
        //     contract = new ethers.Contract(ABI.ADDR, ABI.ABI, signer);



        // }
        // try {
        //     const response = await contract.register(accounts[0], phoneref.current.value);
        //     console.log('msg send ok !', phoneref.current.value);
        //     console.log('response :', response);
        // } catch (err) {
        //     console.log('err is :', err);
        // }
    }





    return (
        <Flex justify="center" align="center" hight="100vh" paddingBottom="150px">
            <Box width="800px" >

                <Text fontSize="48px" textShadow="0 5px #000000" >Addr Calculator</Text>
                <Text fontSize="30px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px #000000">Generator Contract Address. </Text>
                {isConnected ? (
                    <div>
                           <Flex justify='space-between' align="center">
                           <Text
                                marginTop="30px"
                                textAlign="center"
                                padding="15px"
                                marginRight="5px"
                            >Contract Addr</Text>

                            <Input
                                fontFamily="inherit"
                                width="500px"
                                height="40px"
                                marginTop="30px"
                                padding="15px"

                                type="tel"
                                ref={phoneref}

                                placeholder="Factory Contract Addr"
                                _placeholder={{ color: 'inherit' }}
                            />


                        </Flex>

                        <Flex justify='space-between' align="center">
                            <Text
                                marginTop="10px"
                                textAlign="center"
                                padding="15px"
                                marginRight="5px"
                            > ByteCode </Text>

                            <Input

                                fontFamily="inherit"
                                width="500px"
                                height="40px"
                                marginTop="10px"
                                padding="15px"
                                marginLeft="30px"
                                type="tel"
                                //value={accounts}
                                ref={bytescoderef}
                                placeholder="Bytecode"
                                _placeholder={{ color: 'inherit' }}
                            />

                        </Flex>

                        <Flex justify='space-between' align="center">
                            <Text
                                marginTop="10px"
                                textAlign="center"
                                padding="15px"
                                marginRight="5px"
                            > Last 5 Number </Text>

                            <Input

                                fontFamily="inherit"
                                width="500px"
                                height="40px"
                                marginTop="10px"
                                padding="15px"
                                marginLeft="30px"
                                type="tel"
                                //value={accounts}
                                ref={numberref}
                                placeholder="Number"
                                _placeholder={{ color: 'inherit' }}
                            />

                        </Flex>

                         <Flex justify='space-between' align="center">
                            <Text
                                marginTop="10px"
                                textAlign="center"
                                padding="15px"
                                marginRight="5px"
                            > Salt </Text>

                            <Input
                                readOnly
                                fontFamily="inherit"
                                width="500px"
                                height="40px"
                                marginTop="10px"
                                padding="15px"
                                marginLeft="30px"
                                type="tel"
                                value={hex}
                               
                                placeholder=""
                                _placeholder={{ color: 'inherit' }}
                            />

                        </Flex>
                        
                        <Flex justify='space-between' align="center">
                            <Text
                                marginTop="10px"
                                textAlign="center"
                                padding="15px"
                                marginRight="5px"
                            > Address</Text>

                            <Input
                                readOnly
                                fontFamily="inherit"
                                width="500px"
                                height="40px"
                                marginTop="10px"
                                padding="15px"
                                marginLeft="30px"
                                type="tel"
                                value={address}
                               
                                placeholder=""
                                _placeholder={{ color: 'inherit' }}
                            />

                        </Flex>




                        <Flex align="center" justify="center">

                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="30px" onClick={clickregister}>Calculate</Button>
                        </Flex>
                    </div>


                ) : (
                    <p>You must be connect to calculate.</p>
                )}
            </Box>


        </Flex>

    )
};

export default Register;
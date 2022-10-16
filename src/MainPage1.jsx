import { useState ,useRef } from "react";
import { ethers, BigNumber } from "ethers";
import { Flex, Box, Text, Input, Button, Textarea } from '@chakra-ui/react';
import ABI from "./ABI.json"


const MainPage = ({ accounts, setAccounts }) => {
    const [telephone, setTelephone] = useState(0);
    const isConnected = Boolean(accounts[0]);
    const addref = useRef(null);
    const msgref = useRef(null);
    var contract;

    async function sendmessage() {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            contract = new ethers.Contract(ABI.ADDR, ABI.ABI, signer);
        }
        try {
            const response = await contract.getphone(accounts[0]);
            console.log('response :', response);   
            //得到返回值


        } catch (err) {
            console.log('err is :', err);
        }
    }

   

    

    return (
        <Flex justify="center" align="center" hight="100vh" paddingBottom="150px">
            <Box width="800px" >

                <Text fontSize="48px" textShadow="0 5px #000000" >Addr Calculator</Text>
                <Text marginTop="10px" fontSize="30px" letterSpacing="-5.5%" fontFamily="VT323" textShadow="0 2px #000000">Can't find the person? Try Crypto Messenger </Text>
                {isConnected ? (
                    <div>
                        <Flex align="center" justify="center">
                            <Text
                                marginTop="10px"
                                textAlign="center"
                                padding="15px"
                              
                            >ETH Address</Text>

                            <Input
                                fontFamily="inherit"
                                width="250px"
                                height="40px"
                                marginTop="10px"
                                padding="15px"
                             
                                type="tel"
                                ref={addref}
                                placeholder="Address"
                                _placeholder={{ color: 'inherit' }}
                            />


                        </Flex>


                        <Textarea
                            width="450px"
                            height="200px"
                            marginTop="10px"
                            padding="15px"
                            ref={msgref}
                            placeholder="Message..."
                            _placeholder={{ color: 'inherit' }} />


                        <Flex align="center" justify="center">

                            <Button
                                backgroundColor="#D6517D"
                                borderRadius="5px"
                                boxShadow="0px 2px 2px 1px #0F0F0F"
                                color="white"
                                cursor="pointer"
                                fontFamily="inherit"
                                padding="15px"
                                marginTop="30px" onClick={sendmessage}>Send</Button>
                        </Flex>
                    </div>


                ) : (
                    <p>You must be connect to send message.</p>
                )}
            </Box>


        </Flex>

    )
};

export default MainPage;
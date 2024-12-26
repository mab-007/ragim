import {
    Box,
    Button,
    Container,
    Flex,
    Image,
    Input,
    Text,
    Tooltip,
  } from "@chakra-ui/react";
  import React from "react";
  import { AiOutlineSearch } from "react-icons/ai";
  import { useNavigate } from "react-router-dom";
  
  const cardData = [
    {
      logo: "https://res.cloudinary.com/dn0hjcpmq/image/upload/v1726303356/qgfreqpzkqhygmpilmey.webp",
      service: "Car Wash",
    },
    {
      logo: "https://res.cloudinary.com/dn0hjcpmq/image/upload/v1726303355/ynfnm0vshcop8xsve4ke.jpg",
      service: "Bike Wash",
    },
  ];
  
  const HomePageNav = () => {
    const navigate = useNavigate();
  
    const handleClick = (index) => {
      navigate(`/:city/${index}/serivces`);
    };
  
    return (
      <Box
        boxShadow="rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px"
        h="70px"
        display={"flex"}
        justifyContent="space-around"
        position={"sticky"}
        top={0}
        bg="white"
        zIndex={1}
        transition="0.5s all ease-in"
        opacity={1}
      >
        <Container
          maxW="4xl"
          ml="10%"
          p="10px"
          display="flex"
          justifyContent={"space-between"}
        >
          <Button
            borderRadius={"5px 0 0 5px"}
            bg="white"
            h="100%"
            border=" 1px solid #ececec"
            borderRight="none"
            colorScheme={"white"}
            color="black"
          >
            <AiOutlineSearch fontSize={"25px"} />
          </Button>
          <Input
            placeholder="Search for services"
            w="100%"
            h="100%"
            borderLeft="none"
            focusBorderColor="none"
          />
        </Container>
        <Flex mr="10%">
          {cardData.map((item, index) => (
            <Tooltip hasArrow label={item.service} fontSize="10px">
              <Button
                bg="white"
                borderRadius={"none"}
                display="flex"
                flexDirection={"column"}
                justifyContent="space-around"
                alignItems={"center"}
                h="100%"
                w="100px"
                onClick={() => handleClick(index)}
              >
                <Image src={item.logo} alt={item.service} h="30px" />
                <Text fontSize={"10px"}>{item.desc}</Text>
              </Button>
            </Tooltip>
          ))}
        </Flex>
      </Box>
    );
  };
  
  export default HomePageNav;
  
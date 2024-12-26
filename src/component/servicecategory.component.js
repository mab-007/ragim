import { Button, Container, Image, Text } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router-dom";

const ServicesCategory = ({ data }) => {
  const navigate = useNavigate();
  const handleClick = (item) => {
    navigate(`/product_booking/${item.title}`);
  };
  return (
    <Container
      border="1px solid white"
      borderRadius={"5px"}
      boxShadow="rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"
      maxW="4xl"
      h="150px"
      mt="-5%"
      bg="white"
      display="flex"
      zIndex={-1}
    >
      {data.map((item,index) => (
        <Button
          h="80%"
          m="auto"
          bg="white"
          display="flex"
          flexDirection={"column"}
          justifyContent="space-around"
          fontSize={"15px"}
          key={item.service}
          onClick={() => handleClick(item)}
        >
          <Image 
            src={item.logo} 
            name={item.service} 
            borderRadius 
            w="100%" 
            h="80%" 
            objectFit="contain"
          />
          <Text>{item.service}</Text>
        </Button>
      ))}
    </Container>
  );
};

export default ServicesCategory;

import React from "react";
import Carousel from "better-react-carousel";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import styles from "../style/Home.module.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../reducers";



const HomePageCarousel = ({ data , hideArrow, isMobile}) => {
  const navigate=useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);


  const handleClick=(item)=>{
    if(!isLoggedIn)
      navigate(`/login`)
    else if(item?.services === 'Bike Wash')
      navigate(`/product_booking/bike`)
    else if(item?.services === 'Car Wash')
      navigate(`/product_booking/car`)
    else if(item?.services === 'Daily Pass')
      navigate(`/product_booking/passes`)
    else
      navigate(`/commingsoon`)
  }
  return (
    <Box
      w="80%" 
      m={{ base: '2% auto', md: '2% auto' }} 
      h={{ base: '100%', md: '100%' }}
      display={{ base: 'flex', md: 'block' }}
      justifyContent='space-between'
      alignItems='center'
    >
      <Carousel cols={3} rows={1} gap={0} hideArrow={hideArrow} loop={false}>
        {data.map((item, index) => (
          <Carousel.Item key={index} cols={1} >
            <Flex className={styles.zoom} backgroundColor='gray.300' borderRadius='3xl' padding='2' boxShadow='md'>
              <Image src={item.logo} borderRadius={"10px"} mt='2%' onClick={()=>handleClick(item)}  />
              <br />
              <Text fontWeight={"500"} fontSize={{base:'sm', md: 'md', lg: 'xl', xl:'xl'}}>{item.services}</Text>
                <Box mr={{base: '2', md: '4', lg: '8', xl: '8'}} marginLeft={{base: '2', md: '4', lg: '8', xl: '8'}}>  
                    <Text marginBottom='1' mt={{base: '2', md: '3', lg: '6', xl: '6'}} fontWeight='normal'  fontSize={{base:'sm', md: 'md', lg: 'xl', xl:'xl'}}>{item.text1}</Text>
                    <Text marginBottom={{base: '1', md: '2', lg: '4', xl: '4'}}  marginTop='-1' fontWeight='normal'  fontSize={{base:'sm', md: 'md', lg: 'xl', xl:'xl'}}>{item.text2}</Text>
                    <Text marginBottom='1' fontWeight='normal'  fontSize={{base:'sm', md: 'md', lg: 'xl', xl:'xl'}}>{item.text3}</Text>                    
                    <Text marginBottom={{base: '1', md: '2', lg: '4', xl: '4'}} marginTop='-1' fontWeight='normal'  fontSize={{base:'sm', md: 'md', lg: 'xl', xl:'xl'}}>{item.text4}</Text>
                    <Text fontWeight='normal'  fontSize={{base:'sm', md: 'md', lg: '3xl', xl:'3xl'}}>{item.price}</Text>
                    <Text fontWeight='normal' marginTop='-2' fontSize={{base:'sm', md: 'md', lg: 'xl', xl:'xl'}}>{item.text5}</Text>
                </Box>
            </Flex>
          </Carousel.Item>
        ))}
      </Carousel>
    </Box>
  );
};

export default HomePageCarousel;

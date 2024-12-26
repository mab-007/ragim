import {
    Box,
    Text,
    Heading,
    useBreakpointValue,
  } from '@chakra-ui/react';
  import React from 'react';
import HomePageCarousel from './homepage.carousel.component';
  
const bikeWashPng = 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1726303357/wzbhjt24kpftscuowit3.jpg';
const carWash = 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1727982353/carWash_uh4cxh.jpg';
const dailyPass = 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1727982396/daily_pass_bw0qec.jpg';
//service listing array

const UXluxury = [
  {
    logo: bikeWashPng,
    services: "Bike Wash",
    text1: "Exterior cleaning -",
    text2: "6 days in a week",
    text3: "Interior cleaning -",
    text4: "once a week",
    price: "₹299/-",
    text5: "per month",
  },
  {
    logo: carWash,
    services: "Car Wash",
    text1: "Exterior cleaning -",
    text2: "6 days in a week",
    text3: "Interior cleaning -",
    text4: "once a week",
    price: "₹599/-",
    text5: "per month",
  },
  {
    logo: dailyPass,
    services: "Daily Pass",
    text1: "Interior and exterior",
    text2: "car & bike cleaning",
    text3: "Single day pass",
    text4: "exclusive for",
    price: "₹100/-",
    text5: "per day",
  }
];

const Body_three = () => {

    
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });

    return (
      <Box
        bg="brand.100"
        py={4}
        px={6}
        borderRadius="md"
        height='100%'
        width='100%'
        boxShadow='md'
        id='bodyThree'
      >
        
      <Heading 
        fontSize={{base: 'sm', md: 'md', lg: '32', xl: '32'}} 
        fontWeight="bold" 
        mt={4}
      >
        WHEELZ365 OFFERINGS
      </Heading>
        <Text fontSize={{base: 'sm', md: 'md', lg: '20', xl: '20'}} >
            Top Professionals | Premium Service
        </Text>
        <HomePageCarousel data={UXluxury} hideArrow={isMobile ? false: true}   isMobile={isMobile} />
      </Box>
    );
  }

export default Body_three;
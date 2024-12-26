import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '../reducers';
import activityService from '../service/activity.service';


const FlippableCard = (data) => {
  const navigate = useNavigate();
  const [flipped, setFlipped] = useState(false);
  const bg = useColorModeValue('gray.100', 'gray.700');
  const color = useColorModeValue('gray.700', 'gray.100');
  const userProfile = useSelector(selectUserProfile);

  const handleFlip = () => {
    setFlipped(!flipped);
  };


  let createActivity = async (item) => {
        try {
          console.log();
            const obj = {
                user_id : userProfile.user_id,
                plan_id: item.id,
                date_of_purchase: new Date(),
                plan_start_date: new Date(),
                plan_type: item?.frequency,
                address_id: 'orderAddressId'
            }
            console.log(obj);
            const result = await activityService.createActivity(obj);
            if(!result)
                throw new Error(`Error in creating order`);
        }catch(e) {
            console.error(`Some thing went wrong !\n` + e);
            alert(`Some thing went wrong !`);
            throw new Error(`Some thing went wrong !`);
        }
    }

  const hadleOnClick = (item) => {
    console.log(item);
    createActivity(item);
    navigate('/checkout', {state: {price: data?.data?.offerPrice || 0}})
  }

  useEffect(() => {
    console.log(data.data.id);
  })

  return (
    <Box
      w={{base:"100px", md: '200px', lg: '300px', xl: '300px'}}
      h={{base:"100px", md: '200px', lg: '300px', xl: '300px'}}
      bg={bg}
      color={color}
      borderRadius="lg"
      overflow="hidden"
      cursor="pointer"
      onClick={handleFlip}
      transition="transform 0.5s"
      transform={flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
      transformStyle="preserve-3d"
    >
      <Box
        w="100%"
        h="100%"
        position="absolute"
        visibility={flipped ? 'hidden' : 'visible'}
      >
        <Flex
          direction="column"
          justify="center"
          align="center"
          h="100%"
        >
          <Heading size="md" fontSize={{base: '2xs', md: 'md', lg: 'xl', xl: 'xl'}}>{data?.data?.title}</Heading>
          <Text
            position="relative"
            _after={{
              content: '""',
              position: "absolute",
              top: "50%",
              left: "0%",
              width: "100%",
              height: "2px",
              backgroundColor: "black",
              transform: "rotate(-10deg)",
            }}
            fontSize={{base: '2xs', md: 'md', lg: 'xl', xl: 'xl'}}
            fontWeight={'bold'}
          >
            ₹ {data?.data?.price} /- only
          </Text>
          <Text
            fontWeight={'bold'} fontSize={{base: '2xs', md: 'md', lg: 'xl', xl: 'xl'}}>₹ {data?.data?.offerPrice} /- only</Text>
        </Flex>
      </Box>
      <Box
        w="100%"
        h="100%"
        position="absolute"
        top="0"
        left="0"
        transform={flipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}
        visibility={flipped ? 'visible' : 'hidden'}
        zIndex={flipped ? 1 : -1}
      >
          <Flex
            direction="column"
            justify="center"
            align="center"
            h="100%"
          >
            <Heading size="md" fontWeight={'semibold'} fontSize={{base: '2xs', md: 'md', lg: 'xl', xl: 'xl'}}>{data?.data?.description}</Heading>
            <Text fontWeight={'bold'} fontSize={{base: '2xs', md: 'md', lg: 'xl', xl: 'xl'}}>Book Now</Text>

            <Box
              boxSize={{base: 7, md: 6, lg: 8, xl: 10}}
              borderRadius={'full'}
              backgroundColor={'black'}
              border={'2px solid black'}
              padding={0}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              pb={4}
              pt={-1}
              onClick={(e) => {
                e.stopPropagation();
                hadleOnClick(data?.data);
              }}
              fontSize={{base: '2xs', md: 'md', lg: 'xl', xl: 'xl'}}
            >
              <FaArrowRight color={'white'}/>
            </Box>          
            </Flex>
      </Box>
    </Box>
  );
};

export default FlippableCard;
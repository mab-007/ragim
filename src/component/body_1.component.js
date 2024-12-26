import {
    Box,
    Image,
    Text,
    VStack,
  } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/body_1.css';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../reducers';
import wheelzBannerImg from "../assets/banner_wyaml7.png";

  

const wheelzBanner=  wheelzBannerImg || 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1728413211/banner_wyaml7.png';

  const Body_1 = () => {
    const isLoggedIn = useSelector(selectIsLoggedIn);
    const [city, setCity] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (value) => {
      setCity(value);
      localStorage.setItem('location', value);
      navigate(`/${value}`);
    };
  
    return (
      <div>
        <Box  pos={'relative'}>
            
          <Image
            className='hero'
            w={{ base: '100%', md: '80%', lg: '76%' }}
            h={{ base: '50%', md: '60%', lg: '70%' }}
            objectFit="contain"
            src={wheelzBanner}
          />

  
          <Box
            width={{base: '100%', md: '100%', lg: '100%', xl: '100%'}}
            height={'100%'}
            className="text"
            fontWeight={'bold'}
            pos={'absolute'}
            right={'0.2'}
            top={'0.2'}
          >
            <Box
              width={'44%'}
              marginLeft={'55%'}
              h={{base: '60%', lg: '70%', xl: '70%'}}
            >
              <VStack gap={{base:0, md: 2, lg: 5, xl: 5}} margin={{base: '2%', md: '5%', lg:'5%', xl: '5%'}}>
              <Text fontFamily={'sans-serif'} color={'white'} maxWidth={{ base: '20rem', md: '25rem', lg: '50rem' }} fontSize={{ base: 'xl', md: '2xl', lg: '90px' }} >WHEELZ365</Text>
              <Text fontSize={{ base: 'sm', md: '2xl', lg: '3xl', xl:'3xl'}} textColor={'gray.400'} mb='1' >Quality cars services, on demand</Text>
                {/* <Text w={{ base: 'container.3xs', md: 'container.3xs', lg: 'container.2xs', xl: 'container.2xs' }}  textAlign={'left'} fontSize={{ base: 'sm', md: 'md', lg: '2xl', xl:'2xl'}}>
                  Our elite Cleaning ninjas - Dedicated to bringing cleanliness right to your doorstep.
                </Text> 
                <br />*/}
                <br /><br /><br />

                <Text fontSize={{ base: 'xs', md: 'sm', lg:'2xl', xl:'2xl'}} textColor={'white'}>Book your first month subscription now.</Text>
                <Box backgroundColor={'white'} p={{base:'0.5', lg:'1', xl:'1'}} width={{base: '80%', lg: 'auto', xl: '40%'}} alignItems={'center'} borderRadius={'50'}>
                <Box
                  bg={'whiteAlpha.900'}
                  borderRadius={'50'}
                  border={'4px'}
                  padding={{base: '0', md: '3', lg: '3', xl: '4'}}
                  color={'blackAlpha.900'}
                  backgroundColor={'white'}
                  width={{base: '100%', lg: 'auto', xl: 'auto'}}
                  flexDirection={'row'}
                  onClick={() => isLoggedIn ?  navigate(`/home/services`) : navigate('/login')}
                  alignItems={'cetner'}
                
                >
                  <Text textColor={'black'} fontSize={{base: 'xs', md: 'md', lg:'xl', xl: 'xl'}} textAlign={'center'}>Book now</Text>
                </Box>
                
                </Box>

                {/* <Box
                  bg={'whiteAlpha.900'}
                  borderRadius={'8'}
                  padding={{base: '1', md: '3', lg: '5', xl: '5'}}
                  color={'blackAlpha.900'}
                >
                  <Text fontSize={{ base: 'xs', md: 'sm', lg:'2xl', xl:'2xl'}}>City of service?</Text>
                  <Select
                    cursor={'pointer'}
                    placeholder={'Select City'}
                    value={city}
                    width={{ base: 'container.3xs', md: 'container.3xs', lg: '20em', xl: '20em' }}
                    onChange={(e) => handleChange(e.target.value)}
                    fontSize={{base: 'xs', md: 'xs', lg:'xl', xl:'xl'}}
                  >
                    {Cities.map((item, index) =>
                      item.city ? (
                        <option
                          key={index}
                          style={{ cursor: 'pointer' }}
                          value={item.city}
                        >
                          {item.city}
                        </option>
                      ) : (
                        <option key={index} disabled value={item.country}>
                          {item.country}
                        </option>
                      )
                    )}
                  </Select>
                </Box> */}
              </VStack>
            </Box>
          </Box>
        </Box>
      </div>
    );
  };
  
  export default Body_1;
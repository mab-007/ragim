import {
    Box,
    Text,
    Flex,
    Icon,
  } from '@chakra-ui/react';
  import React from 'react';
  import {
    IoReceipt,
    IoPersonCircle,
  } from 'react-icons/io5';
  import { MdSafetyCheck } from 'react-icons/md';
  import { FaTools } from 'react-icons/fa';
  
  
  const Body_2 = () => {
    return (
      <Box
        bg="brand.100"
        py={{base: 2, md:3, lg: 4, xl: 4}}
        px={{base: 4, md:4, lg: 6, xl: 6}}
        borderRadius="md"
        boxShadow="md"
        id='body_two'
      >
        <Flex
          flexDirection="row"
          h="100%"
          w="100%"
        >
          <Flex
            flexDirection="column"
            justifyContent="space-between"
            p={{ base: 2, md: 3, lg: 4, xl: 4}}
            h="100%"
            w="50%"
            ml={{base: 10, md: 20, lg: 40, xl: 40}}
          >
            <Flex mb={{base:2, md:3, lg:4, xl:4}}>
              <Text fontWeight="bold" 
                fontSize={{ base: '2xl', md: '3xl', lg: '4xl', xl: '5xl' }}
              >
                Why Wheelz 365?
              </Text>
            </Flex>
            <Flex
              flexDirection="row"
              alignItems="center"
              mr={{ base: 2, md: 3, lg: 4, xl: 5 }}
              mb={{ base: 2, md: 3, lg: 4, xl: 5 }}
            >
              <Icon
                as={IoReceipt}
                w={{ base: 12, md: 16, lg: 20, xl: 20 }}
                h={{ base: 12, md: 16, lg: 20, xl: 20 }}
                mr={{ base: 4, md: 6, lg: 8, xl: 10 }}
                mb={{ base: 2, md: 3, lg: 4, xl: 5 }}
                color="black.400"
                fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}}
              />
              <Flex flexDirection='column' alignItems="flex-start">
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }} fontWeight="bold">Transparent pricing</Text>
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'md', xl: 'lg' }}>See fixed prices before you book. No hidden charges</Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection="row"
              alignItems="center"
              mr={{ base: 2, md: 3, lg: 4, xl: 5 }}
              mb={{ base: 2, md: 3, lg: 4, xl: 5 }}
            >
              <Icon
                as={IoPersonCircle}
                w={{ base: 12, md: 16, lg: 20, xl: 20 }}
                h={{ base: 12, md: 16, lg: 20, xl: 20 }}
                mr={{ base: 4, md: 6, lg: 8, xl: 10 }}
                mb={{ base: 2, md: 3, lg: 4, xl: 5 }}
                color="black.400"
                fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}}
              />
              <Flex flexDirection='column' alignItems="flex-start">
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }} fontWeight="bold">Experts only</Text>                
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'md', xl: 'lg' }}>Our professionals are well trained and have on-job expertise</Text>
              </Flex>
            </Flex>
            <Flex
              flexDirection="row"
              alignItems="center"
            >
              <Icon
                as={FaTools}
                w={{ base: 12, md: 16, lg: 20, xl: 20 }}
                h={{ base: 12, md: 16, lg: 20, xl: 20 }}
                mr={{ base: 4, md: 6, lg: 8, xl: 10 }}
                mb={{ base: 2, md: 3, lg: 4, xl: 5 }}
                color="black.400"
                fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}}
              />
              <Flex flexDirection='column' alignItems="flex-start">
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'lg', xl: 'xl' }} fontWeight="bold">Fully equipped</Text>
                <Text fontSize={{ base: 'sm', md:'md', lg:"md", xl: "md"}}>We bring everything needed to get the job done well</Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="left"
            h="100%"
            w="30%"
            bg='gray.50'
            p={{ base: 2, md: 3, lg: 4, xl: 4}}
            m={{ base: 6,  md: 7, lg: 10, xl: 10}}
            mt={{ base: 7, md: 15, lg: 20, xl: 20}}
          >
            <Icon
              as={MdSafetyCheck}
              w={{ base: 12, md: 16, lg: 40, xl: 40 }}
              h={{ base: 12, md: 16, lg: 40, xl: 40 }}
              mr={{ base: 4, md: 6, lg: 8, xl: 10 }}
              mb={{ base: 2, md: 3, lg: 4, xl: 5 }}
              color="black.400"
              fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}}
            />
            <Text fontWeight="bold" fontSize={{ base: 'xl', md: '2xl', lg: '3xl', xl: '4xl'}} textAlign='left'>100% Quality Assured</Text>
            <Text textAlign='left' fontSize={{ base: 'sm', md: 'md', xl:'xl', lg:'xl', }}>If you don't love our service. we will make it right.</Text>
          </Flex>
        </Flex>
      </Box>
    );
  };
  
  export default Body_2;
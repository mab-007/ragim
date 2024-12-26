import React from 'react';
import {
  Box,
  Container,
  Stack,
  SimpleGrid,
  Text,
  Link,
  VisuallyHidden,
  chakra,
  useColorModeValue,
  useBreakpointValue,
} from '@chakra-ui/react';
import { FaTwitter, FaInstagram } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={500} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

const SocialButton = ({ children, label, href }) => {



  return (
    <chakra.button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded={'full'}
      w={{ base: 4, md: 6, lg: 8, xl: 8}}
      h={{ base: 4, md: 6, lg: 8, xl: 8}}
      cursor={'pointer'}
      as={'a'}
      href={href}
      display={'inline-flex'}
      alignItems={'center'}
      justifyContent={'center'}
      transition={'background 0.3s ease'}
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

function FooterComponent() {
  const navigate = useNavigate();

  const isMobile = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });
  return (
    <Box
      color={'whiteAlpha.900'}
      bg={'blackAlpha.900'}
      bottom={0}
      w={isMobile ? '100%' : "100vw"}
    >
      <Container
        as={Stack}
        maxW={{ base: 'full', md: '5xl', lg: '6xl', xl: '7xl' }}
        py={{base: 6, md: 8, lg: 10, xl: 10}}
      >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={{base:2, md: 4, lg: 6, xl: 8}}>
          <Stack align={'flex-start'}>
            <ListHeader fontSize={{base: 'sm', md: 'md', lg: '2xl', xl: '2xl'}}>Company</ListHeader>
            {/* <Link href={'#'} fontSize={{base: 'sm', md: 'md', lg: 'xl', xl: 'xl'}}  onClick={() => navigate('/')} cursor={'default'}>About Us</Link> */}
            <Link href={'#'} fontSize={{base: 'sm', md: 'md', lg: 'lg', xl: 'lg'}}  onClick={() => navigate('/help_support')} cursor={'default'}>Contact Us</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader fontSize={{base: 'sm', md: 'md', lg: '2xl', xl: '2xl'} } cursor={'none'}>Support</ListHeader>
            <Link href={'#'} fontSize={{base: 'sm', md: 'md', lg: 'lg', xl: 'lg'}} onClick={() => navigate('/help_support')} cursor={'default'}>Help Center</Link>
          </Stack>

          <Stack align={'flex-start'}>
            <ListHeader fontSize={{base: 'sm', md: 'md', lg: '2xl', xl: '2xl'}}>Legal</ListHeader>
            <Text fontWeight='bold' onClick={() => navigate('/privacy_policy')} fontSize={{base: 'sm', md: 'md', lg: 'lg', xl: 'lg'}} cursor={'default'}>Privacy Policy</Text>
            <Text fontWeight='bold' onClick={() => navigate('/terms_and_conditions')} fontSize={{base: 'sm', md: 'md', lg: 'lg', xl: 'lg'}} cursor={'default'}>Terms and Conditions</Text>
          </Stack>

          {/* <HStack align={'flex-start'}>
            <ListHeader fontSize={{base: 'sm', md: 'md', lg: '2xl', xl: '2xl'}}>Install App</ListHeader>
            <a href={'#'}>
              <img
                alt={'Get it on Google Play'}
                src={'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'}
              />
            </a>
            <a href={'#'}>
              <img
                alt={'Get it on App Store'}
                src={'https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'}
              />
            </a>
          </HStack> */}
        </SimpleGrid>
      </Container>

      <Box
        borderTopWidth={1}
        borderStyle={'solid'}
        borderColor={'blackAlpha.900'}
      >
        <Container
          as={Stack}
          maxW={'6xl'}
          py={{base: 1, md: 2, lg: 4, xl: 4}}
          direction={{ base: 'row', md: 'row' }}
          spacing={{base: 1, md: 2, lg: 4, xl: 4}}
          justify={{base: 'space-between', md: 'space-between' }}
          align={{ md: 'center' }}
        >
          <Text fontSize={{base: 'sm', md: 'md', lg: 'xl', xl: '2xl'}} textAlign='left' cursor={'none'}>&#169; 2024 Wheelz365. All rights reserved</Text>
          <Stack direction={'row'} spacing={{base: 2, md: 3, lg: 6, xl: 6}} mt={{base: '-1' , md: '-4', lg: '-4', xl: '-4'}} >
            <SocialButton label={'Twitter'} href={'https://x.com/Wheelz365'}>
              <FaTwitter />
            </SocialButton>
            <SocialButton label={'Instagram'} href={'https://www.instagram.com/wheelz_365_/'}>
              <FaInstagram />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}

export default FooterComponent;
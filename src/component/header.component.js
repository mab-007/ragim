import {
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useBreakpointValue
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import {  HamburgerIcon } from '@chakra-ui/icons';
import { useEffect, useState } from 'react';
import {animateScroll as scroll} from 'react-scroll';
import { useScroll } from '../context/scroll.context';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn, setResetState } from '../reducers';
import { supabase } from '../utils/supabase.client';




const HamburgerMenu = ({isMobile, isLoggedIn}) => {
  //let scroll  = Scroll.animateScroll;
  const [section, setSection] = useState(null);
  const { scrollToSection } = useScroll();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleMenuClick = async (option) => {
    if (option === 'body_two') {
      await navigate('/');
      scrollToSection('body_two')
    } else if (option === 'bodyThree') {
      await navigate('/');
      scrollToSection('bodyThree');
    }

  };

  

  let handleOnLogout = async () => {
    dispatch(setResetState());
    await supabase.auth.signOut({ scope: 'local' })
    // logout supabase
    navigate(`/`)
  }

  useEffect(() => {
    if (section) {
      scroll.scrollTo(section, {
        duration: 0,
        delay: 0,
      });
    }
  }, [section]);

  return (
    <Menu zIndex={2000}>
      <MenuButton 
        as={HamburgerIcon} 
        color={'white'} 
        mt={'-0.2'} 
        justifySelf={'right'}
      />
      <MenuList background={'white'} >
        {isLoggedIn && <MenuItem onClick={() => navigate('/profile')} backgroundColor='white' textColor={'black'}>Profile</MenuItem>}
        {isMobile && isLoggedIn && <MenuItem onClick={() => navigate('/product_booking/car')} backgroundColor='white' textColor={'black'}>Car</MenuItem>}
        {isMobile && isLoggedIn && <MenuItem onClick={() => navigate('/product_booking/bike')} backgroundColor='white' textColor={'black'}>Bike</MenuItem>}
        {isMobile && <MenuItem onClick={() => handleMenuClick('bodyThree')} backgroundColor='white' textColor={'black'}>Our Offering</MenuItem>}
        {isMobile && <MenuItem onClick={() => handleMenuClick('body_two')} backgroundColor='white' textColor={'black'}>Why us?</MenuItem>}
        {isLoggedIn && <MenuItem onClick={() => navigate('/activityList')} backgroundColor='white' textColor={'black'}>Activities</MenuItem>}
        {isMobile && <MenuItem onClick={() => navigate('/help_support')} backgroundColor='white' textColor={'black'}>Help</MenuItem>}
        {isMobile && !isLoggedIn && <MenuItem onClick={() => navigate('/login')} backgroundColor='white' textColor={'black'}>Log in / Sign up</MenuItem>}
        {isLoggedIn && <MenuItem onClick={() => handleOnLogout()} backgroundColor='white' textColor={'black'}>Log Out</MenuItem>}
        {isLoggedIn && <MenuItem onClick={() => navigate('/address_list')} backgroundColor='white' textColor={'black'}>Saved Address</MenuItem>}
      </MenuList>
    </Menu>
  )
}


const HeaderComponent = () => {

  const navigate = useNavigate();  
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileClicked, setProfileClicked] = useState(false);
  const { scrollToSection } = useScroll();
  const isLoggedIn = useSelector(selectIsLoggedIn);




  const handleProfileMenu = () => {
    setProfileClicked(true);
  }

  const bg = useColorModeValue('black', 'black.900');
  const color = useColorModeValue('gray.900', 'white');
  const isMobile = useBreakpointValue({
    base: true,
    md: false,
    lg: false,
  });


  const handleMenuClick = async (option) => {
    if (option === 'body_two') {
      await navigate('/');
      scrollToSection('body_two')
    } else if (option === 'bodyThree') {
      await navigate('/');
      scrollToSection('bodyThree');
    }

  };

  return (
    <Box
      bg={bg}
      color={color}
      py={{ base: 2, md: 4 }}
      px={{ base: 3, md: 6 }}
      boxShadow="md"
      w={isMobile ? '100%' : "100vw"}
    >
    {isMobile ? 
      <Flex
        justifyContent="space-between"
        flexDirection={{ base: 'column', md: 'row' }}
      >
      <Flex
        flexDirection="row"
        mb={{ base: 4, md: 0 }}
        justifyContent="space-between"
        alignItems='center'
      >
        <Text
          cursor={'default'}
          borderRadius="md"
          fontSize={{ base: 'xl', md: '2xl' }}
          fontWeight="bold"
          textColor="white"
          onClick={() => navigate('/')}
        >
          WHEELZ 365
        </Text>
            {!isMenuOpen && <HamburgerIcon 
              color='white' 
              mt={'-0.2'} 
              justifySelf={'right'} 
              onClick={() => setIsMenuOpen(true)}
            />}
            {isMenuOpen && <HamburgerMenu isMobile={isMobile} isLoggedIn={isLoggedIn} />}
      </Flex>


      </Flex> : 
      <Flex
        alignItems="center"
        justifyContent="space-between"
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Flex
          cursor={'default'}
          alignItems="center"
          justifyContent="center"
          flexDirection="row"
          mb={{ base: 4, md: 0 }}
        >
          <Text
            borderRadius="md"
            fontSize={{ base: 'xl', md: '2xl' }}
            fontWeight="bold"
            textColor="white"
            onClick={() => navigate('/')}
          >
            WHEELZ 365
          </Text>
          {isLoggedIn && <Text
            cursor={'default'}
            textColor="white"
            marginLeft={{ base: 2, md: 10 }}
            marginTop={1}
            fontWeight="semibold"
            fontSize={{ base: 'sm', md: 'md' }}
            onClick = {() => navigate('/product_booking/car')}
          >
            Car
          </Text>}
          {isLoggedIn && <Text
            cursor={'default'}
            textColor="white"
            marginLeft={{ base: 2, md: 8 }}
            marginTop={1}
            fontWeight="semibold"
            fontSize={{ base: 'sm', md: 'md' }}
            onClick = {() => navigate('/product_booking/bike')}
          >
            Bike
          </Text>}
          <Text
            cursor={'default'}
            textColor="white"
            marginLeft={{ base: 2, md: 8 }}
            marginTop={1}
            fontWeight="semibold"
            fontSize={{ base: 'sm', md: 'md' }}
            onClick={() => handleMenuClick('bodyThree')}
          >
            Our Offering
          </Text>
          <Text
            cursor={'default'}
            textColor="white"
            marginLeft={{ base: 2, md: 8 }}
            marginTop={1}
            fontWeight="semibold"
            fontSize={{ base: 'sm', md: 'md' }}
            onClick={() => handleMenuClick('body_two')}
          >
            Why us?
          </Text>
        </Flex>
        
        {!isMobile && <Flex
          alignItems="center"
          justifyContent="space-between"
          flexDirection="row"
        >
          <Text
            cursor={'default'}
            textColor="white"
            marginRight={4}
            marginTop={1}
            fontWeight="semibold"
            fontSize={{ base: 'sm', md: 'md' }}            
            onClick = {() => navigate('/help_support')}
          >
            Help
          </Text>
          {isLoggedIn ? 
              <Box zIndex={1000}><HamburgerMenu  isMobile={isMobile} isLoggedIn={isLoggedIn}  /></Box>

            : 
            <Text
              cursor={'default'}
              textColor="white"
              marginRight={4}
              marginTop={1}
              fontWeight="semibold"
              fontSize={{ base: 'sm', md: 'md' }}
              onClick={() => navigate('/login')}
            >
              Log in/Sign Up
            </Text>
          }
        </Flex>}
      </Flex>}

    </Box>
  );
};

export default HeaderComponent;
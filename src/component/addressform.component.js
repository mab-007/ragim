import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectFeatureFlags, selectOrderAddressId, selectUserProfile } from '../reducers/index';
import addressSerivice from '../service/address.serivice';
import activityService from '../service/activity.service';
import { Box, Input, Text, Button } from '@chakra-ui/react';
import { FaHome, FaUserFriends } from "react-icons/fa";
import { MdOutlineWork, MdGroups } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';




const tag = [
    {
        id: 1,
        title: "Home",
        icon: "FaHome",
        color:"gray",
        enable: "true"
    },
    {
        id: 2,
        title: "Work",
        icon: "MdOutlineWork",
        color:"gray",
        enable: "true"
    },
    {
        id: 3,
        title: "Friends & Faimly",
        icon: "FaUserFriends",
        color:"gray",
        enable: "true"
    },
    {
        id: 4,
        title: "Others",
        icon: "MdGroups",
        color:"gray",
        enable: "true"
    },
];

const regexPincode = /^\d{6}$/;
const pincodeMessage = 'Invalid Pin Code';


const AddressForm = (props) => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [saveAsVisible, setSaveAsVisible] = useState(0);
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [vehicleNoOrParkingNo, setVehicleNoOrParkingNo] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [saveAs, setSaveAs] = useState('');
  const [alternatePhoneNo, setAlternatePhoneNo] = useState('');
  const userProfile = useSelector(selectUserProfile);
  const [submmitText, setSubmmitText] = useState('Save');
  const orderAddressId = useSelector(selectOrderAddressId);
  const [selectedIconColor, setSelectedIconColor] = useState('black');

    
  const route = useLocation();
  const origin_screen_name = route.params?.origin_screen_name;
  const address_id = route.params?.address_id;

  const [address, setAddress] = useState({
    houseNo: null,
    apartment: null,
    saveAs: null,
    phoneNo: null,
  });

  const [carNo, setCarNo] = useState(null)
  const [inputError, setInputError] = useState(null);
  const [pincodeError, setPincodeError] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const featureFlags = useSelector(selectFeatureFlags);

  let handleSaveOnPress = (id, title) => {
    setDisableSaveButton(false);

    setSelectedId(id);
    setSelectedType(title)

  }


  let saveAddress = async (addressObj) => {
    try {
        const result = await addressSerivice.addNewAddress(userProfile.user_id,addressObj);
        if(!result) throw new Error(`Error in adding new address`);
    } catch(err) {
        console.error(`Error in saving address to db` + err);
        alert(`Something went wrong!, Please try back after some time`)
    }
  }

  let udpateAddress = async (addressObj) => {
    try {
        const result = await addressSerivice.updateAddressDetails(userProfile.user_id,addressObj);
        if(!result) throw new Error(`Error in adding new address`);
    } catch(err) {
        console.error(`Error in saving address to db`);
        alert(`Something went wrong!, Pelase try back after some time`)
    }
  }



  let createActivity = async () => {
        try {
            const obj = {
                user_id : userProfile.user_id,
                plan_id: 'Daily-Pass-Default',
                date_of_purchase: new Date(),
                plan_start_date: new Date(),
                plan_type: 'Monthly',
                address_id: orderAddressId
            }
            const result = await activityService.createActivity(obj);
            if(!result)
                throw new Error(`Error in creating order`);
        }catch(e) {
            console.error(`Some thing went wrong !\n` + e);
            alert(`Some thing went wrong !`);
        }
    }


    let handleTextChange = (text) => {
        if(text && !regexPincode.test(text)){
            setPincodeError(true);
        }else {
            setPincodeError(false);
        }
        setPinCode(text);
    }

    const getIcon = (iconName, color) => {
        switch (iconName) {
          case 'FaHome':
            return <FaHome color={color} />;
          case 'MdOutlineWork':
            return <MdOutlineWork color={color} />;
          default:
            return <FaUserFriends color={color} />;
        }
      };

  let handleSubmit = (submmitText) => {
    // Handle form submission here
    if(!addressLine1 || !addressLine2 || !vehicleNoOrParkingNo || !pinCode){
        return alert(`Address feilds cannot be empty!`);
    }
    const addressObj = {
        address_id: 'CUST'+ new Date().getTime(),
        user_id: userProfile?.user_id,
        address_line_1 : addressLine1,
        address_line_2 : addressLine2,
        vehichle_or_parking_no: vehicleNoOrParkingNo,
        alternate_phone_no: alternatePhoneNo || userProfile?.user_phone_no,
        address_type: saveAs || 'home',
        pincode: pinCode,
        address_tag: 'Other'
    }
    console.log(addressObj);
    if(submmitText === 'Save')
        saveAddress(addressObj);
    else if(submmitText === 'Edit')
        udpateAddress(addressObj);
    switch(origin_screen_name){
        case "Product Booking":
            return //navigation.navigate(ServiceOptionsCard);
        case "dailyPass":
            createActivity();
            return //navigation.navigate('PaymentScreen', { amount: '100', time: ' within 24hrs', origin_screen_name: 'dailyPass'});   
        default:
            return navigate('/');
    }
  };

  let fetchAddressDetailsById = async (id) => {
    try {
        const result = await addressSerivice.fetchAddressDetailsById(id);
        setAddressLine1(result?.address_line_1);
        setAddressLine2(result?.address_line_2);
        setVehicleNoOrParkingNo(result?.vehichle_or_parking_no);
        setPinCode(result?.pincode);
        setSubmmitText('Edit');
    } catch (err){
        console.error(`Error in fetching address details from backend`);
    }
  }

  useEffect(() => {
    console.log(userProfile);
    if(origin_screen_name === 'address_list'){
        fetchAddressDetailsById(address_id);
    }

    if(props.flag === 'Update') {
        setSubmmitText('Update')
    }

    if (selectedId === 4) {
      setSaveAsVisible(1);
    } else {
        setSaveAsVisible(0);
    }
  }, [selectedId, addressLine1, addressLine2, vehicleNoOrParkingNo]);

  return (
    <Box className={`bg-white h-full`}>

        <Box className={`bg-white justify-center text-xl p-2 h-full`} justifyContent={'center'}>
            <Box borderRadius={'md'} padding={'4'} mt='2' mb='2' backgroundColor={'gray.200'} >
                <Text fontWeight={'semibold'} textColor={'black'}>A detailed address will help the cleaning ninja reach your destination easily</Text>
            </Box>
             <Input
                borderBottom={true} mb='4' m='2' p='4' fontWeight={'normal'} borderRadius={'lg'} textAlign={'left'} fontSize={'lg'} borderColor={'gray.300'}
                width={'50%'}
                placeholder="House/Flat/Floor No."
                value={addressLine1 || props?.address?.address_line_1 || ''}
                onChange={(e) => setAddressLine1(e.target.value)}
            />
            {inputError && <Text className={`text-red-400 p-4 mr-2 ml-2 mb-4`}>{inputError}</Text>}
            <Input
                borderBottom={true} mb='4' m='2' p='4' fontWeight={'normal'} borderRadius={'lg'} textAlign={'left'} fontSize={'lg'} borderColor={'gray.300'}
                width={'50%'}
                placeholder="Apartment/Road/Area"
                value={addressLine2 || props?.address?.address_line_2 || ''}
                onChange={(e) => setAddressLine2(e.target.value)}
            />
            {inputError && <Text  className={`text-red-400 p-4 mr-2 ml-2 mb-4`}>{inputError}</Text>}
            <Input
                borderBottom={true} mb='4' m='2' p='4' fontWeight={'normal'} borderRadius={'lg'} textAlign={'left'} fontSize={'lg'} borderColor={'gray.300'}
                width={'50%'}
                placeholder="Vehicle No./Parking No."
                value={vehicleNoOrParkingNo || props?.address?.vehicle_no || ''}
                onChange={(e) => setVehicleNoOrParkingNo(e.target.value)}
            />
            <Input
                borderBottom={true} mb='4' m='2' p='4' fontWeight={'normal'} borderRadius={'lg'} textAlign={'left'} fontSize={'lg'} borderColor={'gray.300'}
                width={'50%'}
                placeholder="Pincode"
                value={pinCode || props?.address?.pincode || ''}
                onChange={(e) => handleTextChange(e.target.value)}
            />
            {pincodeError && <Text className={`text-red-400 p-4 mr-2 ml-2 mb-4`}>{pincodeMessage}</Text>}
            <Box>
            <Input
                borderBottom={true} mb='4' m='2' p='4' fontWeight={'normal'} borderRadius={'lg'} textAlign={'left'} fontSize={'lg'} borderColor={'gray.300'}
                width={'50%'}
                placeholder="Save As"
                value={'Default' || ''}
                onChange={(e) => setSaveAs(e.target.value)}
            />
            {/* <Text fontWeight={'semibold'} mb='2'> Save As </Text>
            <SimpleGrid columns={3} spacing={1} width="10%" justifyContent="center">
                {tag.filter((item) => item.enable === 'true').map((item) => (
                    <Box
                    key={item.id}
                    backgroundColor="gray.200"
                    rounded="30"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    p={2}
                    >
                    {getIcon(item.icon, selectedId === item.id ? 'black' : item.color)}
                    <Text
                        color="black"
                        fontWeight="semibold"
                        fontSize={{ base: 'xs', md: 'sm' }}
                    >
                        {item.title}
                    </Text>
                    </Box>
                ))}
            </SimpleGrid> */}
            </Box>
            
            {saveAsVisible === 1 ? 
            <Box>
                <Input
                    className={`border-b border-gray-300 p-4 font-semibold text-left text-lg rounded-lg ml-2 mr-2 mb-4`}
                    placeholder="Save As"
                    value={address.saveAs}
                    onChangeText={(text) => setSaveAs(text)}
                />
                <Input
                    className={`border-b border-gray-300 p-4 font-semibold text-left text-lg rounded-lg ml-2 mr-2 mb-4`}
                    placeholder="Phone no"
                    value={address.saveAs}
                    onChangeText={(text) => setAlternatePhoneNo(text)}
                />
            </Box>
            : null}

            <Box className={`flex flex-grow justify-end mb-10`}>
                <Button
                    disabled={disableSaveButton}
                    onClick={() => handleSubmit(submmitText)}
                    backgroundColor={disableSaveButton ? 'gray-300' : 'black'}
                    className={`bg-black py-3 m-3 rounded-xl ${disableSaveButton && 'bg-gray-300'}`} 
                    borderRadius="full"
                    px={4}
                    py={3}
                    mb={5}
                    mt={4}
                    width={'50%'}
                    _disabled={{ opacity: 0.5 }}
                >
                    <Text textColor={'white'} fontSize={'xl'}> {submmitText} </Text>
                </Button>
            </Box>
        </Box>
    </Box>
  );
};

export default AddressForm;
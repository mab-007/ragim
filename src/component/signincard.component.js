import {
    Box,
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useToast,
  } from '@chakra-ui/react';
  import { useState, useEffect } from 'react';
  import { useDispatch, useSelector } from 'react-redux';
  import { selectUserProfile, setIsLoggedIn, setIsLoggedOut, setPendingProfile, setShowSignInComponent, setUserProfile } from '../reducers/index';
  import profileService from '../service/profile.service';
  import signinService from '../service/signin.service';
  import { ArrowBackIcon, ArrowForwardIcon, ChevronLeftIcon, ChevronRightIcon, Icon } from '@chakra-ui/icons';
import { useNavigate, useRoutes } from 'react-router-dom';
import TextBox from './textbox.component';



let screenConfig = {
    normal_phone : {
        regex: /^\d{10}$/,
        errorMessage: 'Invalid phone number'
    },
    normal_password : {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        errorMessage: 'Password must be at least 8 characters, including uppercase, lowercase, digits, and special characters'
    },
    normal_email : {
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: 'Invalid email address'
    },
    refferal_code : {
        regex: /^[a-zA-Z0-9!@#$%^&*()_+=-{};:'<>,./?]{6,}$/,
        errorMessage: 'Refferal code not found'
    }
}
  
  const SigninCard = ({tag}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [newCustomer, setNewCustomer] = useState(false);
    const [password, setPassword] = useState(null);
    const [rePassword, setRePassword] = useState(null);
    const [passwordMatch, setPasswordMatch] = useState(true);
    const [manatoryFieldsCheck, setMandatoryFieldCheck] = useState(true);
    const [mountScreenConfig, setMountScreenConfig] = useState(true);
    const [flow, setFlow] = useState('SignIn');
    const [phone, setPhone] = useState(null);
    const [email, setEmail] = useState(null);
    const [id, setId] = useState(null);
    const [refferCode, setRefferCode] = useState(null);
    const [fetchIdData, setFetchIdData] = useState(true);
    const [resetPassword, setResetPasswor] = useState(false);
    const userProfile = useSelector(selectUserProfile);



    let handleSignUp = async () => {
        //Backend: Create User
        try {
            if(!password || !rePassword || !id){
                setMandatoryFieldCheck(false);
            }
            const signUpstatus = await signinService.signup(id, password, tag, id);
            if(!signUpstatus?.status){
                console.log(`Sign Up failed due to: \n` + signUpstatus);
                throw new Error('Sign Up failed')
            }
            dispatch(setIsLoggedIn(true));
            dispatch(setIsLoggedOut(false));
            if(tag == 'PHONE NUMBER') {
                dispatch(setUserProfile({
                    phone_number: phone,
                    user_id: signUpstatus.data.user_id,
                    refferal_code: signUpstatus?.data?.refferal_code
                }))
            } else if(tag == 'EMAIL ID') {
                dispatch(setUserProfile({
                    email: email,
                    user_id: signUpstatus.data.user_id,
                    refferal_code: signUpstatus?.data?.refferal_code
                }))
            }
            
            dispatch(setPendingProfile(true));
            console.log('Its all yellow');
            navigate('/profile', {state:{screen_name: 'sign_up'}});

        } catch(e){
            console.log(e);
            alert(`Something went wrong !`)
        }
    }

    let handleSignIn = async () => {
        try{
            console.log('Hello');
            if(!id || !password) {
                alert('Please fill mandatory fields to proceed');
                return;
            }
            const result = await signinService.login(id, password);
            console.log(result);
            //fetchAndSaveUserData();
            if(result === 'Login Successful.'){
                dispatch(setIsLoggedIn(true));
                navigate('/')
            } else {
                alert(result);
            }
        } catch(e){
            console.log(e);
            alert('Error in sign in. Please try again');
        }
    }

    let handleBack = () => {
        window.location.reload();
        dispatch(setShowSignInComponent(true));
        navigate('/login')
    }


    let fetchAndSaveUserData = async () => {
        try {

            const details = await profileService.fetchProfileDetails(userProfile?.user_id);
            if(!details)
                throw new Error(`Error in fetching user details`);
            dispatch(setUserProfile({
                ...userProfile,
                user_email : details.user_email_id,
                user_phone_no : details.user_phone_no,
                user_name :  details.user_name,
                refferal_code: details?.data?.refferal_code
            }));
        } catch(err) {
            console.error(`Error in fetching user Details \n` + err);
            throw new Error('Error in fetching user details');
        }
    }

    const fetchData = async () => {     
        if(id && fetchIdData){
            try {
                const result = await signinService.checkIfIdPresent(id);
                if(result?.isPresent){
                    screenConfig.normal_password.Text = '';
                    dispatch(setUserProfile({
                        user_id: result?.user_id
                    }));
                    dispatch(setPendingProfile(false));
                } else {
                    setNewCustomer(true);
                }
                setFetchIdData(false);
            } catch(e) {
                alert('Some thing went wrong');
                console.error('Error in fetching data')
            }
        }     
    }

    useEffect(() => {
        //Backend: Check if use exisit or not
        console.log(email);
        if(tag === 'EMAIL ID' && email) {
            setFlow('email');
            setId(email)
        } else {
            setFlow('phone');
            setId(phone);
        }
        
        fetchData();
        if(mountScreenConfig) {
            setMountScreenConfig(false);
        }

        if(password && rePassword){
            if(password !== rePassword) setPasswordMatch(false);
            else setPasswordMatch(true);
        }

            
    })

  
    return (
        <Box bg="white" h="100%">
            <Flex direction="column" p={4} flex={1}>
            <Text fontSize="2xl" fontWeight="semibold" mb={5}>
                Namaskar, Welcome to Wheelz 365!
            </Text>
            <Text fontSize="xl" mb={5}>
                Enter your details below
            </Text>

            {tag === 'EMAIL ID' && <TextBox param1={tag} param2={`Enter your email`} param3='false'  param5={screenConfig.normal_email}
                udpateTextValue={setEmail}
            />}
            {tag === 'PHONE NUMBER' && <TextBox param1={tag} param2={`Enter your phone no`} param3='false' param5={screenConfig.normal_phone}
                udpateTextValue={setPhone}
            />}
            <TextBox param1='PASSWORD' param2='Enter your password' param3='false' param5={screenConfig.normal_password}  secureEntry={'password'}
                udpateTextValue={setPassword}
            />
            {newCustomer &&
                <TextBox param1='RE-ENTER PASSWORD' param2='Re-Enter your password' param3='false' param5={screenConfig.normal_password} secureEntry={'password'}
                udpateTextValue={setRePassword}
                />
            }
            {newCustomer &&
                <TextBox param1='REFERRAL CODE(Optional)' param2='Enter referral code' param3='false' param5={screenConfig.refferal_code} 
                udpateTextValue={setRefferCode}
                />
            }
            {!passwordMatch &&
                <Text textColor={'red.400'}>Password didn't match, please renter !</Text>
            }

            {!manatoryFieldsCheck &&
                <Text textColor={'red.400'}>Mandatory Fields cannot be empty !</Text>
            }
            
            </Flex>

            
            <Flex direction="row" justifyContent={'space-between'}  mt={5}>
            <Button 
                onClick={() => handleBack()} 
                colorScheme="gray.400"
                backgroundColor={'gray.400'}
                rightIcon={<ArrowBackIcon mt={-0.2}/>}
                borderRadius={'full'}
                mr={3}
            />
            {newCustomer ? (
                <Button 
                    onClick={() => handleSignUp()} 
                    colorScheme="gray.400"
                    backgroundColor={'gray.400'}
                    rightIcon={<ArrowForwardIcon mt={-0.2} />}
                    borderRadius={'full'}
                    mr={3}
                />
            ) : (
                <Button 
                    onClick={() => handleSignIn()} 
                    colorScheme="gray.400"
                    backgroundColor={'gray.400'}
                    rightIcon={<ArrowForwardIcon mt={-0.2}/>}
                    borderRadius={'full'}
                    mr={3}
                />
            )}
            </Flex>
        </Box>
    )

}

export default SigninCard;
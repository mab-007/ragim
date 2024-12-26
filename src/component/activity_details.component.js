import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlinePending } from "react-icons/md";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/icons";
import activityService from "../service/activity.service";
import Blog from "../pages/blog.pages";
import { GoReport } from "react-icons/go";
import { useSelector } from "react-redux";
import { selectUserProfile } from "../reducers";



const ActivityDetails = ({ data }) => {

    const [activityDetails, setActivityDetails] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const route = useLocation();
    const activityId = route.state.activity.activity_id;
    const userProfile = useSelector(selectUserProfile);
    const phone = userProfile.phone_number;        
    const url = `https://wa.me/${9535905289}?text=Hey! Wheelz 365, can you please help me book my car cleaning service.`;


    const fetchActivityDetails = async (activityId) => {   
        try {
            const result = await activityService.fetchActivityDetailsById(activityId);
            setActivityDetails(result);
            setStartDate(result.activity_start_date);
            setEndDate(result.activity_end_date);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(()=>{
        fetchActivityDetails(activityId)
    },[])

    return (
        <Box borderBottom='1px solid gray.700' height={'100%'}>
            <Text textAlign='center' fontWeight='bold' marginBottom='2' fontSize={{base: 'sm', md: 'md', lg: 'xl', xl: 'xl'}}>Activity Details</Text>
            {!activityDetails ? 
                <Box>
                    <Text fontWeight={'bold'} mb={10}>New Products</Text>
                    <Text fontSize={{base: 'xl', md: '100px'}} fontWeight={'bold'}>We will be back soon. Some thing went wrong !</Text>
                    <Text fontWeight={'bold'} mt={10}>@Wheelz 365.com</Text>
                </Box> : 
                <Box >
                    <Box mb={10} >
                        <Text alignItems='center' textAlign='center' fontSize={{base: 'sm', md : 'md', lg:"xl", xl: "xl"}}  fontWeight='bold' marginBottom='4'>{activityDetails.activity_name} {activityDetails.plan_description} Cleaning Service</Text>
                        
                        <Flex justifyContent='space-between' padding={{base: '0', md: '2', lg: '4', xl: '4'}}   flexDirection={{base: 'column', md: 'row'}}>
                            <Text fontSize={{base: 'sm', md : 'md', lg:"xl", xl: "xl"}} fontWeight='bold' textColor='gray.700'>Service Start Date</Text>
                            <Text fontSize={{base: 'xs', md : 'sm', lg:"md", xl: "md"}}  textColor='black' fontWeight={'semibold'}>{new Date(startDate).getDate() + '/' + (new Date(startDate).getMonth() + 1) + '/' + new Date(startDate).getUTCFullYear()}</Text>
                        </Flex>
                        <Flex justifyContent='space-between' padding={{base: '0', md: '2', lg: '4', xl: '4'}}   flexDirection={{base: 'column', md: 'row'}}>
                            <Text fontSize={{base: 'sm', md : 'md', lg:"xl", xl: "xl"}}  fontWeight='bold' textColor='gray.700'>Service End Data</Text>
                            <Text fontSize={{base: 'xs', md : 'sm', lg:"md", xl: "md"}}  textColor='black' fontWeight={'semibold'}>{new Date(endDate).getDate() + '/' + (new Date(endDate).getMonth() + 1) + '/' + new Date(endDate).getUTCFullYear()}</Text>
                        </Flex>
                        <Flex justifyContent='space-between' padding={{base: '0', md: '2', lg: '4', xl: '4'}} flexDirection={{base: 'column', md: 'row'}} >
                            <Text fontSize={{base: 'sm', md : 'md', lg:"xl", xl: "xl"}} fontWeight='bold' textColor='gray.700'>Price</Text>
                            <Text fontSize={{base: 'xs', md : 'sm', lg:"md", xl: "md"}} textColor='black' fontWeight={'semibold'}>₹ {activityDetails.activty_amount}/- only per month</Text>
                        </Flex>
                    </Box>
                    <Box padding={4} backgroundColor="gray.100" textAlign="center" width="100%" >
                        <Flex alignItems={'center'} justifyContent="center" onClick={() => {window.open(url, '_blank');}} >
                            <GoReport marginBottom={'2'} color="gray.500" />
                            <Text mt={3} fontWeight={'semibold'} textColor={'gray.500'}> Report an issue!</Text>
                        </Flex>
                    </Box>
                </Box>
            }



        </Box>
    );
  };

export default ActivityDetails;





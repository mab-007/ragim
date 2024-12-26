import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlinePending } from "react-icons/md";
import { Box, Divider, Flex, Heading, Text } from "@chakra-ui/icons";


const Activity = ({ data }) => {
    useEffect(() => {
      console.log(data.activity_id);
    }, []);
    return (
      <Box bg="white" p={4} borderRadius="2xl" boxShadow="sm" alignContent={"center"} margin={0}>
        <Flex justifyContent='space-between' alignItems={"center"}>
          <Flex alignItems={"center"} justifyItems={'space-between'}>
            <MdOutlinePending   size={50}  alignItems="center"/>
            <Box marginLeft={{base:2, md:10, lg:10, xl: 55}} marginRight={2} marginTop={{base:'2', md:'3', lg: '4', xl: '4'}} textAlign={'left'} >
                <Heading fontSize={{base: 'xs', md : 'sm', lg:"md", xl: "md"}}>{data?.plan_title || "List Item Heading"}</Heading>
                <Text fontSize={{base: 'xs', md : 'sm', lg:"md", xl: "md"}} color="gray.500">{data?.plan_description || "List Item Description"}</Text>
            </Box>
          </Flex>
          <Box>
            <Text fontSize={{base: 'xs', md : 'sm', lg:"md", xl: "md"}} fontWeight="bold">
              ₹{data?.plan_amount || 0} /-
            </Text>
            <Text fontSize={{base: 'xs', md : 'sm', lg:"md", xl: "md"}} color="gray.500">{data?.activity_status || "Item Status"}</Text>
          </Box>
        </Flex>
      </Box>
    );
  };

export default Activity;

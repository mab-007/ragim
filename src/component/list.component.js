import React, { useEffect, useState } from "react";
import { FaAddressBook } from "react-icons/fa";
import { ArrowForwardIcon, Box, Button, Divider, Flex, Heading, Text } from "@chakra-ui/icons";
import AddressForm from "./addressform.component";


const List = ({ address }) => {

  const [openEditPageFlag, setOpenEditPageFlag] = useState(false);

  const handleEditOnClick = () => {
    //edit Address
    setOpenEditPageFlag(true);
  }

  const handleDeleteOnClick = () => {
    //delete Address
  }

  useEffect(() => {
    console.log(address);
  })

    return (
      <Box bg="white" p={2} borderRadius="2xl" boxShadow="sm" alignContent={"center"}>
        {!openEditPageFlag && <Flex justifyContent='space-between'  alignItems={'center'} >
          <Flex alignItems={"center"} justifyItems={'space-between'}>
            <FaAddressBook size={50} />
            <Box marginLeft={{base:2, md:10, lg:10, xl: 55}} marginRight={2} marginTop={{base: 2, md: 3, lg: 4, xl: 4}} textAlign={'left'} >
                <Heading fontSize={{base: 'sm', md : 'md', lg:"md", xl: "md"}}>{address?.address_type || "List Item Heading"}</Heading>
                <Text fontSize={{base: 'xs', md : 'sm', lg:"sm", xl: "sm"}} color="gray.500">{address?.destination || "List Item Description"}</Text>
            </Box>
          </Flex>
          <Box alignItems={'center'} justifyContent={'center'} textAlign={'left'} padding={2}>
              <Text fontSize={{base: 'xs', md : 'sm', lg:"sm", xl: "sm"}} color="gray.500" onClick={() => handleEditOnClick()}>{"Edit"}</Text>
              {/* <Text fontSize="sm" color="gray.500" onClick={() => handleDeleteOnClick()}>{"Delete"}</Text> */}
          </Box>
        </Flex>}
        {openEditPageFlag && <AddressForm address={address} flag={'Update'} />}
      </Box>
    );
  };

export default List;

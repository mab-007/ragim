import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  // Button,
  Container,
  Flex,
  Heading,
  // Image,
  // Input,
  // Text,
} from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
// import { AiOutlineSearch } from "react-icons/ai";
import styles from "../style/Home.module.css";
import { useThrottle } from "use-throttle";
import { useNavigate } from "react-router-dom";
import ServicesCategory from "./servicecategory.component";

const carLuxe = 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1726303356/qgfreqpzkqhygmpilmey.webp';
const bikeLuxe = 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1726303355/ynfnm0vshcop8xsve4ke.jpg';
  
// Small services logo
const cardData = [
  {
    id: 1,
    logo: carLuxe,
    title: 'car',
    service: "Car Wash",
  },
  {
    id: 2,
    logo: bikeLuxe,
    title: 'bike',
    service: "Bike Wash",
  },
];

const HomeTopSection = ({ loading, setLoading, onChange, suggestions }) => {
  const selectedCity = localStorage.getItem("location");
  const [inputText, setInputText] = useState("");
  const [active, setActive] = useState(0);
  const scrollRef = useRef();
  const throttledText = useThrottle(inputText, 1000);
  const navigate=useNavigate()
  useEffect(() => {
    onChange(throttledText);
  }, [throttledText, onChange]);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    setLoading(true);
  };

  // const handleClear = () => {
  //   setInputText("");
  //   onChange("");
  //   setLoading(false);
  // };
  
  const searchResult = (item) => {
    navigate(`/commingsoon`)
  };

  return (
    <Box>
      <Box className={styles.homeTopBox}>
        <Container color="whitesmoke" fontSize={"12px"}>
          <Breadcrumb>
            <BreadcrumbItem>
              <BreadcrumbLink href="#" fontSize={{base: 'sm', md: 'md', lg: 'sm', xl: 'sm'}}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#" fontSize={{base: 'sm', md: 'md', lg: 'xl', xl: 'xl'}}>{selectedCity}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
        <Heading
          as={"h1"}
          fontSize={{base: 'xl', md: "48px", lg: "48px", xl: "48px"}}
          fontWeight="500"
          color="white"
          lineHeight={{ lg: "72px"}}
        >
          Car services, on demand.
        </Heading>
      </Box>
      <ServicesCategory data={cardData} />
    </Box>
  );
};

export default HomeTopSection;


/**
 * 
        <br />
        <br />

        <br />

        <Container
          maxW={{base:'sm' ,xl: "3xl", lg: "3xl"}}
          lineHeight={"24px"}
          h={{ base: '8%', md: '9%', xl: "300px", lg: "300px"}}
          mt="20%"
          position="absolute"
        >
          <Flex h={{base: '35%', md: '35%', lg:"60px", xl: "60px"}} justifyContent={"space-between"}>
            <Flex
              alignItems={"center"}
              bgColor={"whitesmoke"}
              borderRadius="5px"
              w={{base: '33%', md: '28%', lg: '25%' ,xl:'25%'}}
            >
              <Image
                w={{base: '20%', lg: "35px", xl: "35px"}}
                src="https://images.urbanclap.com/image/upload//q_auto,f_auto,fl_progressive:steep/t_medium_res_template/v1514444369/Flag_of_India_28Dec2017-1.png"
                alt="flag"
                m="5%"
              />
              <Text fontSize={{base: 'sm', md: 'md', lg: 'xl', xl: 'xl'}}>{selectedCity}</Text>
            </Flex>
            <Flex w={{base: '65%' ,lg: "70%", xl: '70%'}} h="100%" len={suggestions.length}>
              <Button
                borderRadius={"5px 0 0 5px"}
                h="100%"
                bg="whitesmoke"
                fontSize={{ base: 'auto' ,lg: "30px"}}
                pb="5%"
              >
                <AiOutlineSearch />
              </Button>
              <Input
                value={inputText}
                onChange={handleInputChange}
                w="100%"
                borderRadius={"0 5px 5px 0"}
                h="100%"
                bg="whitesmoke"
                focusBorderColor="none"
                fontSize={{ base: "14px", md: "16px", lg: "18px" }}
                placeholder="Search for services"
                css={{
                  '&::placeholder': {
                    fontSize: { base: '12px', md: '14px', lg: '16px' },
                  },
                }}
              />
            </Flex>
          </Flex>
          {suggestions.length > 0 && (
            <Box
              className={styles.searchResultBox}
              len={suggestions.length}
              limit={5}
              active={active}
              ref={scrollRef}
            >
              {suggestions.map((item, index) => {
                return (
                  <Box
                    key={index}
                    _hover={{ bgColor: "purple.100" }}
                    className={styles.suggestions}
                    onClick={() => {
                      searchResult(index);
                    }}
                  >
                    {item}
                  </Box>
                );
              })}
            </Box>
          )}
        </Container>
        <Container color="white" marginLeft={{ base: '5%', lg: "37%", xl: "37%"}}>
          <Breadcrumb separator=",">
            <BreadcrumbItem>
              <BreadcrumbLink href="#" fontSize={{base:'sm', md:'md', lg: 'xl', xl: 'xl'}}>Car Luxe</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <BreadcrumbLink href="#" fontSize={{base:'sm', md:'md', lg: 'xl', xl: 'xl'}}>Bike Luxe</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#" fontSize={{base:'sm', md:'md', lg: 'xl', xl: 'xl'}}>Daily Service...</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Container>
 */
import { Box, Divider, Heading, Text } from "@chakra-ui/react";
import React from "react";
import styles from "../style/Home.module.css";
import HomePageCarousel from "./homepage.carousel.component";
import HomePageNav from "./homepagenav.component";

const bikeWashPng = 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1726303357/wzbhjt24kpftscuowit3.jpg';
const carWash = 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1727982353/carWash_uh4cxh.jpg';
const dailyPass = 'https://res.cloudinary.com/dn0hjcpmq/image/upload/v1727982396/daily_pass_bw0qec.jpg';
//service listing array

const UXluxury = [
  {
    logo: bikeWashPng,
    services: "Bike Wash",
    text1: "exterior cleaning -",
    text2: "6 days in a week",
    text3: "interiro cleaning -",
    text4: "once a week",
    price: "₹399/-",
    text5: "per month",
  },
  {
    logo: carWash,
    services: "Car Wash",
    text1: "exterior cleaning -",
    text2: "6 days in a week",
    text3: "interiro cleaning -",
    text4: "once a week",
    price: "₹699/-",
    text5: "per month",
  },
  {
    logo: dailyPass,
    services: "Daily Pass",
    text1: "interior and exterior",
    text2: "car & bike cleaning",
    text3: "single day pass",
    text4: "exclusive for",
    price: "₹100/-",
    text5: "per day",
  }
];

const HomePageService = ({ scrollNav }) => {
  return (
    <Box>
      {/* CAR SERVICES CARDS */}
      {/* <Heading
        fontSize="32px"
        fontWeight="700"
        lineHeight="48px"
        m="4% 0 10% 0"
      >
        Car Services
      </Heading>
      <ServicesCategory data={cardData} />
      <Divider className={styles.dividers} /> */}
      {scrollNav>1000 ? <HomePageNav/> :""}
      {/* CAROUSAL */}
      {/* <HomePageCarousel data={sliderData} hideArrow={false} />
      <Divider className={styles.dividers} /> */}

      {/* NEW CATEGORIES CARDS */}
      {/* <Heading className={styles.headings}>New Category Launches</Heading>
      <HomePageCarousel data={newCategoryLaunches} hideArrow={true} />
      <Divider className={styles.dividers} /> */}

      {/* APPLIANCE CARDS */}
      {/* <Heading className={styles.headings}>Appliances</Heading>
      <Text className={styles.text}>
        Servicing, Repair, Installation & Uninstallation
      </Text>
      <HomePageCarousel data={appliances} hideArrow={true} />
      <Divider className={styles.dividers} /> */}

      {/* SALON SPA SLIDER */}
      {/* <Heading className={styles.headings}>
        Salon, Spa and Massage services
      </Heading>
      <Text className={styles.text}>
        Hygienic & Single use products | Low-contact services
      </Text>
      <HomePageCarousel data={salon} hideArrow={false} />
      <Divider className={styles.dividers} /> */}

      {/* CLEANING PEST CONTROL SLIDER */}
      {/* <Heading className={styles.headings}>Cleaning & Pest Control</Heading>
      <HomePageCarousel data={cleaning} hideArrow={false} />
      <Divider className={styles.dividers} /> */}

      {/* WHEELZ365 LUXURY OFFERINGS */}
      <Heading className={styles.headings}>WHEELZ365 LUXURY OFFERINGS</Heading>
      <Text className={styles.text}>
        Top Professionals | Premium Service
      </Text>
      <HomePageCarousel data={UXluxury} hideArrow={true}   className="flex flex-row justify-center items-center" />
      <Divider className={styles.dividers} />

      {/* HOME REPAIRS */}
      {/* <Heading className={styles.headings}>Home Repairs</Heading>
      <HomePageCarousel data={homerepairs} hideArrow={true} />
      <Divider className={styles.dividers} /> */}
    </Box>
  );
};

export default HomePageService;

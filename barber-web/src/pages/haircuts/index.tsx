import Head from "next/head";
import { Sidebar } from "../../components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";

import Link from "next/link";

import { IoMdPricetag } from "react-icons/io";

export default function Haircuts() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            mb={4}
          >
            <Heading
              fontSize={isMobile ? "28px" : "2xl"}
              mt={4}
              mb={4}
              mr={4}
              color="orange.900"
            >
              Modelos de corte
            </Heading>

            <Flex width="60%" alignItems="center" justifyContent="flex-end" gap={10} >
              <Link href="/haircuts/new">
                <Button>Cadastrar novo</Button>
              </Link>

              <Stack
                align="center"
                direction="row"
                justifyContent="space-between"
              >
                <Text fontWeight="bold" color="barber.100">
                  ATIVOS
                </Text>
                <Switch colorScheme="green" size="lg" />
              </Stack>
            </Flex>

          </Flex>

          <Link href="/haircuts/123" style={{ width: "100%" }}>
            <Flex
              cursor="pointer"
              w="100%"
              p={4}
              bg="barber.400"
              direction="row"
              rounded="4"
              mb={2}
              justifyContent="space-between"
            >
              <Flex direction="row" alignItems="center" justifyContent="center">
                <IoMdPricetag size={28} color="#fba931" />
                <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                  Corte completo
                </Text>
              </Flex>

              <Text fontWeight="bold" color="white">
                Preço: R$ 59.90
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Sidebar>
    </>
  );
}

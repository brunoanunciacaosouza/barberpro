import { Sidebar } from "@/components/sidebar";
import { canSRRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Link as ChakraLink,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { IoMdPerson } from "react-icons/io";

export default function Dashboard() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <Head>
        <title>BarberPro - Minha barbearia</title>
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
              Agenda - Próximos clientes
            </Heading>

            <Link href="/haircuts/new">
              <Button>Registrar</Button>
            </Link>
          </Flex>

          <ChakraLink
            width="100%"
            m={0}
            p={0}
            mt={1}
            bg="transparent"
            style={{ textDecoration: "none" }}
          >
            <Flex
              w="100%"
              direction={isMobile ? "column" : "row"}
              p={4}
              mb={4}
              bg="barber.400"
              justifyContent="space-between"
              alignItems={isMobile ? "flex-start" : "center"}
            >
              <Flex
                direction="row"
                mb={isMobile ? 2 : 0}
                alignItems="center"
                justifyContent="center"
              >
                <IoMdPerson size={28} color="#f1f1f1" />
                <Text fontWeight="bold" ml={4} noOfLines={1} color="#f1f1f1">
                  Bruno Souza
                </Text>
              </Flex>

              <Text fontWeight="bold" mb={isMobile ? 2 : 0} color="#f1f1f1">Corte completo</Text>

              <Text fontWeight="bold" mb={isMobile ? 2 : 0} color="#f1f1f1">R$: 59.90</Text>
            </Flex>
          </ChakraLink>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSRRAuth(async (context) => {
  return {
    props: {},
  };
});

import { Sidebar } from "@/components/sidebar";
import { Flex, useMediaQuery, Heading, Text, Button } from "@chakra-ui/react";
import Head from "next/head";

export default function Plans() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <Head>
        <title>BarberPro - Sua Assinatura Premium</title>
      </Head>
      <Sidebar>
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
            Planos
          </Heading>
        </Flex>

        <Flex
          pb={8}
          maxW="780px"
          w="100%"
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex gap={4} w="100%" direction={isMobile ? "column" : "row"}>
            <Flex
              rounded={2}
              p={2}
              flex={1}
              bg="barber.400"
              flexDirection="column"
            >
              <Heading
                color="gray.100"
                textAlign="center"
                fontSize="2xl"
                mt={2}
                mb={4}
              >
                Plano Grátis
              </Heading>

              <Text fontWeight="medium" ml={2} mb={2} color="gray.100">
                Registrar Cortes
              </Text>
              <Text fontWeight="medium" ml={2} mb={2} color="gray.100">
                Criar apenas 3 Cortes
              </Text>
              <Text fontWeight="medium" ml={2} mb={2} color="gray.100">
                Editar dados do perfil
              </Text>
            </Flex>

            <Flex
              rounded={2}
              p={2}
              flex={1}
              bg="barber.400"
              flexDirection="column"
            >
              <Heading
                color="#4dffb4"
                textAlign="center"
                fontSize="2xl"
                mt={2}
                mb={4}
              >
                Plano Premium
              </Heading>

              <Text fontWeight="medium" ml={2} mb={2} color="gray.100">
                Registrar cortes ilimitados
              </Text>
              <Text fontWeight="medium" ml={2} mb={2} color="gray.100">
                Criar modelos de cortes ilimitados
              </Text>
              <Text fontWeight="medium" ml={2} mb={2} color="gray.100">
                Editar modelos de cortes
              </Text>
              <Text fontWeight="medium" ml={2} mb={2} color="gray.100">
                Editar dados do perfil
              </Text>
              <Text fontWeight="medium" ml={2} mb={2} color="gray.100">
                Receber todas as atualizações
              </Text>
              <Text
                fontWeight="bold"
                fontSize="2xl"
                ml={2}
                mb={2}
                color="#4dffb4"
              >
                R$ 9.99
              </Text>

              <Button
                background="button.cta"
                mb={6}
                color="grey.900"
                size="lg"
                _hover={{ bg: "#ffb13e" }}
              >
                Virar Premium
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

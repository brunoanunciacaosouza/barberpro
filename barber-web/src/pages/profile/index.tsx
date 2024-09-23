import { Sidebar } from "@/components/sidebar";
import { Flex, Heading, Text, Input, Box, Button } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";

export default function Profile() {
  return (
    <>
      <Head>
        <title>MInha Conta - BarberPro</title>
      </Head>

      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            width="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Heading fontSize="3xl" color="orange.900" mt={4} mb={4} mr={4}>
              Minha Conta
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            w="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
            bg="barber.400"
          >
            <Flex direction="column" w="85%" pt={8} pb={8}>
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Nome da barbearia:
              </Text>

              <Input
                w="100%"
                placeholder="Nome da barbearia"
                background="barber.400"
                color="barber.100"
                borderWidth="1px"
                borderColor="barber.100"
                size="lg"
                mb={3}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Endereço:
              </Text>

              <Input
                w="100%"
                placeholder="Endereço da barbearia"
                background="barber.400"
                color="barber.100"
                borderWidth="1px"
                borderColor="barber.100"
                size="lg"
                mb={3}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Plano atual:
              </Text>

              <Flex
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                background="barber.900"
              >
                <Text p={2} fontSize="lg" color="#4dffb4">
                  Plano Grátis
                </Text>

                <Link href="/planos">
                  <Box
                    cursor="pointer"
                    color="white"
                    p={1}
                    pl={2}
                    pr={2}
                    background="#00cd52"
                    rounded={4}
                  >
                    Mudar plano
                  </Box>
                </Link>
              </Flex>

              <Button
                background="button.cta"
                mb={6}
                color="grey.900"
                size="lg"
                _hover={{ bg: "#ffb13e" }}
                onClick={() => {}}
              >
                Salvar
              </Button>

              <Button
               background="transparent"
               mb={6}
               color="red.500"
               borderWidth={2}
               borderColor="red.500"
               size="lg"
               _hover={{ bg: "transparent" }}
               onClick={() => {}}
              >Sair da conta</Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

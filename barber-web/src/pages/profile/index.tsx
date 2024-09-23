import { Sidebar } from "@/components/sidebar";
import { AuthContext } from "@/context/AuthContext";
import { setupApiClient } from "@/services/api";
import { canSRRAuth } from "@/utils/canSSRAuth";
import { Flex, Heading, Text, Input, Box, Button } from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useContext, useState } from "react";

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user?.name);
  const [endereco, setEndereco] = useState(user && user?.endereco);

  async function handleLogout() {
    logoutUser();
  }

  async function handleUpdateUser() {
    if (name === "") {
      return;
    }

    try {
      const apiClient = setupApiClient();
      await apiClient.put("/users", {
        name: name,
        endereco: endereco,
      });


    } catch (error) {
      console.log(error);
    }
  }

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
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                value={endereco}
                onChange={(event) => setEndereco(event.target.value)}
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
                <Text
                  p={2}
                  fontSize="lg"
                  color={premium ? "#ffb13e" : "#4dffb4"}
                >
                  Plano {premium ? "Premium" : "Grátis"}
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
                onClick={handleUpdateUser}
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
                onClick={handleLogout}
              >
                Sair da conta
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSRRAuth(async (context) => {
  try {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get("/me");

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data?.endereco,
    };

    return {
      props: {
        user: user,
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});

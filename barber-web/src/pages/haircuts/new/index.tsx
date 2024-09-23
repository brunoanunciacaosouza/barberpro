import { Sidebar } from "@/components/sidebar";
import { setupApiClient } from "@/services/api";
import { canSRRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Input,
  useMediaQuery,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";

interface NewHaircutProps {
  subscription: boolean;
  count: number;
}

export default function New({ subscription, count }: NewHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  return (
    <>
      <Head>
        <title>BarberPro - Novo modelo de corte</title>
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
            alignItems={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                mr={4}
              >
                <FiChevronLeft size={24} color="barber.900" />
                Voltar
              </Button>
            </Link>
            <Heading
              color="orange.900"
              mb={4}
              mt={4}
              mr={4}
              fontSize={isMobile ? "24px" : "2xl"}
            >
              Modelos de corte
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            bg="barber.400"
            w="100%"
            alignItems="center"
            justifyContent="center"
            direction="column"
            pt={8}
            pb={8}
          >
            <Heading fontSize={isMobile ? "24px" : "2xl"} color="white" mb={4}>
              Cadastrar modelo
            </Heading>

            <Input
              w="90%"
              placeholder="Nome do corte"
              background="gray.900"
              color="barber.100"
              borderWidth="1px"
              borderColor="barber.100"
              size="lg"
              mb={3}
            />

            <Input
              w="90%"
              placeholder="Valor do corte ex:19.90"
              background="gray.900"
              color="barber.100"
              borderWidth="1px"
              borderColor="barber.100"
              size="lg"
              mb={3}
            />

            <Button
              background="button.cta"
              w="90%"
              mb={6}
              color="grey.900"
              size="lg"
              cursor={!subscription && count >= 3 ? "not-allowed" : "pointer"}
              _hover={{ bg: "#ffb13e" }}
            >
              Cadastrar
            </Button>

            {!subscription && count >= 3 && (
              <Flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Text color="barber.100">
                  Você atingiu seu limite de cortes!
                </Text>
                <Link href="/planos" style={{ color: "#4dffb4" }}>
                  Seja premium
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSRRAuth(async (context) => {
  try {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get("/haircut/check");
    const count = await apiClient.get("/haircut/count");

    return {
      props: {
        subscription:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
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

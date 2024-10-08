import { Sidebar } from "@/components/sidebar";
import { setupApiClient } from "@/services/api";
import { canSRRAuth } from "@/utils/canSSRAuth";
import {
  Button,
  Flex,
  Heading,
  Input,
  Link,
  Stack,
  useMediaQuery,
  Text,
  Switch,
} from "@chakra-ui/react";
import Head from "next/head";
import { FiChevronLeft } from "react-icons/fi";
import { HaircutsItem } from ".";
import { ChangeEvent, useState } from "react";
import Router from "next/router";

interface SubscriptionProps {
  id: string;
  status: string;
}

interface EditHaircutProps {
  haircut: HaircutsItem;
  subscription: SubscriptionProps | null;
}

export default function EditHaircut({
  subscription,
  haircut,
}: EditHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [name, setName] = useState(haircut?.name);
  const [price, setPrice] = useState(haircut?.price);
  const [status, setStatus] = useState(haircut?.status);
  const [disableHaircut, setDisableHaircut] = useState(
    haircut?.status ? "disabled" : "enabled"
  );

  function handleChangeStatus(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value === "disabled") {
      setDisableHaircut("enabled");
      setStatus(false);
    } else {
      setDisableHaircut("disabled");
      setStatus(true);
    }
  }

  async function handleUpdate() {
    if (name === "" || price === "") {
      return;
    }

    try {
      const apiClient = setupApiClient();

      await apiClient.put("/haircut", {
        name: name,
        price: Number(price),
        status: status,
        haircut_id: haircut?.id,
      });

      alert("Corte atualizado com sucesso!");

      Router.push("/haircuts");
      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>Editando modelo de corte - BarberPro</title>
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
              Editar corte
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
              Editar corte
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
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              value={price}
              onChange={(event) => setPrice(event.target.value)}
            />

            <Stack
              align="center"
              direction="row"
              justifyContent="space-between"
              mb={6}
            >
              <Text fontWeight="bold" color="barber.100">
                Desativar corte
              </Text>
              <Switch
                colorScheme="red"
                size="lg"
                value={disableHaircut}
                isChecked={disableHaircut === "disabled" ? false : true}
                onChange={(event) => handleChangeStatus(event)}
              />
            </Stack>

            <Button
              background="button.cta"
              w="90%"
              mb={6}
              color="grey.900"
              size="lg"
              _hover={{ bg: "#ffb13e" }}
              cursor={
                subscription?.status === "active" ? "pointer" : "not-allowed"
              }
              onClick={handleUpdate}
            >
              Salvar
            </Button>

            {subscription?.status !== "active" && (
              <Flex
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
                gap={1}
              >
                <Text color="barber.100">
                  Seja premium e tenha todos os acessos liberados!
                </Text>
                <Link href="/planos" style={{ color: "#4dffb4" }}>
                  Assinar
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
  const { id } = context.params;
  try {
    const apiClient = setupApiClient(context);

    const check = await apiClient.get("/haircut/check");

    const response = await apiClient.get("/haircut/detail", {
      params: {
        haircut_id: id,
      },
    });

    if (response.data === null) {
      return {
        redirect: {
          destination: "/haircuts",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      redirect: {
        destination: "/haircuts",
        permanent: false,
      },
    };
  }
});

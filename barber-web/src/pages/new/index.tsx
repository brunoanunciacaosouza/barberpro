import { Sidebar } from "@/components/sidebar";
import { setupApiClient } from "@/services/api";
import { canSRRAuth } from "@/utils/canSSRAuth";
import {
  useMediaQuery,
  Flex,
  Button,
  Heading,
  Input,
  Select,
} from "@chakra-ui/react";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import Router from "next/router";

export interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutsItem[];
}

export default function New({ haircuts }: NewProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [customer, setCustomer] = useState("");
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find((item) => item.id === id);

    setHaircutSelected(haircutItem);
  }

  async function handleRegister() {
    if (customer === "") {
      alert("Preencha o nome do cliente");
      return;
    }

    try {
      const apiClient = setupApiClient();

      await apiClient.post("/schedule", {
        customer: customer,
        haircut_id: haircutSelected?.id,
      });

      Router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>BarberPro - Novo agendamento</title>
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
            <Link href="/dashboard">
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
              Agendamento
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
              Novo agendamento
            </Heading>

            <Input
              w="90%"
              placeholder="Nome do cliente"
              background="gray.900"
              color="barber.100"
              borderWidth="1px"
              borderColor="barber.100"
              size="lg"
              mb={3}
              value={customer}
              onChange={(event) => setCustomer(event.target.value)}
            />

            <Select
              mb={3}
              size="lg"
              w="90%"
              bg="barber.400"
              color="barber.100"
              onChange={(event) => handleChangeSelect(event.target.value)}
            >
              {haircuts?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </Select>

            <Button
              background="button.cta"
              w="90%"
              mb={6}
              color="grey.900"
              size="lg"
              _hover={{ bg: "#ffb13e" }}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSRRAuth(async (context) => {
  try {
    const apiClient = setupApiClient(context);
    const response = await apiClient.get(`/haircuts`, {
      params: {
        status: true,
      },
    });

    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: response.data,
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

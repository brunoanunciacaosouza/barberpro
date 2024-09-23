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
import { setupApiClient } from "@/services/api";
import { canSRRAuth } from "@/utils/canSSRAuth";
import { useState } from "react";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [haircutList, setHaircutList] = useState<HaircutsItem[]>(
    haircuts || []
  );

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

            <Flex
              width="60%"
              alignItems="center"
              justifyContent={isMobile ? "center" : "flex-start"}
              gap={10}
            >
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

          {haircutList.map((haircut) => (
            <Link
              href="/haircuts/123"
              style={{ width: "100%" }}
              key={haircut.id}
            >
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
                <Flex
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IoMdPricetag size={28} color="#fba931" />
                  <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                    {haircut.name}
                  </Text>
                </Flex>

                <Text fontWeight="bold" color="white">
                  Preço: R$ {Number(haircut.price).toFixed(2)}
                </Text>
              </Flex>
            </Link>
          ))}
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

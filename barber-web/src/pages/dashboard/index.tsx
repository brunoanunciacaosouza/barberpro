import { Sidebar } from "@/components/sidebar";
import { setupApiClient } from "@/services/api";
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
import { useState } from "react";
import { IoMdPerson } from "react-icons/io";

interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
}

interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [list, setList] = useState(schedule);

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

            <Link href="/new">
              <Button>Registrar</Button>
            </Link>
          </Flex>

          {list?.map((scheduleItem) => (
            <ChakraLink
              width="100%"
              m={0}
              p={0}
              mt={1}
              bg="transparent"
              style={{ textDecoration: "none" }}
              key={scheduleItem.id}
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
                    {scheduleItem?.customer}
                  </Text>
                </Flex>

                <Text fontWeight="bold" mb={isMobile ? 2 : 0} color="#f1f1f1">
                  {scheduleItem?.haircut?.name}
                </Text>

                <Text fontWeight="bold" mb={isMobile ? 2 : 0} color="#f1f1f1">
                  R$: {Number(scheduleItem?.haircut?.price).toFixed(2)}
                </Text>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSRRAuth(async (context) => {
  try {
    const apiClient = setupApiClient(context);

    const response = await apiClient.get(`/schedule`);

    return {
      props: {
        schedule: response.data,
      },
    };
  } catch (error) {
    console.log(error);

    return {
      props: {
        schedule: [],
      },
    };
  }
});

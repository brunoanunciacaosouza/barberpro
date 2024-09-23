import { Sidebar } from "@/components/sidebar";
import { canSRRAuth } from "@/utils/canSSRAuth";
import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPro - Minha barbearia</title>
      </Head>

      <Sidebar>
        <Flex>
          <Text color="white">Bem vindo ao dashboard</Text>
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

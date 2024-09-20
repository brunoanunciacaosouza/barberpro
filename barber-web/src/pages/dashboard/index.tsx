import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>BarberPro - Minha barbearia</title>
      </Head>
      <Flex>
        <Text>Bem vindo a minha barbearia</Text>
      </Flex>
    </>
  );
}

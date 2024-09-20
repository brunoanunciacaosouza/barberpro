import Head from "next/head";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";

import logoImg from "../../../public/images/logo.svg";
import Link from "next/link";

export default function Login() {
  return (
    <>
      <Head>
        <title>BarberPro - Faça login para acessar</title>
      </Head>
      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              src={logoImg}
              alt="Logo BarberPro"
              width={240}
              quality={100}
              objectFit="fill"
            />
          </Center>

          <Input
            placeholder="email@email.com"
            type="email"
            background="barber.400"
            variant="filled"
            size="lg"
            mb={3}
          />

          <Input
            placeholder="********"
            type="password"
            background="barber.400"
            variant="filled"
            size="lg"
            mb={6}
          />

          <Button
            background="button.cta"
            mb={6}
            color="grey.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
          >
            Acessar
          </Button>

          <Center mt={1} color="gray">
            <Link href="/register">
              <Text cursor="pointer" fontSize={14}>
                Ainda não possui conta? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

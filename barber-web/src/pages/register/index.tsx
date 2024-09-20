import Head from "next/head";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";

import logoImg from "../../../public/images/logo.svg";
import Link from "next/link";
import { useState } from "react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {}

  return (
    <>
      <Head>
        <title>Crie a sua conta no barberPro</title>
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
            placeholder="Nome da barbearia"
            type="text"
            background="barber.400"
            variant="filled"
            size="lg"
            mb={3}
            value={name}
            onChange={({ target }) => setName(target.value)}
          />

          <Input
            placeholder="email@email.com"
            type="email"
            background="barber.400"
            variant="filled"
            size="lg"
            mb={3}
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />

          <Input
            placeholder="********"
            type="password"
            background="barber.400"
            variant="filled"
            size="lg"
            mb={6}
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />

          <Button
            background="button.cta"
            mb={6}
            color="grey.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={handleRegister}
          >
            Cadastrar
          </Button>

          <Center mt={1} color="gray">
            <Link href="/login">
              <Text cursor="pointer" fontSize={14}>
                Já possui conta? <strong>Faça o login</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

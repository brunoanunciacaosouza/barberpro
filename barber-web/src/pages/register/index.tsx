import Head from "next/head";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";

import logoImg from "../../../public/images/logo.svg";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Register() {
  const { signUp } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (name === "" && email === "" && password === "") {
      return;
    }

    await signUp({ name, email, password });
  }

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
            color="barber.100"
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
            color="barber.100"
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
            color="barber.100"
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

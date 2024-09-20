import Head from "next/head";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";

import logoImg from "../../../public/images/logo.svg";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/AuthContext";

export default function Login() {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    await signIn({
      email,
      password,
    });
  }

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
              priority={true}
            />
          </Center>

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
            onClick={handleLogin}
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

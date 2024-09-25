import { ScheduleItem } from "@/pages/dashboard";
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Flex,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FiScissors, FiUser } from "react-icons/fi";

interface ModalInfoProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  data: ScheduleItem;
  finishService: () => Promise<void>;
}

export function ModalInfo({
  isOpen,
  onClose,
  onOpen,
  data,
  finishService,
}: ModalInfoProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent bg="barber.400">
        <ModalHeader color="white">Próximo</ModalHeader>
        <ModalCloseButton color="white" />

        <ModalBody>
          <Flex alignItems="center" mb={3}>
            <FiUser size={28} color="#ffb13e" />
            <Text ml={3} fontSize="2xl" fontWeight="bold" color="white">
              {data?.customer}
            </Text>
          </Flex>

          <Flex alignItems="center" mb={3}>
            <FiScissors size={28} color="#fff" />
            <Text ml={3} fontSize="large" fontWeight="bold" color="white">
              Corte: {data?.haircut?.name}
            </Text>
          </Flex>

          <Flex alignItems="center" mb={3}>
            <FaMoneyBillAlt size={28} color="#46ef75" />
            <Text ml={3} fontSize="large" fontWeight="bold" color="white">
              R$: {Number(data?.haircut?.price).toFixed(2)}
            </Text>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            background="button.cta"
            mb={6}
            color="grey.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={() => finishService()}
          >
            Finalizar Serviço
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

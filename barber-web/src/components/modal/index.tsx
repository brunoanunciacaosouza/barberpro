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
} from "@chakra-ui/react";

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
        <ModalHeader>Próximo</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex alignItems="center">
            <Text color="white">Teste</Text>
          </Flex>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

'use client';

import {
  Button,
  ModalOverlay,
  useDisclosure,
  Modal as ModalNative,
  ModalContent,
  ModalCloseButton,
  ModalHeader,
  ModalBody,
  Text,
  ModalFooter,
} from '@chakra-ui/react';
import { FC, ReactNode } from 'react';

export interface ModalProps {
  children?: ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export const Modal: FC<ModalProps> = ({ children, isOpen, onClose }) => {
  return (
    <ModalNative isCentered isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text>Custom backdrop filters!</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </ModalNative>
  );
};

export const useModalControl = useDisclosure;

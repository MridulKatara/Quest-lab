import React from 'react';
import { Box } from '@chakra-ui/react';
 import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Input, Button } from '@chakra-ui/react';

const AddCardModal = ({ isOpen, onClose, currentlist, name, setName, newCardDescription, setNewCardDescription, handleAddCard }) => {
  return (
    <Box bg="gray.500" >
      <Modal  isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add Card to {currentlist}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input placeholder="Enter card name" value={name} onChange={(e) => setName(e.target.value)} />
          <ModalHeader> Description </ModalHeader>
          <Input placeholder="add details if any" value={newCardDescription} onChange={(e) => setNewCardDescription(e.target.value)} />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleAddCard}>
            Add Card
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </Box>
  );
};

export default AddCardModal;

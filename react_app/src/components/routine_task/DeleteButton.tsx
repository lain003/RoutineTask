import React from 'react';
import { RoutineTaskData } from "../RoutineTaskApp";
import axios from "axios";
import {
    Button, IconButton, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure
} from '@chakra-ui/react'
import {FiTrash2} from "react-icons/fi";

type Props = {
    routine_task: RoutineTaskData,
    syncRoutineTasksWithServer: () => void,
    token: string
}
export const DeleteButton = (props: Props) => {
    const { routine_task, syncRoutineTasksWithServer, token} = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const _clickRemove = () => {
        axios.delete("/routine_tasks/" + routine_task.id,
            { headers: { Authorization: "Token " + token }
            }).then((response) => {
            syncRoutineTasksWithServer();
        });
    };

    return (
        <>
            <IconButton
                icon={<FiTrash2 />}
                isRound={true}
                onClick={onOpen}
                aria-label={routine_task.id.toString()}/>
            <Modal isCentered isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent w='90%'>
                    <ModalHeader>
                        本当に削除しますか?
                    </ModalHeader>
                    <ModalBody>
                        <Text>{routine_task.name}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' onClick={_clickRemove}>
                            はい
                        </Button>
                        <Button mr={3} onClick={onClose}>いいえ</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default DeleteButton;
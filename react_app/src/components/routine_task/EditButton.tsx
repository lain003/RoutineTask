import React, { MouseEvent, useState } from 'react';
import { RoutineTaskData } from "../RoutineTaskApp";
import axios from "axios";
import {
    Button, FormControl,
    IconButton, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure
} from '@chakra-ui/react'
import {FiEdit} from "react-icons/fi";

type Props = {
    routine_task: RoutineTaskData,
    syncRoutineTasksWithServer: () => void,
    token: string
}
export const EditButton = (props: Props) => {
    const { routine_task, syncRoutineTasksWithServer, token } = props;
    const changeName = (e: MouseEvent<HTMLButtonElement>) => {
        axios.put("/routine_tasks/" + routine_task.id,
            { name: editText }, { headers: { Authorization: "Token " + token }
            }).then((response) => {
            syncRoutineTasksWithServer();
        });

        onCloseEdit();
    };

    const { isOpen: isOpenEdit, onOpen: onOpenEdit, onClose: onCloseEdit } = useDisclosure()
    const initialRefEdit = React.useRef<any>()
    const [editText, setEditText] = useState('');

    return (
        <>
            <IconButton
                icon={<FiEdit />}
                isRound={true}
                onClick={onOpenEdit}
                aria-label={routine_task.id.toString()}/>
            <Modal
                isCentered
                initialFocusRef={initialRefEdit}
                isOpen={isOpenEdit}
                onClose={onCloseEdit}
            >
                <ModalOverlay />
                <ModalContent w='90%'>
                    <ModalHeader>変更 </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Input ref={initialRefEdit} placeholder='変更' defaultValue={routine_task.name} onChange={(e) => setEditText(e.target.value)} onFocus={(e) => setEditText(e.target.value)}/>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onCloseEdit}>キャンセル</Button>
                        <Button colorScheme='blue'  onClick={changeName}>
                            変更
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}
export default EditButton;
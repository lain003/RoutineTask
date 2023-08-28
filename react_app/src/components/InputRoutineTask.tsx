import React, { useState } from 'react';
import { RoutineTaskData } from "./RoutineTaskApp";
import axios from "axios";
import {
    Button,
    HStack,
    Input
} from '@chakra-ui/react'
type Props = {
    addRoutineTask: (routine_task: RoutineTaskData) => void,
    token: string
}
export const InputRoutineTask = (props: Props) => {
    const [text, setText] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!text.match(/\S/g)) return;

        axios.post("/routine_tasks",
            { name: text }, { headers: { Authorization: "Token " + props.token }
        }).then((response) => {
            props.addRoutineTask(new RoutineTaskData(response.data.id, response.data.name));
            setText('');
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <HStack mt='4' mb='4'>
                <Input
                    type="text"
                    placeholder="Enter to add"
                    value={text}
                    onChange={handleChange}
                />
                <Button
                    colorScheme='blue'
                    px='8'
                    pl='10'
                    pr='10'
                    h='46'
                    type='submit'
                >
                    追加
                </Button>
            </HStack>
        </form>
    );
}
export default InputRoutineTask;
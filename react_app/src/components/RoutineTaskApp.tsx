import React, {useEffect, useState} from 'react';
import {InputRoutineTask} from './InputRoutineTask'
import {RoutineTask} from './routine_task/RoutineTask'
import axios from "axios";
import {
    Heading, IconButton, StackDivider, useColorMode, VStack
} from '@chakra-ui/react'
import { FaSun, FaMoon,} from 'react-icons/fa'
export class RoutineTaskData {
    id: number
    name: string

    constructor(id: number, name: string) {
        this.id = id
        this.name = name
    }
}

let token = "";
// StrictModeだと２回useEffectが走るための対策
let is_request_create_user = false

export const RoutineTaskApp = () => {
    const [routine_tasks, setRoutineTasks] = useState<RoutineTaskData[]>([]);

    const syncRoutineTasksWithServer = () => {
        if (token){
            axios.get("/routine_tasks",{
                headers: {
                    Authorization: `Token ${token}`
                }
            }).then((response) => {
                const routine_tasks = response.data.map((value: any) => {
                    return new RoutineTaskData(value.id, value.name);
                })
                setRoutineTasks(routine_tasks);
            });
        }
    }

    const getUserToken = async () => {
        let _token = localStorage.getItem("token");
        if (!_token && !is_request_create_user){
            is_request_create_user = true;
            const response = await axios.post("/users");
            _token = response.data.token;
            localStorage.setItem("token", _token || "");
            is_request_create_user = false;
        }
        token = _token || ""
    };

    useEffect(() => {
        getUserToken().then(() => {
            syncRoutineTasksWithServer();
        })
    }, [])

    const addRoutineTask = (routine_task: RoutineTaskData) => {
        setRoutineTasks([...routine_tasks, routine_task]);
    };

    const { colorMode, toggleColorMode } = useColorMode();

    return (
        <VStack p={4} minH='100vh' pb={28}>
            <IconButton
                icon={colorMode === 'light' ? <FaSun /> : <FaMoon />}
                size='md'
                alignSelf='flex-end'
                onClick={toggleColorMode}
                aria-label='switch_light'
            />
            <Heading
                p='5'
                fontWeight='extrabold'
                size='xl'
                bgGradient='linear(to-l, teal.300, blue.500)'
                bgClip='text'
            >
                タスク管理
            </Heading>
            <InputRoutineTask addRoutineTask={addRoutineTask} token={token}/>
            <VStack
                divider={<StackDivider />}
                borderColor='gray.100'
                borderWidth='2px'
                p='5'
                borderRadius='lg'
                w='100%'
                maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '30vw' }}
                alignItems='stretch'
            >
                {routine_tasks.map(routine_task => (
                    <RoutineTask
                        key={routine_task.id}
                        routine_task={routine_task}
                        syncRoutineTasksWithServer={syncRoutineTasksWithServer}
                        token={token}
                    />
                ))}
            </VStack>
        </VStack>
    );
}
export default RoutineTaskApp;
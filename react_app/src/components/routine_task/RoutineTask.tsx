import React, { useState } from 'react';
import {RoutineTaskData} from "../RoutineTaskApp";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import {
    HStack,
    Text
} from "@chakra-ui/react";
type Props = {
    routine_task: RoutineTaskData,
    syncRoutineTasksWithServer: () => void,
    token: string
}
export const RoutineTask = (props: Props) => {
    // stateを作成
    const { routine_task, syncRoutineTasksWithServer, token } = props;

    return (
        <HStack key={routine_task.id}>
            <Text
                w='100%'
                p='8px'
                borderRadius='lg'
                cursor='pointer'>
                {routine_task.name}
            </Text>

            <DeleteButton
                routine_task={routine_task}
                syncRoutineTasksWithServer={syncRoutineTasksWithServer}
                token={token}
            />

            <EditButton
                routine_task={routine_task}
                syncRoutineTasksWithServer={syncRoutineTasksWithServer}
                token={token}
            />
        </HStack>
    );
}
export default RoutineTask;
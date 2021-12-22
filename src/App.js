import React, { useState } from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';
import styled, { ThemeProvider } from 'styled-components/native';
import { theme } from './theme';
import Input from './components/Input';
import Task from './components/Task';

const Container = styled.SafeAreaView`
    flex: 1;
    background-color: ${({ theme }) => theme.background};
    align-items: center;
    justify-content: flex-start;
`;

const Title = styled.Text`
    font-size: 40px;
    font-weight: 600;
    color: ${({ theme }) => theme.main}
    align-self: flex-start;
    margin: 20px;
`;

const List = styled.ScrollView`
    flex: 1;
    width: ${({ width }) => width - 40}px;
`;

export default function App() {
    const [newTask, setNewTask] = useState('');

    const [tasks, setTasks] = useState({
        '1': { id: '1', text: 'First', 'completed': false },
        '2': { id: '2', text: 'Second', 'completed': true },
        '3': { id: '3', text: 'Third', 'completed': false },
        '4': { id: '4', text: 'Fourth', 'completed': false },
    });

    const _addTask = () => {
        const ID = Date.now().toString();
        const newTaskObject = {
            [ID]: { id: ID, text: newTask, completed: false },
        };
        setNewTask('');
        setTasks({ ...tasks, ...newTaskObject });
    }

    const _handleTextChange = text => {
        setNewTask(text);
    }

    const width = useWindowDimensions().width;



    return (
        <ThemeProvider theme={theme}>
            <Container>
                <StatusBar 
                    barStyle='light-content'
                    backgroundColor={theme.background}
                />
                <Title>TODO List</Title>
                <Input 
                    placeholder="+ Add a Task" 
                    value={newTask}
                    onChangeText={_handleTextChange}
                    onSubmitEditing={_addTask}
                />

                <List width={width}>
                    {Object.values(tasks).reverse().map(item => (
                        <Task key={item.id} text={item.text} />
                    ))}
                </List>
            </Container>
        </ThemeProvider>
    );
}
import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const TaskList = styled.div`
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    flex-basis: 143px;
    min-width: 143px;
    min-height: 200px;
    height: 290px;
    margin-left: ${props => (props.index === 0 ? '0px' : '2px')};
    margin-right: 2px;
    overflow-y: scroll;
    padding: 6px;
    transition: background-color 0.5s ease;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : '#efefef')};
`;


export default class ContentColumn extends React.Component {
    render() {
        return (
                <Droppable 
                    droppableId={this.props.elemId} 
                    isDropDisabled={this.props.isDropDisabled}
                >
                    {(provided, snapshot) => (
                        <TaskList
                            index={this.props.index}
                            innerRef={provided.innerRef}
                            {...provided.droppableProps}
                            isDraggingOver = {snapshot.isDraggingOver}
                        >
                            {this.props.tasks.map((task, index) => <Task key={task.id} task={task} index={index} />)}
                            {provided.placeholder}
                        </TaskList>
                    )}
                </Droppable>
        );
    }

}
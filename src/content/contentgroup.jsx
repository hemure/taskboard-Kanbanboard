import React from 'react';
import styled from 'styled-components';
import ContentColumn from './contentcolumn';


const ColumnList = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 2;
    flex-basis: ${props => ((props.numOfCols * 157) + 'px')};

    min-width: ${props => ((props.numOfCols * 157) + 'px')};
    margin-top:0;
    margin-left:2px;
    margin-rigth:2px;
`;

export default class ContentGroup extends React.Component {

    render() {
        return (
            <ColumnList numOfCols={this.props.numOfCols}>
                {this.props.columnOrder.map((columnId, index) => {
                    //Adding a column
                    const column = this.props.allColumns.filter(column => column.id === columnId)[0];
                    const tasks = this.props.tasks.filter(task => task.column === column.taskColumn && task.lane === this.props.laneId)
                                    .sort((a,b) => a.indexInColumn - b.indexInColumn);
                    const columnElemId = this.props.laneId + '|' + column.elemId;
                    const isDropDisabled = (this.props.validDroppables.filter(elem => elem === columnElemId).length === 0);
                    return <ContentColumn 
                                key={this.props.laneId + '|' + column.elemId}
                                elemId ={columnElemId}
                                column={column} 
                                tasks={tasks}
                                index={index} 
                                type={this.props.laneId}
                                isDropDisabled={isDropDisabled}
                                />;
                })}
            </ColumnList>
        )   
    }
}


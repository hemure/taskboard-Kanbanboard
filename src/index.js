import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import '@atlaskit/css-reset';
import { DragDropContext } from 'react-beautiful-dnd';
import boardLayout from './boardlayout';
import dataProxy from './dataproxy'
import ContentColumn from './content/contentcolumn';
import ContentGroup from './content/contentgroup';
import HeaderGroup from './header/headergroup';
import HeaderColumn from './header/headercolumn';


const Board = styled.div`
    padding: 4px;
    border: 1px solid darkblue;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    background-color: lightblue;
    /*height: 300px;*/
    flex: 1;
    @supports (-ms-ime-align:auto){
        display: -ms-flexbox;
        -ms-flex-direction: column;
        -ms-flex: 1;
    }
`;

const BoardTitle = styled.h1`
    display: flex;
    justify-content: center;
    margin-top:0px;
    margin-bottom:4px;
    padding-bottom:0px;
    color: darkblue;
`;

const HeaderLane = styled.div`
    display: flex;
    flex-direction: row;
    flex: 1;
`;

const Swimlane = styled.div`
    display: flex;
    flex-direction: row;
    height: 300px;
    width:100%;
    flex: 1;
    margin-top: ${props => (props.index > 0 ? '4px' : '0')};
    border-top: ${props => (props.index > 0 ? '4px solid green' : '0')};
    padding-top: 4px;
`;

const SwimlaneTitle = styled.div`
    position: absolute;
    width:280px;
    height:45;
    border-radius: 0.3rem;
    text-align: center;
    font-weight: bold;
    margin-top: 298px;
    margin-left: 0px;
    padding: 6px;
    border: 1px solid black;
    background-color: lightgreen;
    transform: rotate(270deg);
    transform-origin: left top;
`;


class App extends React.Component {

    constructor(){
        super();
        this.state = boardLayout;
        const dp = new dataProxy();
        this.state.tasks = dp.data;
        this.onDragEnd = this.onDragEnd.bind(this);
        this.onDragStart = this.onDragStart.bind(this);

        // Creating a fast lookup array of all column for use in event handling
         let allColumns = [];
         let elemIdLookUpTable = {};
         let elemId = '';
         let subCols = null;
         let groupId = 0;
         const cols = { ...this.state.columns};
         for (let key in cols) {
            if (cols.hasOwnProperty(key)) {
                if(cols[key].type === 'col'){
                    cols[key].elemId = cols[key].id;
                    cols[key].groupId = '';
                    allColumns.push(cols[key])
                    elemIdLookUpTable[cols[key].id] = cols[key].id;
                } else {
                    subCols = cols[key].columns;
                    groupId = cols[key].id;
                    for(let k in subCols){
                        elemId = groupId + '_' + subCols[k].id;
                        subCols[k].elemId = elemId;
                        allColumns.push(subCols[k])
                        elemIdLookUpTable[subCols[k].id] = elemId;
                    }
                }
            }
        };
        this.state.allColumns = allColumns;

        //Creating an object with  array of allowed dropColums
        let allowedDropCols = {};
        for(let i=0; i<allColumns.length; i++){
            allowedDropCols[allColumns[i].elemId] = allColumns[i].allowedDragToColumns;
        }
        this.state.allowedDragToColumns = allowedDropCols;
        this.state.elemIdLookUpTable = elemIdLookUpTable;
        this.state.validDroppables = [];
    }

    onDragStart = (start) => {
        const arrIds = start.source.droppableId.split('|');
        const droppableId = arrIds[1];
        const allowedColumns = this.state.allColumns.filter(col => droppableId === col.elemId)[0].allowedDragToColumns
                .map(elem =>  arrIds[0] + '|' + this.state.elemIdLookUpTable[elem]);
        this.setState({validDroppables: allowedColumns});
    }

    onDragEnd = (result) => {
        //console.log(result);
        const {destination, source, draggableId } = result;

        // 1. Checking that an update is need
        if(!destination){
            // Dropped outside context
            return;
        }
        if(
            destination.droppableId === source.droppableId && 
            destination.index === source.index
        ){
            //Dropped at start location
            return;
        }


        //2. Fetching the column objects
        //      Format of element ids are: laneId|[GroupId_]ColumnId
        const movedWithinColumn = (source.droppableId === destination.droppableId) ? true : false;
        const laneId = source.droppableId.split('|')[0];
        const sourceColumn = this.state.allColumns.filter(col => source.droppableId.split('|')[1] === col.elemId)[0];
        const destinationColumn = (movedWithinColumn) ? sourceColumn : this.state.allColumns.filter(col => destination.droppableId.split('|')[1] === col.elemId)[0];


        //3. Not only the dragged task must be update.
        //   If the tasks is dragged from one column to another, then:
        //     In the source column, index values must be set on all tasks where index > the originalindex of the dragged.
        //     In the destination column, indexes must be update where index > the new index of the dragged.
        //   If the task is dragged within the same column, then:
        //     Indexes must be set to index-1 where index > original index AND < new index.
        // To do this, new arrays are created.
        let newData = [];
        let sourceColumnTasks = [];
        let destColumnTasks = [];
        let otherTasks = [];
        let movedTask = null;
        
        const sourceIndex = source.index;
        const destIndex = destination.index;
        if(movedWithinColumn){
            sourceColumnTasks = this.state.tasks.filter(task => task.column === sourceColumn.taskColumn && task.lane === laneId)
                .map((task) => {
                    if(destIndex > sourceIndex){
                        if(task.indexInColumn >= sourceIndex && task.indexInColumn <= destIndex){
                            task.indexInColumn -= 1;
                        }
                    } else {
                        if(task.indexInColumn <= sourceIndex && task.indexInColumn >= destIndex){
                            task.indexInColumn += 1;
                        }
                    }
                    task.isDirty = 1;
                    return task;
                });
            otherTasks = this.state.tasks.filter(task => task.column !== sourceColumn.taskColumn || task.lane !== laneId);

            //4. Fetching the task that has been moved and updating column and index values
            movedTask = sourceColumnTasks.filter(task => draggableId === task.id)[0];
            movedTask.indexInColumn = destination.index;

            newData = [...otherTasks, ...sourceColumnTasks];

        } else 
        { // drag between 2 columns
            sourceColumnTasks = this.state.tasks.filter(task => task.column === sourceColumn.taskColumn && task.lane === laneId)
                .map((task) => {
                    if(task.indexInColumn >= sourceIndex){
                        task.indexInColumn -= 1;
                        task.isDirty = 1;
                    }
                    return task;
                })
                .sort((a,b) => a.indexInColumn - b.indexInColumn);
            destColumnTasks = this.state.tasks.filter(task => task.column === destinationColumn.taskColumn && task.lane === laneId)
                .map((task) => {
                    if(task.indexInColumn >= destIndex){
                        task.indexInColumn += 1;
                        task.isDirty = 1;
                    }
                    return task;
                })
                .sort((a,b) => a.indexInColumn - b.indexInColumn);

            otherTasks = this.state.tasks.filter(task => (task.column !== sourceColumn.taskColumn && task.column !== destinationColumn.taskColumn) || task.lane !== laneId);

            //4. Fetching the task that has been moved and moving it from source to column lists
            movedTask = sourceColumnTasks.filter(task => draggableId === task.id)[0];
            movedTask.indexInColumn = destination.index;
            movedTask.column = destinationColumn.taskColumn;
            sourceColumnTasks.splice(sourceIndex,1);
            destColumnTasks.splice(destIndex,0,movedTask);

            newData = [...otherTasks, ...sourceColumnTasks, ...destColumnTasks];
        }

        //6. Update state
        this.setState(Object.assign([this.state],{tasks: newData}));
        //console.log(newData);
    }

    RenderSwinlaneTitlePlaceHolder = () => {
        if(this.state.swimlanes.length > 1)
            return (
            <div style={{
                width: '36px',
                position: 'inline',
            }}
            ></div>)
        else
            return
    }

    RenderSwimlaneTitle = (title) => {
        return (
            <SwimlaneTitle>{title}</SwimlaneTitle>
        )
    }


    render() {
        return (
            <Board>
                <BoardTitle>{this.state.title}</BoardTitle>
                <HeaderLane>
                    {this.RenderSwinlaneTitlePlaceHolder()}
                    {
                        this.state.columnOrder.map((columnId) => {
                            //Checking if this item is a single column or a column group
                            if(this.state.columns[columnId].type === 'group'){
                                //Adding a column group
                                const group = this.state.columns[columnId];
                                return <HeaderGroup 
                                        key={columnId} 
                                        title={group.title} 
                                        group={group} 
                                        />;
                            } 
                            else {
                                //Adding a column
                                const column0 = this.state.columns[columnId];
                                return <HeaderColumn 
                                        key={column0.id} 
                                        title={column0.title} 
                                        />;
                                }
                        })
                    }
                </HeaderLane>
                <DragDropContext onDragEnd={this.onDragEnd} onDragStart={this.onDragStart}>
                    {this.state.swimlanes.map((lane, index) => {
                        return (
                        <Swimlane 
                            key={lane.id} 
                            index={index}
                        >
                        {this.RenderSwinlaneTitlePlaceHolder()}
                        {this.RenderSwimlaneTitle(lane.title)}
                        {this.state.columnOrder.map((columnId) => {
                            //Checking if this item is a single column or a column group
                            if(this.state.columns[columnId].type === 'group'){
                                //Adding a column group
                                const group = this.state.columns[columnId];
                                const key = lane.id + '|' + columnId;
                                return <ContentGroup 
                                        key={key}
                                        laneId={lane.id}
                                        columnOrder={group.columnOrder} 
                                        tasks={this.state.tasks}
                                        allColumns={this.state.allColumns}
                                        numOfCols={group.columnOrder.length}
                                        validDroppables={this.state.validDroppables}
                                        />
                            } else {
                                //Adding a column
                                const column2 = this.state.allColumns.filter(column => column.id === columnId)[0]
                                const key = lane.id + '|' + column2.elemId;
                                const tasks2 = this.state.tasks.filter(task => task.column === column2.taskColumn && task.lane === lane.id)
                                    .sort((a,b) => a.indexInColumn - b.indexInColumn);
                                const isDropDisabled =  (this.state.validDroppables.filter(elem => elem === key).length === 0)
                                return <ContentColumn 
                                        key={key} 
                                        elemId={key} 
                                        column={column2} 
                                        tasks={tasks2} 
                                        group={false} 
                                        isDropDisabled={isDropDisabled}
                                        />; 
                            }
                        }
                        )}
                    </Swimlane>)
                    })}
                </DragDropContext>
            </Board>
        )
    }

}


ReactDOM.render(<App />, document.getElementById('root'));

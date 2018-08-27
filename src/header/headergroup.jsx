import React from 'react';
import styled from 'styled-components';
import HeaderSubColumn from './headersubcolumn';

const GroupTitle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex-grow:2;
    flex-basis: ${props => ((props.numOfElems * 157) + 'px')};

    min-width: ${props => ((props.numOfElems * 157) + 'px')};
    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 2px;
    background-color: #efefef;
    border-radius: 4px;
`;

const GroupTitleText = styled.div`
    padding: 0;
    font-size: 1.4em;
    font-weight: bold;
    display: flex;
    justify-content: center;
`;

const ColumnTitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin:0;
    padding:0;
    font-size:0.8em;
`;

export default class HeaderGroup extends React.Component{

    render() {
        return (
            <GroupTitle numOfElems={this.props.group.columnOrder.length}>
                <GroupTitleText>{this.props.title}</GroupTitleText>
                <ColumnTitleContainer>
                    {this.props.group.columnOrder.map((columnId) => {
                        //Adding a column
                        const column = this.props.group.columns[columnId];
                        const groupId= this.props.group.id;
                        const colId = (column.id.indexOf('_')>1) ? column.id :  groupId + '_' + column.id;
                        const key = 'header_' + colId;
                        return <HeaderSubColumn key={key} title={column.title}/>;
                    })}
                </ColumnTitleContainer>
            </GroupTitle>    
        )

    }
}
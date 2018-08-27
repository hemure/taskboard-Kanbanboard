import React from 'react';
import styled from 'styled-components';

const ColumnTitle = styled.div`
    display: flex;
    justify-content: center;
    flex-basis: 157px;
    flex-grow: 1;

    min-width: 157px;

    font-size: 1.4em;
    font-weight: bold;

    margin-left: 2px;
    margin-right: 2px;
    margin-bottom: 2px;
    background-color: #efefef;
    border-radius: 4px;
`;

export default class HeaderColumn extends React.Component{

    render() {
        return (
            <ColumnTitle>
                {this.props.title}
            </ColumnTitle>
        )
    }
}

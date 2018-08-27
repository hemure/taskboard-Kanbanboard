import React from 'react';
import styled from 'styled-components';

const SubColumnTitle = styled.div`
    font-size: 1.4em;
    color: gray;
    display: flex;
    justify-content: center;
    min-width: 157px;
    flex-grow: 3;
    flex-basis: 157px;
`;

/*const SubColumnTitleHolder = styled.div`
    font-size: 1.4em;
    color: gray;
    display: flex;
    justify-content: center;
    min-width: 157px;
    flex-grow: 2;
    flex-basis: 157px;
`;*/

export default class HeaderSubColumn extends React.Component{

    render() {
        return (
            <SubColumnTitle>
                {this.props.title}
            </SubColumnTitle>
        )

    }
}

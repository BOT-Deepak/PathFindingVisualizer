import React from "react";
import styled, { keyframes } from "styled-components";

export default function SideSwipe(props) {

    return <Wrapper>{props.text}</Wrapper>;
}

const animation = keyframes`
    0% { color: black }
    25% { color: floralwhite }
`

const Wrapper = styled.div`
    display: inline-block;
    animation-name: ${animation};
    animation-duration: 4s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
`
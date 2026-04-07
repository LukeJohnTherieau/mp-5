"use client";

import { Dispatch, SetStateAction } from 'react';
import sendUrlToClipboard from "@/lib/sendUrlToClipboard";
import styled from "styled-components";


const StyledDiv = styled.div`
    width: 100%;
    align-items: center;
    background-color: yellow;
    // display: flex;
    // flex-direction: row;
`;




export default function Alias({domainUrl, alias, setAlias, hideCopy}:{domainUrl:string, alias:string, setAlias:Dispatch<SetStateAction<string>>, hideCopy:boolean}) {
    return (
        <StyledDiv>
            <p>{domainUrl}/</p>
            <input
                placeholder = "your-custom-alias"
                type = "text"
                value = {alias}
                onChange = {(e) => setAlias(e.target.value)}
                required
            />
            <button type="button" onClick={() => sendUrlToClipboard(domainUrl, alias)} hidden = {hideCopy}>copy</button>
        </StyledDiv>
    );
}

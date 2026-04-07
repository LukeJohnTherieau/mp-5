"use client";

import {useState} from "react";
import createNewAlias from "@/lib/createNewAlias";
import sendUrlToClipboard from "@/lib/sendUrlToClipboard";
import styled from "styled-components";
import {NewAliasProps} from "@/types";
import {useSearchParams} from 'next/navigation';


const StyledForm = styled.form`
    width: 50%;
    text-align: center;
    display: flex;
    flex-direction: column;
    background-color: white;
    padding: 1%;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 15px 15px -5px rgba(0, 0, 0, 0.1);
    @media  screen and (max-width: 1000px) {
        width: 90%;
    }        
`;

const StyledInputGroup = styled.div`
    text-align: left;
    display: flex;
    flex-direction: column;
    padding: 2%;
`;

const StyledSubmitButton = styled.button`
    display: block;
    width: 100%;
    background-color: blue;
    color: white;
    border: none;
    padding: 10px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
    font-size: calc(4px + 2vw);
`;

const StyledCopyButton = styled.button`
    background-color: gray;
    color: white;
    font-weight: bold;
    border: none;
    margin: 0% 1%;
    font-size: calc(2px + 2vw);
    padding: 1%;
    border-radius: 5px;
    cursor: pointer;
`;

const StyledTitleGroup = styled.div`
    padding: 2%;
    text-align: center;
`;

const StyledAliasDiv = styled.div`
    width: 100%;
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: left;
`;

const StyledP = styled.p`
    color: gray;
    padding: 0.5%;
    font-size: calc(8px + 1vw);
`;

const StyledMessage = styled.p<{ $successfulSubmission?: boolean; }>`
    font-size: calc(12px + 1vw);
    color: green;
    padding: 1%;
    font-weight: bold;
    color: ${(props) => {
        if (props.$successfulSubmission){
            return "green";
        } else {
            return "red";
        }
    }};
`;

const StyledInput = styled.input`
    font-size: calc(12px + 1vw);
    padding: 1%;
`;

const StyledLabel = styled.label`
    font-size: calc(4px + 1.2vw);
    padding: 1%;
`;


export default function NewAliasForm() {
    const searchParams = useSearchParams();
    const [url, setURL] = useState("");
    const [alias, setAlias] = useState("");
    const [hideCopy, setHideCopy] = useState(true);
    const [submissionMetadata, setSubmissionMetadata] = useState<NewAliasProps | null>(null);
    const domainUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const error = searchParams.get("error");

    
    return (
        <StyledForm
            onSubmit={(e) => {
                e.preventDefault();
                createNewAlias(url, alias).then((newSubmissionMetadata) => {
                    setSubmissionMetadata(newSubmissionMetadata);
                    if (submissionMetadata?.successfulSubmission) {
                        setHideCopy(true);
                    } else {
                        setHideCopy(false);
                    }
                }
                )
                    .catch((err) => console.error(err));
            }}
        >
            <StyledTitleGroup>
                <h1>URL Shortener</h1>
                <StyledP>Enter a URL and a custom alias to create your shortened URL!</StyledP>
            </StyledTitleGroup>
            <StyledInputGroup>
                <StyledLabel>URL</StyledLabel>
                <StyledInput
                    value={url}
                    type="url"
                    onChange={(e) => setURL(e.target.value)}
                    required
                    placeholder="https://www.google.com/"
                />
            </StyledInputGroup>
            <StyledInputGroup>
                <StyledLabel>Custom Alias</StyledLabel>
                <StyledAliasDiv>
                    <StyledP>{domainUrl}/</StyledP>
                    <StyledInput
                        placeholder = "your-custom-alias"
                        type = "text"
                        value = {alias}
                        onChange = {(e) => setAlias(e.target.value)}
                        required
                    />
                    <StyledCopyButton type="button" onClick={() => sendUrlToClipboard(domainUrl, alias)} hidden = {hideCopy}>Copy</StyledCopyButton>
                </StyledAliasDiv>
            </StyledInputGroup>
            <div className="w-full flex justify-center">
                <StyledSubmitButton type="submit">Shorten URL and Save Alias</StyledSubmitButton>
            </div>
            <StyledMessage $successfulSubmission={submissionMetadata?.successfulSubmission} hidden={submissionMetadata?.message == ""}>{submissionMetadata?.message}{error}</StyledMessage>
        </StyledForm>
    );
}

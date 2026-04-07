"use client";

import {useState} from "react";
import createNewAlias from "@/lib/createNewAlias";
import Alias from "@/components/Alias";
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
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
`;

const StyledTitleGroup = styled.div`
    padding: 2%;
    text-align: center;
`;


export default function NewAliasForm() {
    const [url, setURL] = useState("");
    const [alias, setAlias] = useState("");
    const [hideCopy, setHideCopy] = useState(true);
    const [submissionMetadata, setSubmissionMetadata] = useState<NewAliasProps | null>(null);
    const domainUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "";
    const searchParams = useSearchParams();
    const error = searchParams.get('error');

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
                <p>Enter a URL and a custom alias to create your shortened URL!</p>
            </StyledTitleGroup>
            <StyledInputGroup>
                <label>URL</label>
                <input
                    value={url}
                    type="url"
                    onChange={(e) => setURL(e.target.value)}
                    required
                    placeholder="https://www.google.com/"
                />
            </StyledInputGroup>
            <StyledInputGroup>
                <label>Custom Alias</label>
                <Alias domainUrl={domainUrl} alias={alias} setAlias={setAlias} hideCopy={hideCopy} />
            </StyledInputGroup>
            <div className="w-full flex justify-center">
                <StyledSubmitButton type="submit">Shorten URL and Save Alias</StyledSubmitButton>
            </div>
            <p hidden={submissionMetadata?.message == ""}>{submissionMetadata?.message}</p>
        </StyledForm>
    );
}

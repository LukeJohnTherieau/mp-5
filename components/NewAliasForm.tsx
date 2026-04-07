"use client";

import {useState} from "react";
import createNewAlias from "@/lib/createNewAlias";
import Alias  from "@/components/Alias";
import styled from "styled-components";
import {NewAliasProps} from "@/types";


const StyledForm = styled.form`
    width: 50%;
    background-color: green;
    text-align: center;
`;


export default function NewAliasForm() {
    const [url, setURL] = useState("");
    const [alias, setAlias] = useState("");
    const [hideCopy, setHideCopy] = useState(true);
    const [submissionMetadata, setSubmissionMetadata] = useState<NewAliasProps | null>(null);
    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? "";


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
            <input
                value = {url}
                type = "url"
                onChange = {(e) => setURL(e.target.value)}
                required
            />
            <Alias domainUrl = {domainUrl} alias = {alias} setAlias={setAlias} hideCopy = {hideCopy}/>
            <div className = "w-full flex justify-center">
                <button type="submit">Create</button>
            </div>
            <p hidden={submissionMetadata?.message == ""}>{submissionMetadata?.message}</p>
        </StyledForm>
    );
}

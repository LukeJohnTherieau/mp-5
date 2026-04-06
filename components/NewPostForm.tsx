"use client";

import {useState, useRef} from "react";
import createNewAlias from "@/lib/createNewAlias";
import sendUrlToClipboard from "@/lib/sendUrlToClipboard"; 


export default function NewPostForm() {
    const [url, setURL] = useState("");
    const [alias, setAlias] = useState("");
    const domainUrl = process.env.NEXT_PUBLIC_DOMAIN_URL ?? "";


    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createNewAlias(url, alias);
                }}
            >
                <input
                    value = {url}
                    type = "url"
                    onChange = {(e) => setURL(e.target.value)}
                    required
                />
                <input
                    placeholder = "your-custom-alias"
                    type = "text"
                    value = {alias}
                    onChange = {(e) => setAlias(e.target.value)}
                    required
                />
                <div className = "w-full flex justify-center">
                    <button type="submit">Create</button>
                </div>

            </form>
            <p>{domainUrl}/{alias}</p>
            <button onClick={() => sendUrlToClipboard(domainUrl, alias)}>copy</button>
        </div>
    );
}

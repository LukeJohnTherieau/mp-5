'use client';
import NewAliasForm from "@/components/NewAliasForm";
import styled from "styled-components";
import { Suspense } from 'react';


const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;   
    min-height: 100vh;
    background-color: #ADD8E6;
    font-family: Arial, sans-serif
`;


export default function Home() {
  return (
    <StyledWrapper>
      <Suspense fallback={<p>Loading potential errors...</p>}>
       <NewAliasForm />
      </Suspense>
    </StyledWrapper>
  );
}
'use client';
import NewAliasForm from "@/components/NewAliasForm";
import styled from "styled-components";
import { useSearchParams } from 'next/navigation';


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
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  return (
    <StyledWrapper>


      <p>{error}</p>
      <NewAliasForm />
    </StyledWrapper>
  );
}
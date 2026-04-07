'use client';
import NewAliasForm from "@/components/NewAliasForm";
import styled from "styled-components";
import { useSearchParams } from 'next/navigation';


const StyledWrapper = styled.div`
    margin: 0 auto;
    width: 80vw;
    min-height: 100vh;
    background-color: red;
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
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
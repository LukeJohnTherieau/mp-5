'use client';
import NewAliasForm from "@/components/NewAliasForm";
import styled from "styled-components";
import { useSearchParams } from 'next/navigation';

const StyledDiv = styled.div`
    background-color: red;
    display: inline;
    text-align: center;
    wdith: 50%;
`;


export default function Home() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  return (
    <StyledDiv>
      <p>{error}</p>
      <NewAliasForm />
    </StyledDiv>
  );
}
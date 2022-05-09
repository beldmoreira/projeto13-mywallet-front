import styled from "styled-components";

const Greeting = styled.span`
font-family: Raleway;
font-size: 26px;
font-weight: 700;
line-height: 31px;
letter-spacing: 0em;

text-align: left;
align-self: flex-start;
margin-top: 25px;
margin-bottom: 40px;
`;
const Container = styled.div`
width: 100%;
min-height: ${(props) => props.minHeight || 'initial'};
background: ${(props) => props.background || 'initial'};
display: flex;
flex-direction: column;
justify-content: ${(props) => props.justifyContent || 'initial'};
align-items: stretch;
align-self: ${(props) => props.alignSelf || 'initial'};
margin: ${(props) => props.margin || '0px'};
padding: ${(props) => props.padding || '0px'};
border-radius: ${(props) => props.borderRadius || '0px'};
`;
const LayoutStyle = styled.div`
display: flex;
flex-direction: ${(props) => props.direction || 'initial'};
justify-content: ${(props) => props.justifyContent || 'initial'};
align-items: ${(props) => props.alignItems || 'initial'};
gap: ${(props) => props.gap || '0px'};
`; 
const Span = styled.span`
  font-style: normal;
  font-weight: ${(props) => props.bold ? 'bold' : 'normal'};
  font-size: 17px;
  line-height: 20px;
  text-align: ${(props) => props.align || "initial"};
  color: ${(props) => props.color || "initial"};
`;


export{
    Greeting,
    Container,
    LayoutStyle,
    Span
}
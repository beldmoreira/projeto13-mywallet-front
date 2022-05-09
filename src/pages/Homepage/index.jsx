import React, { useEffect, useState } from 'react';
import useAuth from "../../hooks/useAuth";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import {ReactComponent as Addvector} from "../../assets/addvector.png";
import {ReactComponent as Minusvector} from "../../assets/minusvector.png";
import SignOut from "../../components/SignOut";
import api from "../../services/api";
import EntryButton from "../../components/EntryButton";
import { Greeting,Container, LayoutStyle, } from './style';


export default function Homepage() {
    const { auth } = useAuth();
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    async function loadingPage() {
        try {
          const { data } = await api.getUser(auth);
          console.log(data);
          setUser(data);
          setIsLoading(false);
        } catch (error) {
          console.log(error);
          alert("Erro! Tente recarregar a página");
          setUser({});
        }
      }
    
      useEffect(() => {
        loadingPage();
      }, [auth])
    
      if (isLoading || !user) {
        return <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
      }
    
    return(
        <Container alignSelf="LayoutStyle-start" padding="0px 25px">
            <LayoutStyle direction="row" justifyContent="space-between" alignItems="center">
                <Greeting> Olá, {user.name} </Greeting>
                <SignOut/>
            </LayoutStyle>
            <Entries entries={user.entries} totalAmount={user.totalAmount}/>
            <LayoutStyle direction="row" gap="15px">
                <EntryButton to ="/moneyin">
                    <Addvector/>
                    Nova Entrada   
                </EntryButton>
                <EntryButton to ="/moneyout">
                    <Minusvector/>
                    Nova saída
                </EntryButton>
            </LayoutStyle>
        </Container>
    )

    }
    function formatAmount(amount) {
        return (amount / 100).toFixed(2);
    }
  
    function Entries ({ entries, totalAmount }) {
        if (!entries || entries.length === 0) {
          return (
            <Container
              background="#FFF"
              borderRadius="5px"
              margin="0px 0px 15px 0px"
              minHeight="450px"
              justifyContent="center"
            >
              <NoEntries>
                Não há registros de <br />
                entrada ou saída
              </NoEntries>
            </Container>
          )
        }
      
        return (
          <Container
            background="#FFF"
            borderRadius="5px"
            margin="0px 0px 15px 0px"
            padding="20px 10px 10px 10px"
            minHeight="450px"
            justifyContent="space-between"
          >
            <LayoutStyle direction="column">
              {entries.map(entry => <Entries key={entry.id} {...entry} />)}
            </LayoutStyle>
            <LayoutStyle direction="row" justifyContent="space-between" alignItems="center">
              <Span color="#000" bold>
                SALDO
              </Span>
              <Span align="right" color={totalAmount > 0 ? '#03AC00' : '#C70000'}>{formatAmount(totalAmount)}</Span>
            </LayoutStyle>
          </Container>
        )
      }
      
      function Entries({ id, amount, description, type, createdAt }) {
         return (
          <LayoutStyle direction="row" justifyContent="space-between" alignItems="center">
            <LayoutStyle direction="row" alignItems="center" gap="10px">
              <Span color="#C6C6C6">
                {createdAt}
              </Span>
              <Span color="#000">
                {description}
              </Span>
            </LayoutStyle>
            <Span align="right" color={type === 'deposit' ? '#03AC00' : '#C70000'}>{formatAmount(amount)}</Span>
            </LayoutStyle>
        )
      }
import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "../../components/Link";
import Container from "../../components/Container";
import Logo from "./style";
import { useNavigate } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { useState, useEffect } from "react";



export default function SignIn() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false);
    const { auth, login } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (auth && auth.token) {
        navigate("/today");
      }
    }, []);
  
    function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  
    function handleSubmit(e) {
      e.preventDefault();
  
      setIsLoading(true);
      const promise = api.login({ ...formData });
      promise.then((response) => {
        setIsLoading(false);
  
        login(response.data);
        navigate("/today");
      });
      promise.catch(() => {
        setIsLoading(false);
  
        alert('Erro, tente novamente');
      });
    }
  
    return (
        <Container>
        <Logo>MyWallet</Logo>
        <Input> E-mail</Input>
        <Input> Senha </Input>
        <Button> Entrar </Button>
        <Link> Primeira vez? Cadastre-se!</Link>
        </Container>
    )
}


    
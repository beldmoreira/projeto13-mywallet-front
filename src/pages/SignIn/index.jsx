import Button from "../../components/Button";
import Input from "../../components/Input";
import Link from "../../components/Link";
import Form from "../../components/Form"
import Container from "../../components/Container";
import Logo from "./style";
import { useNavigate } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import { useState, useEffect } from "react";
import api from "../../services/api"



export default function SignIn() {
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [isLoading, setIsLoading] = useState(false);
    const { auth, login } = useAuth();
    const navigate = useNavigate();
  
    useEffect(() => {
      if (auth && auth.token) {
        navigate("/homepage");
      }
    }, []);
  
    function handleChange(e) {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  
    async function handleSubmit(e) {
      e.preventDefault();
  
      setIsLoading(true);
    const user = { ...formData };

    try {
      const { data } = await api.login(user);
      setIsLoading(false);
      login(data);
      navigation('/homepage');
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      alert("Erro, tente novamente");
    }
  }
  
    return (
        <Container>
            <Logo>MyWallet</Logo>
                <Form onSubmit={handleSubmit}>
                    <Input 
                        type="email"
                        placeholder="E-mail"
                        name="email"
                        onChange={handleChange}
                        value={formData.email}
                        disabled={isLoading}
                        required
                    />             
                    <Input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        onChange={handleChange}
                        value={formData.password}
                        disabled={isLoading}
                        required
                    /> 
                    <Button type="submit" disabled={isLoading}>
                        {
                            isLoading
                            ? <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
                            : "Entrar"
                        }
                    </Button>
                </Form>

                <Link to="/register"> 
                Primeira vez? Cadastre-se!
                </Link>
        </Container>
    )
}

  
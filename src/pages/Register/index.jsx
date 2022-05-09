import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import Link from "../../components/Link";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Container from "../../components/Container";
import Logo from "./style";
import api from "../../services/api"


export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [isLoading, setIsLoading] = useState(false);

    
    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    
      async function handleSubmit(e) {
        e.preventDefault();
      
        if (formData.password !== formData.confirmPassword) {
          alert("As senhas devem ser iguais");
          return;
        }

        const user = { ...formData };
        delete user.confirmPassword;
        try{
          await api.register(user);
          setIsLoading(true);
          navigate("/");;
        } catch (error) {
          console.log(error);
          alert("Erro, tente novamente");
        }
      }    

      return (
        <Container>
            <Logo/>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="Nome"
                    name="name"
                    onChange={handleChange}
                    value={formData.name}
                    disabled={isLoading}
                    required
                />
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
                <Input
                    type="text"
                    placeholder="Confirme a senha"
                    name="confirmPassword"
                    onChange={handleChange}
                    value={formData.confirmPassword}
                    disabled={isLoading}
                    required
                />
        
                <Button type="submit" disabled={isLoading}>
                {
                    isLoading
                    ? <Loader type="ThreeDots" color="#FFFFFF" height={50} width={50} />
                    : "Cadastrar"
                }
                </Button>
            </Form>
    
            <Link to="/">
            Já tem uma conta? Entre agora!
            </Link>
        </Container>
      );
    }


    
   
 
    
  
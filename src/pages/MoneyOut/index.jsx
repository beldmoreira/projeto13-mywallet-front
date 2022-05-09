import api from "../../services/api"
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Form from "../../components/Form";
import Container from "../../components/Container";


export default function MoneyOut(){
    const { auth } = useAuth();
    const [formData, setFormData] = useState({
        amount: '',
        description: '',
      });

    function handleChange(e) {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    
    async function handleSubmit(e) {
        e.preventDefault();
        const transaction = { ...formData, type: "withdraw" };    
    
        try {
            await api.createEntry(auth, transaction);
            setFormData({
              amount: '',
              description: '',
            })
          } catch (error) {
            console.log(error);
            alert("Erro, tente novamente");
          }
        }    
    
    return(
        <Container>
            <Form onSubmit={handleSubmit}>
                <Input
                placeholder="Valor"
                type="number"
                onChange={(e) => handleChange(e)}
                name="amount"
                value={formData.amount}
                required
                />          
                <Input
                placeholder="Descrição"
                type="text"
                onChange={(e) => handleChange(e)}
                name="description"
                value={formData.description}
                required
                />
                <Button type="submit">
                    Salvar saída
                </Button>
            </Form>
        </Container>    
    );
}
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { api } from "../../services/api";

import { Container, Links, Content } from "./styles";
import { Tag } from "../../components/tag";
import { Header } from "../../components/header";
import { Button } from "../../components/button";
import { ButtonText } from "../../components/buttonText";
import { Section } from "../../components/section";

export function Details(){
  const [data, setData] = useState([]);
  const params = useParams();
  const navigate = useNavigate();

  function handleBack(){
    navigate(-1)
  }

  async function handleRemove() {
    const confirm = window.confirm("Deseja realmente remover a nota?")
    if(confirm) {
      await api.delete(`/notes/${params.id}`)
      navigate(-1)
    }
  }

   useEffect(() => {
    async function fetchNotes() {
      const response =  await api.get(`/notes/${params.id}`)
      setData(response.data)
      console.log(response.data)
    }
    fetchNotes()
  }, [])


  return(
    <Container>

      <Header/>

      {data && (
          <main>
            <Content>
              
              <ButtonText 
                title="excluir notas" 
                onClick={handleRemove}
              />


              <h1>
                {data.title}
              </h1>

              <p>
                {data.description}
              </p>

            {data.links && (
              <Section title="Links úteis">
                <Links>
                   {data.links.map((link) => (
                    <li key={String(link.id)}>
                      <a target="blank" href={link.url}>
                        {link.url}
                      </a>
                    </li>
                  ))}
                </Links>
              </Section>
            )}
                
            
            {data.tags &&(
              <Section title="Marcadores">          
                {data.tags.map(tag => (
                    <Tag
                      key={String(tag.id)} 
                      title={tag.name}
                    />
                  ))}
              </Section>
            )}
              
              <Button 
                title="Voltar"
                onClick={handleBack} 
              />

            </Content>
          </main>
        )
     }   
    </Container>
  )
} 
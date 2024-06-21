import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../../services/api";

import { FiPlus, FiSearch } from "react-icons/fi";
import { Container, Brand, Menu, Search, Content, NewNote} from "./styles"

import { Note } from '../../components/note'
import { Header } from "../../components/header"
import { ButtonText } from "../../components/buttonText"
import { Input } from "../../components/input";
import { Section } from "../../components/section";


export function Home (){
    const navigate = useNavigate();
    const[search, setSearch] = useState([]);
    const[tags, setTags] = useState([]);
    const[tagsSelected, setTagsSelected] = useState([]);
    const[notes, setNotes] = useState([]);

   function handleTagSelected(tagName) {
     if (tagName === "all") {
      return setTagsSelected([]);
     }

    const alreadySelected = tagsSelected.includes(tagName);

     if (alreadySelected) {
       const tagsFiltred = tagsSelected.filter((tag) => tag != tagName);
       setTagsSelected(tagsFiltred);
     } else {
       setTagsSelected((prevState) => [...prevState, tagName]);
     }
   }
    
    function handleDetails(id){
        navigate(`/details/${id}`);
    }
    
    useEffect(()=> {
     async function fetchTags(){
        const response = await api.get("/tags");
        setTags(response.data);
     }

     fetchTags();
    },[]);

   useEffect(() => {
    async function fetchNotes() {
      const response = await api.get(
        `/notes?title=${search}&tags=${tagsSelected}`
      );
      setNotes(response.data);
    }

    fetchNotes();
  }, [search, tagsSelected]);

    return(
        <Container>
            <Brand>
            <h1>RocketNotes </h1>
            </Brand>

            <Header/>
            <Menu>
                <li> 
                    <ButtonText 
                    title="Todos"
                    onClick={() => handleTagSelected("all")}
                    $isactive={tagsSelected.length === 0}
                    /> 
                </li>

            {tags && (
                tags.map(tag =>(
                <li key={String(tag.id)}> 
                    <ButtonText 
                    title={tag.name}
                    onClick={() => handleTagSelected(tag.name)}
                    $isactive={tagsSelected.includes(tag.name)}
                    /> 
                </li>
               ))
             )
            }    
            </Menu>

            <Search>
                <Input 
                placeholder="Pesquisar pelo Título" 
                icon={FiSearch}
                onChange={(e)=> setSearch(e.target.value)}
                />
            </Search>

            <Content>
                 <Section title="Minhas Notas">
                  {notes.map(note => (
                    <Note
                       key={String(note.id)}
                       data={note}
                       onClick={() => handleDetails(note.id)}
            />
          ))
          }
        </Section>
            </Content>

            <NewNote to="/new">
                <FiPlus/>
                Criar Nota
            </NewNote>
            
        </Container>


    );
}
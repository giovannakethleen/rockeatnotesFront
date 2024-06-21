import{api} from "../../services/api"
import { useAuth } from '../../hooks/auth';
import avatarPlaceholder from "../../assets/avatarPlaceholder.svg"

import{Link} from'react-router-dom';
import { useState } from 'react';

import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from "react-icons/fi"
import { Input } from "../../components/input"
import { Button } from "../../components/button"
import { Container, Form, Avatar } from "./styles"


export function Profile(){
  const {user, updateProfile} = useAuth();
  
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [oldPass, setPasswordOld] = useState();
  const [passwordNew, setPasswordNew] = useState();

  const avatarURL = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar} ` : avatarPlaceholder
  const[avatar, setAvatar] = useState(avatarURL);
  const[avatarFile, setAvatarFile] = useState(null);

  async function hadleUpdate(){
    const updated = {
      name,
      email,
      password: passwordNew,
      old_password: oldPass,
    }

    const userUpdated = Object.assign(user, updated)

    await updateProfile({user: userUpdated, avatarFile}); 
  }

  function handleChangeAvatar(event) {
    const file = event.target.files[0];
    setAvatarFile(file);

    const imagePreview = URL.createObjectURL(file);
    setAvatar(imagePreview);
  }

return(
    <Container>

      <header>
        <Link to="/"><FiArrowLeft/></Link>
      </header>

      <Form>
      <Avatar>
          <img
            src={avatar}
            alt="Foto do usuário"
          />

          <label htmlFor="avatar">
            <FiCamera />

            <input
              id="avatar"
              type="file"
              onChange={handleChangeAvatar}
            />
          </label>
        </Avatar>
               
        <Input
        placeholder="Nome"
        type="text"
        icon={FiUser}
        value={name}
        onChange={(e) => setName(e.target.value)}
        />

      <Input
        placeholder="E-mail"
        type="text"
        icon={FiMail}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

      <Input
        placeholder="Senha Antiga"
        type="password"
        icon={FiLock}
        onChange={(e) => setPasswordOld(e.target.value)}
        />

       <Input
        placeholder="Nova Senha"
        type="password"
        icon={FiLock}
        onChange={(e) => setPasswordNew(e.target.value)}
        />

      <Button title="Salvar" onClick={hadleUpdate} />

      </Form> 
    </Container>
  );
}
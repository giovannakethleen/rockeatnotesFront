import { createContext, useContext, useState, useEffect } from "react";
import {api} from "../services/api.js"

export const AuthContext = createContext({});

function AuthProvider ({ children }) {
  const [data, setData] = useState({});

  // chaves, independe da posição que o email e a senha estiverem
  async function signIn ({email, password}){
    try {
    const response = await api.post("/sessions", {email, password});
    const {user, token} = response.data;

    //armazenar o usuario e transformar em string
    localStorage.setItem("@giovana:user", JSON.stringify(user));
    localStorage.setItem("@giovana:token", token);
    
    api.defaults.headers.common["authorization"] = `Bearer ${token}`;
    
    setData({user, token})
    }catch (error) {
      if(error.response){
        alert(error.response.data.message);
    } else {
        alert("Não foi possível entrar");
    }
  }
}

  function signOut(){
localStorage.removeItem("@giovana:token");
localStorage.removeItem("@giovana:user");

setData({});
}


async function updateProfile({ user, avatarFile }) {
    try {

      if (avatarFile) {
      const fileUploadForm = new FormData();
      fileUploadForm.append("avatar", avatarFile);

      const response = await api.patch("/users/avatar", fileUploadForm);
      user.avatar = response.data.avatar;
    }

      await api.put("/users", user);

      localStorage.setItem("rocketNotes:user", JSON.stringify(user));

      setData({ user, token: data.token });
      alert("Perfil atualizado com sucesso!");
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert("Não foi possível atualizar o perfil ");
      }
    }
  }


// manter o login na pagina atraves do localStorage
  useEffect(() => {  
    const token = localStorage.getItem("@giovana:token");
    const user = localStorage.getItem("@giovana:user");
    
 
    if(token && user){
       api.defaults.headers.common["authorization"] = `Bearer ${token}`;}

    setData({
      token,
      user: JSON.parse(user)
    });
  }, []);


 return ( <AuthContext.Provider value={{
  signIn, 
  signOut,
  updateProfile,
  user: data.user  
  }}>
    { children }
    </AuthContext.Provider> 
  );
}

function useAuth(){
  const context = useContext(AuthContext);
  return context;
}


export {AuthProvider, useAuth};
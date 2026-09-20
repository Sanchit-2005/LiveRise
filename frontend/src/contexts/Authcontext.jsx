import { Children, createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import httpStatus from "http-status-codes";
export const Authcontext = createContext({});

const client = axios.create({
  baseURL: "http://localhost:8000/api/v1/users",
});

export const AuthProvider = ({ children }) => {
  const [userData, setUserdata] = useState(null);
  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      let request = await client.post("/register", {
        name: name,
        username: username,
        password: password,
      });

      if (request.status === httpStatus.CREATED) {
        return request.data.message;
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      let request = await client.post("/login", {
        username: username,
        password: password,
      });

      if (request.status === httpStatus.ACCEPTED) {
        localStorage.setItem("token", request.data.token);
        setTimeout(() => {
          router("/home");
        }, 3000);

        return request.data.message;
      }
    } catch (error) {
      throw error;
    }
  };
  const data = { userData, setUserdata, handleLogin, handleRegister };

  return <Authcontext.Provider value={data}>{children}</Authcontext.Provider>;
};

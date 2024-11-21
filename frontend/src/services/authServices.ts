import axios from "./axios";

interface IAuthProps {
  username: string;
  password: string;
}

async function signUp(data: IAuthProps) {
  return await axios.post("/sign-up", data);
}

async function signIn(data: IAuthProps) {
  return await axios.post("/sign-in", data);
}

export { signUp, signIn };

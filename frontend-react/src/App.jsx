import { useState } from "react";
import UserTask from "./Pages/UserTask";
import UserSignUpInPage from "./Pages/UserSignUpInPage";

export default function App() {
  const [login, setLogin] = useState(false);
  return (
    <>
      { !login && <UserSignUpInPage  showTaskManager={setLogin}/>}
      { login && <UserTask/>}
    </>
  )
}
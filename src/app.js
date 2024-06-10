import React, { useState } from "react";
import Userform from "./components/userform";
import Basic from "./components/basicinfo";

function App() {
  const [status, setStatus] = useState(false);

  return (
    <>
      {<Userform />}
    </>
  );
}

export default App;

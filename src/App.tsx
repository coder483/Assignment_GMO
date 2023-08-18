import Form from "./Components/Form";
import PostTable from "./Components/PostTable";
import { Routes, Route } from "react-router-dom";


const App = () => {

  return (
      <>
     <Routes>
        <Route path="/" element={<Form/>} />
        <Route path="/second" element={<PostTable/>} />
    </Routes>
      </>
  );
};

export default App;

import "./styles/App.css";

import { Toaster } from "sonner";
import Login from "./layouts/Login";

function App() {


  return (
    <>
      <Toaster
        position={"bottom-left"}
        richColors
        expand
        // closeButton
        duration={3000}
        visibleToasts={3}
        toastOptions={{
          className:
            "!font-Imedium !rounded-[] !border !shadow-xl !bg-gray-900 !border !border-white/16 !text-[1rem] !w-100",
        }}
      />
      <section className="flex items-center justify-center h-full">
      
        <Login/>
      </section>
    </>
  );
}

export default App;

import { ProveedorAutenticacion } from './components/contexto/ContextoAutenticacion';
import MemeApp from './components/memeApp';

function App() {
  return (
    <ProveedorAutenticacion>
      <MemeApp />
    </ProveedorAutenticacion>
  );
}

export default App;

import { useState, useEffect } from "react";
import Header from "./components/Header";
import IconoNuevoGasto from "./img/nuevo-gasto.svg";
import Modal from "./components/Modal";
import { generarId } from "./helpers";
import ListadoGastos from "./components/ListadoGastos";
import Filtros from "./components/Filtros";

function App() {
  const [presupuesto, Setpresupuesto] = useState(
      Number(localStorage.getItem("presupuesto")) ?? 0  );
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [animarModal, setAnimarModal] = useState(false);
  const [gastos, setGastos] = useState(
    localStorage.getItem("gastos") ? JSON.parse(localStorage.getItem("gastos")) : []
  );
  const [gastoEditar, setGastoEditar] = useState({})

  const [filtro, setFiltro] = useState("")
  const [gastosFiltrados, setGastosFiltrados] = useState([])

  useEffect(()=> {
    if(Object.keys(gastoEditar).length > 0) {
      setModal(true);
      
    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
      
    }
  }, [gastoEditar])

  useEffect(()=> {
      localStorage.setItem("presupuesto", presupuesto ?? 0 )
  }, [presupuesto])

  useEffect(()=> {
    localStorage.setItem("gastos", JSON.stringify(gastos) ?? [])
}, [gastos])

useEffect(()=> {
  if(filtro){
    // Filtrar gastos por categoria
    const gastosFiltrados = gastos.filter(gasto => gasto.categoria === filtro)
    setGastosFiltrados(gastosFiltrados)
  }
}, [filtro])

  useEffect(()=> {
    const presupuestoLS = Number(localStorage.getItem("presupuesto")) ?? 0;
    if(presupuestoLS > 0){
      setIsValidPresupuesto(true)
    }
  }, [])

  const handleNuevoGasto = () => {
    setModal(true);
    setGastoEditar({})

    setTimeout(() => {
      setAnimarModal(true);
    }, 500);
  };

  const guardarGasto = (gasto) => {
    if(gasto.id){
      //Actualizar
      const gastosActualizados = gastos.map(gastoState=> gastoState.id === gasto.id? gasto: gastoState)
      setGastos(gastosActualizados)
      setGastoEditar({}) //Es para limpiar el state
    } else {
      //Nuevos gastos
      gasto.fecha = Date.now();
    gasto.id = generarId();
    setGastos([...gastos, gasto]);
    }
    

    setAnimarModal(false);

    setTimeout(() => {
      setModal(false);
    }, 500);
  };

  const eliminarGasto = id => {
    const gastosActualizados = gastos.filter(gasto => gasto.id !== id)
    setGastos(gastosActualizados);
  }

  return (
    <div className={modal ? "fijar": ""}>
      <Header
        setGastos={setGastos}
        gastos = {gastos}
        presupuesto={presupuesto}
        Setpresupuesto={Setpresupuesto}
        isValidPresupuesto={isValidPresupuesto}
        setIsValidPresupuesto={setIsValidPresupuesto}
      />
      {isValidPresupuesto && (
        <>
          <main>
            <Filtros 
            filtro={filtro}
            setFiltro={setFiltro}
            />
            <ListadoGastos 
            gastosFiltrados={gastosFiltrados}
            filtro={filtro}
            eliminarGasto={eliminarGasto}
            setGastoEditar={setGastoEditar}
            gastos={gastos}
            />
          </main>
          <div className="nuevo-gasto">
            <img
              src={IconoNuevoGasto}
              alt="icono nuevo gasto"
              onClick={handleNuevoGasto}
            />
          </div>
        </>
      )}

      {modal && (
        <Modal
          gastoEditar={gastoEditar}
          setModal={setModal}
          animarModal={animarModal}
          setAnimarModal={setAnimarModal}
          guardarGasto={guardarGasto}
          setGastoEditar={setGastoEditar}
        />
      )}
    </div>
  );
}

export default App;

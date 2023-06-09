import { useState, useEffect } from 'react'
import { CircularProgressbar, buildStyles } from "react-circular-progressbar"
import "react-circular-progressbar/dist/styles.css"



const ControlPresupuesto = ({presupuesto, gastos, setGastos, Setpresupuesto, setIsValidPresupuesto}) => {

  const [disponible, setDisponible] = useState(0)
  const [gastado, setGastado] = useState(0)
  const [porcentaje, SetPorcentaje]= useState(0)

  useEffect(()=>{
    const totalGastado = gastos.reduce((total, gasto)=> gasto.cantidad + total, 0);
    const totalDisponible = presupuesto - totalGastado;

    //Calcular el porcentaje gastado:
    const nuevoPorcentaje = (((presupuesto - totalDisponible) / presupuesto)*100).toFixed(2);
    
    setGastado(totalGastado)
    setDisponible(totalDisponible)
    setTimeout(()=>{
      SetPorcentaje(nuevoPorcentaje)
    }, 1500)
  }, [gastos])

    const formatearCantidad = (cantidad)=> { // esta función es para convertir el número en dinero
        return cantidad.toLocaleString("en-US", { 
            style: "currency",
            currency: "USD"
        })
    }

    const handleResetApp = ()=>{
      const resultado = confirm("¿Deseas reiniciar la app?");
      if(resultado){
        setGastos([])
        Setpresupuesto(0)
        setIsValidPresupuesto(false)
      }else {

      }
    }


  return (
    <div className='contenedor-presupuesto contenedor sombra dos-columnas'>
      <div>
        <CircularProgressbar
        styles={buildStyles({
          pathColor: porcentaje > 100 ? "#DC2626" : "#3B82F6",
          trailColor: "#F5F5F5",
          textColor: porcentaje > 100 ? "#DC2626" : "#3B82F6"

        })}
        value={porcentaje}
        text={`${porcentaje}% Gastado`}
        />
      </div>
      <div className='contenido-presupuesto'>
        <button className='reset-app' type='button' onClick={handleResetApp}>
          Resetear APP
        </button>
        <p>
            <span>Presupuesto: </span> {formatearCantidad(presupuesto)}
        </p>
        <p className={`${disponible < 0 ? "negativo": ""}`}>
            <span>Disponible: </span> {formatearCantidad(disponible)}
        </p>
        <p>
            <span>Gastado: </span> {formatearCantidad(gastado)}
        </p>
      </div>
    </div>
  )
}

export default ControlPresupuesto

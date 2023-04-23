import React from 'react'
import NuevoPresupuesto from './NuevoPresupuesto'
import ControlPresupuesto from './ControlPresupuesto'

const Header = ({presupuesto, Setpresupuesto, isValidPresupuesto, setIsValidPresupuesto, gastos, setGastos}) => {
  return (
    <header>
      <h1>Planificador de gastos</h1>
        {isValidPresupuesto ? (
            <ControlPresupuesto 
            setGastos={setGastos}
            gastos={gastos}
            presupuesto={presupuesto}
            Setpresupuesto={Setpresupuesto}
            setIsValidPresupuesto={setIsValidPresupuesto}
            />
        )
    : (

        <NuevoPresupuesto 
      presupuesto={presupuesto}
      Setpresupuesto={Setpresupuesto}
      setIsValidPresupuesto={setIsValidPresupuesto}
      />
    )
    }
      
    </header>
  )
}

export default Header

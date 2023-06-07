import logoImg from './assets/logo.png'
import './App.css'
import { useState, FormEvent } from 'react'

interface infoProps{
  title: string
  alcool: string | number
  gasolina: string | number
}

function App() {
  const [inputAlcool, setAlcool] = useState(1)
  const [inputGasolina, setGasoline] = useState(1)
  const [info, setInfo] = useState<infoProps>()

  function calcular(event: FormEvent){
    event.preventDefault();

    let calculo = (inputAlcool/inputGasolina)

    if(calculo <= 0.7){
      setInfo({
        title: "Compensa utilizar o Alcool",
        gasolina: formatarMoeda(inputGasolina),
        alcool: formatarMoeda(inputAlcool)
      })
    }
    else{
      setInfo({
        title:"Compensa utilizar a Gasolina",
        gasolina: formatarMoeda(inputGasolina),
        alcool: formatarMoeda(inputAlcool)
      })
    }
  }

  function formatarMoeda(valor:number){
    let valorFormatado = valor.toLocaleString("pt-br",
    {
      style:"currency",
      currency: "BRL",
    })
    return valorFormatado;
  }
 return(
  <>
    <main className='container'>
      <img className='logo' src={logoImg} alt="Logo do projeto" />
      <h1 className='title'>Qual a melhor opção:</h1>
      <form className='form' onSubmit={calcular}>
        <label>Alcool (valor por litro):</label>
      <br />
        <input 
          type="number"
          className='input'
          placeholder='4.58' 
          min="1"
          step="0.01"
          required
          value={inputAlcool}
          onChange={(e)=> setAlcool(Number(e.target.value))} //como o input sempre envia uma string temos que converter para Number 
        />
      <br />
        <label>Gasolina (valor por litro):</label>
      <br />
        <input 
          type="number"
          className='input' 
          placeholder='6.98'
          min="1"
          step="0.01"
          required  
          value={inputGasolina}
          onChange={(e)=> setGasoline(Number(e.target.value))}
        />
      <br />
        <input 
          type="submit" 
         value="Calcular"
         className='button'  
        />
      </form>
      {
        info && Object.keys(info).length > 0 &&( // ele só vai exibir o codigo dentro do parenteses se o objeto for maior que 0
          <section className='result'>
            <h2 className='result-title'>
              {info.title} 
            </h2>
            <span>
              Alcool {info.alcool} 
            </span>
            <span>Gasolina {info.gasolina}</span>
          </section>
        )
      }
    </main>
  </>
 )
}

export default App

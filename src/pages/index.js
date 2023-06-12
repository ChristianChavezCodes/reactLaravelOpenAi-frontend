
import styles from '@/styles/Home.module.scss'
import {useState, useRef} from 'react'
import axios from 'axios'
import { PulseLoader } from 'react-spinners'

function Home() {

  const [result, setResult] = useState('')
  const [textData, setTextData] = useState('')
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const handleChat = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setResult('')
    setTextData('')
    const response = await axios.post('https://react-laravel-open-ai-backend.herokuapp.com/api/example', textData)
    setResult(response.data)
    setLoading(false)
  }

  const handleChange = (e) =>{
    setTextData(e.target.value)
    if(e.key === "Enter"){
      formRef.current.submit()
    }
  }

  return(
    <div className = {styles.page}>
      <h1 className={styles.header}>Welcome to Soaren Management! Feel free to ask any questions</h1>
      <form className = {styles.form} ref = {formRef} onSubmit = {handleChat}>
        <input className = {styles.form__inputBar} type = 'text' value = {textData} onChange = {handleChange} />
      </form>
      <div className = {styles.loadingContainer}>
        {loading? <PulseLoader size={45} color="#36d7b7"/>: null}
      </div>
      {result? <p className = {styles.response}>{result}</p>: null}
    </div>
  )
}

export default Home
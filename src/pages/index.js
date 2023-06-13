
import styles from '@/styles/Home.module.scss'
import {useState, useRef} from 'react'
import axios from 'axios'
import Image from 'next/image'
import { PulseLoader } from 'react-spinners'

function Home() {

  const [chatResult, setChatResult] = useState('')
  const [imageResult, setImageResult] = useState('')
  const [textData, setTextData] = useState('')
  const [loading, setLoading] = useState(false)
  const formRef = useRef(null)

  const handleChat = async (e) =>{
    e.preventDefault()
    setLoading(true)
    setChatResult('')
    setImageResult('')
    setTextData('')
    const response = await axios.post('https://react-laravel-open-ai-backend.herokuapp.com/api/example', textData) 
    setChatResult(response.data[0])
    setImageResult(response.data[1])
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
      <h1 className={styles.header}>
        Welcome to your personal Know-it-all! Please feel free to ask anything!
      </h1>
      <form className = {styles.form} ref = {formRef} onSubmit = {handleChat}>
        <input className = {styles.form__inputBar} type = 'text' value = {textData} onChange = {handleChange} />
      </form>
      <div className = {styles.loadingContainer}>
        {loading? <PulseLoader size={45} color="#36d7b7"/>: null}
      </div>
      {chatResult? <p className = {styles.chatResponse}>{chatResult}</p>: null}
      <div className = {styles.imageResponseContainer}>
        {imageResult? <Image className= {styles.imageResponseContainer__imageResponse} width = {1000} height = {1000} src={imageResult} alt="Picture of the request"/>: null}
      </div>
    </div>
  )
}

export default Home
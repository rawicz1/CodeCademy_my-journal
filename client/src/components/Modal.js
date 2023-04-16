import { useState } from 'react'
import { useCookies } from 'react-cookie';

const Modal = ({mode, setShowModal, getData, entry}) => {
  let editMode = false;
  const [cookie, setCookie,removeCookie] = useCookies(null)
  if (mode === 'edit'){
    editMode = true
  }

  let userDate;
  editMode ? userDate = entry.date : userDate = new Date()  

  const [data, setData] = useState({
    user_email: editMode ? entry.user_email : cookie.Email,
    title: editMode ? entry.title : null,    
    content: editMode ? entry.content : null,
    date: userDate
  })  
  
  const postData = async (e) => {
    e.preventDefault()    
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/entries`, {
        method: "POST",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {        
        setShowModal(false)
        getData()
        }
      
    } catch (error) {
      console.log(error)
    }
  }

  const editData = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/entries/${entry.id}`, {
        method: "PUT",
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
      if (response.status === 200) {        
        setShowModal(false)
        getData()
        }
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {    
    const {name, value} = e.target    
    setData(data => ({
      ...data,
      [name]: value
    }))    
  }

    return (
      <div className="overlay">
        <div className="modal">
          <div className="form-title-container">
            <h3>What would you like to {mode} today?</h3>
            <button style={{fontSize: 20}} onClick={() => setShowModal(false)}>X</button>
          </div>
          
          <form>
            <input
              required
              maxLength={30}
              placeholder="Your entry title goes here"
              name="title"
              value={data.title || ""}
              onChange={handleChange}
              />                        
             <textarea 
              required
              name="content" 
              value={data.content || ''} 
              rows={5} cols={5} 
              onInput={handleChange}>              
             </textarea>

            <input className={mode} type="submit"
            onClick={editMode ? editData : postData}
            value={mode}/>

          </form>

        </div>
      </div>
    );
  }
  
  export default Modal;
  
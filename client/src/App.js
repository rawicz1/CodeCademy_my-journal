import ListHeader from "./components/ListHeader";
import { useEffect, useState } from "react"
import YearBox from "./components/YearBox";
import Auth from "./components/Auth";
import { useCookies } from "react-cookie";

const App = () => {  
  
  const [entries, setEntries] = useState(null)
  const [cookie, setCookie,removeCookie] = useCookies(null)
  const userEmail = cookie.Email
  const authToken = cookie.AuthToken

  const getData = async () => {  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER}/entries/${userEmail}`)
      const json = await response.json()
      setEntries(json)
    } catch (error) {
      console.log(error)
    }    
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])  

  const yearsSet = new Set()
  let years
  const getUniqueYears = () => {
    for(let i=0; i<entries.length; i++){
        const uniqueYear = entries[i].date.substring(0,4)
        yearsSet.add(uniqueYear)          
        years = Array.from(yearsSet)
    }
  } 
  if(entries){
    getUniqueYears()
  }

  return (
    <div className="app">
      {/* authorize */}
      {!authToken && <Auth />}
      {authToken && 
      <>
        <ListHeader listName={ 'My journal' } getData={getData}/>
        <div>
          {years?.map(year =>   <YearBox key={year} year={year}getData={getData} entries={entries}/>)}      
        </div>
      </>}
      
    </div>
  )
}

export default App;

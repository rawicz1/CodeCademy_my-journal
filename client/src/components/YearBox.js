import useCollapse from 'react-collapsed'
import ListItem from './ListItem';

const YearBox = ({year, getData, entries}) => {
   
     const { getCollapseProps, getToggleProps, isExpanded } = useCollapse()  
   
    return (
      <div className='year-box'>
        <div className="collapsible">         
          <div className="header" {...getToggleProps()}>
              <div className='title-date'>{year}</div>
                  {isExpanded ? <div className='title-box'><span className='expand-title'>Click to collapse</span></div> : <div className='title-box'><span className='expand-title'>   Click to expand</span></div> }
          </div>
          <div {...getCollapseProps()}>
            <div className="content">
              <div className="app-items">{entries?.filter(entry => Number(entry.date.substring(0,4)) === Number(year)).map((entry) => <ListItem key={entry.id} entry={entry} getData={getData} />)}              
              </div> 
            </div>          
          </div>
      </div>
    </div>
      
    )
  }
  
  export default YearBox
  
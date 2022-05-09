import './MyList.css'
import Navbar from '../../components/navbar/Navbar';
import BigCards from '../../components/bigcards/BigCards';
import Footer from '../../components/footer/Footer';
import {useSelector} from 'react-redux';
import {selectMyList} from '../../features/userSlice';

function MyList() {
  const myList = useSelector(selectMyList);

  return (
    <div className='mylist'>
        <Navbar/>
        <BigCards title = {"My List"} media = {myList}/>
        <Footer/>
    </div>
  )
}

export default MyList
import { useEffect } from 'react';
import Banner from '../../components/banner/Banner';
import Navbar from '../../components/navbar/Navbar';
import Row from '../../components/row/Row';
import {useSelector} from 'react-redux';
import {selectUser} from '../../features/userSlice';
import Loading from '../../components/loading/Loading';

import './HomeScreen.css';
import requests from '../../requests';

export default function HomeScreen() {

    const user = useSelector(selectUser);
    useEffect(() => {
    if(!user.displayName){
      setTimeout(() => {
      window.location.reload();
      }, 4000);
      return user;
    }
  },[user]);

  return (
    <div className='homeScreen'>
      {!user.displayName ? <Loading/> : (
        <>
      <Navbar/>
      <Banner/>
      <Row 
        title= "Netflix Originals"
        fetchURL= {requests.fetchNetflixOriginals}
        rowSize = "large"
      />
      <Row 
        title= "Trending Now"
        fetchURL= {requests.fetchTrending}
        rowSize = "small"
      />
      <Row 
        title= "Top Rated"
        fetchURL= {requests.fetchTopRated}
        rowSize = "small"
      />
      <Row 
        title= "Action Movies"
        fetchURL= {requests.fetchActionMovies}
        rowSize = "small"
      />
      <Row 
        title= "Comedy Movies"
        fetchURL= {requests.fetchComedyMovies}
        rowSize = "small"
      />
      <Row 
        title= "Horror Movies"
        fetchURL= {requests.fetchHorrorMovies}
        rowSize = "small"
      />
      <Row 
        title= "Romance Movies"
        fetchURL= {requests.fetchRomanceMovies}
        rowSize = "small"
      />
      <Row 
        title= "Documentries Movies"
        fetchURL= {requests.fetchDocumentaries}
        rowSize = "small"
      />
      </>
      )}
    </div>
  )
}

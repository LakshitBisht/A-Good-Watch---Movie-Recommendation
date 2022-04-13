import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom'
import BigCards from '../../components/bigcards/BigCards';
import Navbar from '../../components/navbar/Navbar'
import './SearchResult.css'
import axios from '../../api/axios';
import {fetchSearchQuery} from '../../api/requests';
import { toast } from 'react-toastify';
import Footer from '../../components/footer/Footer';

function SearchResult() {

    const [searchQueryUrl, setSearchQueryUrl] = useSearchParams(); 

    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchSearchQuery(searchQueryUrl.get('q'))).then(response => {
                setSearchResults(response.data.results);
            }).catch(error => {toast.error(error.message)});
            return request;
        }
        fetchData();
        return () => {
            setSearchResults([]);
        }
    }, [searchQueryUrl, setSearchResults]);
   
  return (
    <div className='searchResult'>
        <Navbar searchNavigate={false} searchQueryUrl={searchQueryUrl.get('q')} setSearchQueryUrl={setSearchQueryUrl}/>
        {searchResults?.length > 0 ? 
        <BigCards title={"Search Results"} media={searchResults} />
        : <div className='searchResult__noResults'>No Results Found</div>
        }
        <Footer/>
    </div>
  )
}

export default SearchResult
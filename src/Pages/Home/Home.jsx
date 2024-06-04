import React from 'react';
import Banner from '../../Components/Banner/Banner';
import TopScholarship from '../../Components/TopScholarship/TopScholarship';

const Home = () => {
    return (
        <div>
            <div className='my-12'>
                 <Banner></Banner> 
            </div>
            <div>
                <TopScholarship></TopScholarship>
            </div>
        </div>
    );
};

export default Home;

import Banner from '../../Components/Banner/Banner';
import Contactus from '../../Components/ContactUs/Contactus';
import StudentReview from '../../Components/StudentReview/StudentReview';
import TopScholarship from '../../Components/TopScholarship/TopScholarship';
import UpcomingEvents from '../../Components/UpcomingEvents/UpcomingEvents';

const Home = () => {
    return (
        <div>
            <div className='my-12'>
                 <Banner></Banner> 
            </div>
            <div>
                <TopScholarship></TopScholarship>
            </div>
            <div className='my-12'>
                <StudentReview></StudentReview>
            </div>
            <div>
                <Contactus></Contactus>
            </div>
            <div className='my-12'>
                <UpcomingEvents></UpcomingEvents>
            </div>
        </div>
    );
};

export default Home;
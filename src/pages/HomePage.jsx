import Intro from '../components/Home/Intro.jsx';
import Why from '../components/Home/WhyChoose.jsx';
import Program from '../components/Home/Programs.jsx';
import Test from '../components/Home/TestiMonials.jsx';
import Form from '../components/Home/ContactForm.jsx';
import Time from '../components/Home/Timing.jsx';
function HomePage(){
    return(
        
        <div className="w-full overflow-y-hidden">
        <Intro />
        
        <Program />
        <Time />
        <Why />
        <Test />
        <Form />
       
        </div>
        
    )
}

export default HomePage;
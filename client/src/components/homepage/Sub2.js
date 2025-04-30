import wallet from './images/Wallet.png';
import mobile from './images/mobile 1.png';
import snap from './images/Hassle-free.png';

const Sub2 = () => {
    return (
       <div className='home_sub1_main'>
     
       <p className='sub1_p'>
       Here's why you'll love Insuretech
       </p>
       
        <div className='home_sub2'>

        <div className='home_sub_child2'>
        <div><img src={wallet} style={{height:"120px", width:"120px", marginBottom:"28px"}} alt="Low premium icon"></img></div>
        <div style={{marginBottom:"28px"}}>Incredibly low premiums</div>
        <div style={{fontSize:"14px", fontWeight:"normal"}}> Insuring things that matter to you shouldn't come at a cost. That's why when you buy from us, you get insurance that fits your pocket.</div>        
         </div>

        
         <div className='home_sub_child2'>
        <div><img src={mobile} style={{height:"120px", width:"120px", marginBottom:"28px"}} alt="Instant claim icon"></img></div>
        <div style={{marginBottom:"28px"}}>Instant claim settlement</div>
        <div style={{fontSize:"14px", fontWeight:"normal"}}>No more waiting for weeks. Our AI-powered system processes claims in minutes, not days. Get your money when you need it the most.</div>        
         </div>

         <div className='home_sub_child2'>
        <div><img src={snap} style={{height:"120px", width:"120px", marginBottom:"28px"}} alt="Customer support icon"></img></div>
        <div style={{marginBottom:"28px"}}>24/7 customer support</div>
        <div style={{fontSize:"14px", fontWeight:"normal"}}>Have a question at 2 AM? No problem! Our support team is always available to help you with any insurance-related queries.</div>        
         </div>

        </div>
        </div>
    )
}

export default Sub2

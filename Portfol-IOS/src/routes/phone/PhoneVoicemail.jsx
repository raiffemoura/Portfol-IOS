import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import "../../styles/phone.css";
import iconConfig from '../../components/iconConfig';
import HomeButton from "../../components/HomeButton";





const PhoneVoicemail = () => {

    const [isEraseHovered, setIsEraseHovered] = React.useState(false);
    const [currentNumber, setCurrentNumber] = React.useState("");
    
    const insertMask = (phone) => {
       const noMask = phone.replace(/\D/g, '');
       const { length } = noMask;

       if (length <= 11) {
           return noMask
        .replace(/(\d{2})(\d)/ , '($1) $2')
        .replace(length === 11 ? /(\d{5})(\d)/ : /(\d{4})(\d)/, '$1-$2')
       } else if (length > 14) {
           return "..." + noMask.slice(-11)
       }
       return phone
        
    }



    const inputNum = (e) => {
        if (currentNumber === "") {
          setCurrentNumber(e.target.value)
        } else {
          setCurrentNumber(currentNumber + e.target.value)
          
        }
        console.log(currentNumber);
      };

      const erase = () => {
          let erase = currentNumber;
          erase = erase.slice(0, -1);
          setCurrentNumber(erase);
      }

      

    return ( 
        <div className='container-calculator'>
            <div>
                <div className="screen">
                    <Header />
                    <div className='phone-numbers'>
                        {insertMask(currentNumber)}

                    </div>
                    <div className="keypad">
                        <button className='keypad-btn' onClick={inputNum} value={1}>1</button>
                        <button className='keypad-btn'  onClick={inputNum} value={2}>2</button>
                        <button className='keypad-btn'  onClick={inputNum} value={3}>3</button>
                        <button className='keypad-btn'  onClick={inputNum} value={4}>4</button>
                        <button className='keypad-btn'  onClick={inputNum} value={5}>5</button>
                        <button className='keypad-btn'  onClick={inputNum} value={6}>6</button>
                        <button className='keypad-btn'  onClick={inputNum} value={7}>7</button>
                        <button className='keypad-btn'  onClick={inputNum} value={8}>8</button>
                        <button className='keypad-btn'  onClick={inputNum} value={9}>9</button>
                        <button className='keypad-btn asterisk'  onClick={inputNum} value={"*"}>✱</button>
                        <button className='keypad-btn'  onClick={inputNum} value={0}>0</button>
                        <button className='keypad-btn'  onClick={inputNum} value={"#"}>#</button>

                    
                        <button  className=" keypad-call">
                            <img src={iconConfig.Call} alt="call" />
                        </button>                        
                    
                    
                        <button  className='keypad-erase'>
                            <img src={isEraseHovered ? iconConfig.EraseHover : iconConfig.Erase} alt="erase" onClick={erase} onMouseEnter={() => setIsEraseHovered(true)} onMouseLeave={() => setIsEraseHovered(false)} />
                        </button>                        
                        

                    </div>
                    <div className='menu-bottom-phone'>

                        <Link to={"/phone/favourites"}>
                            <div>
                                <img className='menu-bottom-phone-img' src={iconConfig.favourites} alt=""   />
                                <p>Favourites</p>
                            </div>
                        </Link>
                        <Link to={"/phone/recents"}>
                            <div>
                                <img className='menu-bottom-phone-img' src={iconConfig.recents} alt="recents"   />
                                <p>Recents</p>
                            </div>
                        </Link>
                        <Link to={"/phone/contacts"}>
                            <div>
                            <img className='menu-bottom-phone-img' src={iconConfig.contacts} alt="contacts"   />
                                <p>Contacts</p>
                            </div>
                        </Link>
                            <Link to={"/phone"}> 
                        <div>
                            <img className='menu-bottom-phone-img' src={iconConfig.keypad} alt="keypad"   />
                            <p>Keypad</p>
                        </div>
                    </Link>
                            <Link to={"/phone/voicemail"}>
                        <div>
                            <img className='menu-bottom-phone-img' src={iconConfig.voicemailBlue} alt="voicemail"   />
                            <p>Voicemail</p>
                        </div>
                    </Link>
                    </div>

                    <HomeButton />
                    
                </div>
            </div>
            
        </div>
     );
}
 
export default PhoneVoicemail;
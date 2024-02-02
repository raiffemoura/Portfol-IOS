import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import "../../styles/phone.css"
import Call from '../../assets/icons/phone.png';
import Erase from '../../assets/icons/erase.png';
import EraseHover from '../../assets/icons/erase-hover.png';
import keypad from '../../assets/icons/keypad.png';
import contacts from '../../assets/icons/contacts.png';
import recents from '../../assets/icons/recents.png';
import favouritesBlue from '../../assets/icons/favourites-blue.png';
import voicemail from '../../assets/icons/voicemail.png';
import HomeButton from '../../components/HomeButton'



const PhoneFavourites = () => {

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
                            <img src={Call} alt="" />
                        </button>                        
                    
                    
                        <button  className='keypad-erase'>
                            <img src={isEraseHovered ? EraseHover : Erase} onClick={erase} onMouseEnter={() => setIsEraseHovered(true)} onMouseLeave={() => setIsEraseHovered(false)} />
                        </button>                        
                        

                    </div>
                    <div className='menu-bottom-phone'>

                        <Link to={"/phone/favourites"}>
                            <div>
                                <img className='menu-bottom-phone-img' src={favouritesBlue} alt=""   />
                                <p>Favourites</p>
                            </div>
                        </Link>
                        <Link to={"/phone/recents"}>
                            <div>
                                <img className='menu-bottom-phone-img' src={recents} alt=""   />
                                <p>Recents</p>
                            </div>
                        </Link>
                        <Link to={"/phone/contacts"}>
                            <div>
                            <img className='menu-bottom-phone-img' src={contacts} alt=""   />
                                <p>Contacts</p>
                            </div>
                        </Link>
                            <Link to={"/phone"}> 
                        <div>
                            <img className='menu-bottom-phone-img' src={keypad} alt=""   />
                            <p>Keypad</p>
                        </div>
                    </Link>
                            <Link to={"/phone/voicemail"}>
                        <div>
                            <img className='menu-bottom-phone-img' src={voicemail} alt=""   />
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
 
export default PhoneFavourites;
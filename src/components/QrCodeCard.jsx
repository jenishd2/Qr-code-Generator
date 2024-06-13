import React, { useState } from 'react'
import "../App.css"
import Qrcode from "qrcode" 

export default function QrCodeCard() {
    const [text,setText] = useState('')
    const [Url,SetUrl] = useState('')
    const [error,seterror] = useState('')
   const Generateqrcode =()=>{
    Qrcode.toDataURL(`${text}`, function (err, url) {
        SetUrl(url)
    })
    
    if(!text){
        seterror("Enter The Url")
        setTimeout(() => seterror(''), 5000); // Clear error after 5 seconds
      return;
    }
   }
   const clearUrl = ()=>{
    SetUrl('')
    setText('')
   }

   const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      Generateqrcode();
    }
  };
  
//    Download Functionality
   const downloadQRCode = () => {
    const link = document.createElement('a');
    link.download = 'qrCode.png';
    link.className="w-full"
    link.href = Url;
    link.click();
  };

  return (
    <div className='main'>
       <img src={Url}  alt="qr-code" style={{ opacity: Url ? 1 : 0 }} />
       <div>
       <input type="url" onChange={obj => setText(obj.target.value)} value={text} onKeyPress={handleKeyPress}  placeholder='Enter Url To Generate A Code'/>
       <p style={{ color: 'red' }} className='mt-2 mb-1'>{error}</p>
       </div>
       <button className='' onClick ={Generateqrcode} name='Generate'> Generate</button>
       <div style={{alignItems:"center", display:"flex"}}>
        <button style={{marginRight:20}} onClick={clearUrl} name='Clear' >Clear</button>
        <button onClick={downloadQRCode} disabled={!Url} name='Download'>Download</button>
       </div>
    </div>
  )
}



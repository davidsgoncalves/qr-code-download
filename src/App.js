import { QRCode } from 'react-qrcode-logo';
import logo from './logovakinha.png';
import './App.css';
import {useEffect, useState} from "react";
import html2canvas from "html2canvas";

function App() {
  const [url, setUrl] = useState('')
  const [style, setStyle] = useState('normal')
  const [dotStyle, setDotStyle] = useState('squares ')
  const [eyeColor, setEyeColor] = useState(null)
  const [eyeStyle, setEyeStyle] = useState(0)
  const [logoSize, setLogoSize] = useState(50)
  const [party, setParty] = useState('');

  const onChangeInput = (e) => {
    setUrl(e.target.value);
  }

  const onStyleChange = (e) => {
    setStyle(e.target.value)
  }

  const onLogoSizeChange = (e) => {
    setLogoSize(e.target.value);
  }

  useEffect(() => {
    if (style === 'normal') {
      setDotStyle('squares');
      setEyeColor(null);
      setEyeStyle(0);
      setParty('');
    }

    if (style === 'green') {
      setDotStyle('squares');
      setEyeColor('#009a4e');
      setEyeStyle(0);
      setParty('');
    }

    if (style === 'stylish') {
      const eyeRadius = [
        [10, 10, 0, 10], // top/left eye
        [10, 10, 10, 0], // top/right eye
        [10, 0, 10, 10], // bottom/left
      ];
      setDotStyle('dots');
      setEyeColor('#009a4e');
      setEyeStyle(eyeRadius);
      setParty('party');
    }

  }, [style]);

  const handleDownload = () => {
    html2canvas(document.querySelector('#react-qrcode-logo')).then((canvas) => {
      const link = document.createElement('a');
      link.download = 'react-qrcode-logo.png';
      link.href = canvas.toDataURL();
      link.click();
    });
  }

  return (
    <>
      <div className="green-section text section">
        Criador de QR Code do Vakinha
      </div>
      <div className="container">
        <div className="section">
          <div className="label-wrapper">
            <label className="text" htmlFor="link">Digite o link</label>
          </div>
          <div>
            <input className="input" id="link" onChange={onChangeInput} />
          </div>
        </div>
        <div className="qr-wrapper">
          <QRCode
            value={url}
            logoImage={logo}
            logoHeight={logoSize}
            logoWidth={logoSize}
            size={250}
            eyeColor={eyeColor}
            eyeRadius={eyeStyle}
            qrStyle={dotStyle}
          />
        </div>
        <div className="section">
          <div className="text label-wrapper">
            Tamanho da logo
          </div>
          <div className="">
            <input className="range" onChange={onLogoSizeChange} type="range" min="50" max="100" defaultValue={50} />
          </div>
        </div>
        <div className="section">
          <div className="text label-wrapper">
            Estilo?
          </div>
          <div className="inline-form">
            <div>
              <input type="radio" onChange={onStyleChange} value="normal" name="style" defaultChecked /> Normal
            </div>
            <div>
              <input type="radio" onChange={onStyleChange} value="green" name="style" /> Verde
            </div>
            <div>
              <input type="radio" onChange={onStyleChange} value="stylish" name="style" /> Estiloso
            </div>
          </div>
        </div>
        <div className="section">
          <button onClick={handleDownload} className={`button text ${party}`}>
            Baixar QRCode
          </button>
        </div>
        <div className="section">
          <div className="divider label-wrapper" />
          <div className="text disclaimer">
            Teste com a camera do celular antes de baixar.
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

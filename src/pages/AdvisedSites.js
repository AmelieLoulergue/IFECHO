import { Modal } from "bootstrap";
import { useState } from "react";

const AdvisedSites = () => {
  const [modal, setModal] = useState({
    card1: false,
    card2: false,
    card3: false,
    card4: false,
  });

  const modalClickHandler = (field) => {
    setModal({ ...modal, [field]: !modal[field] });
  };

  return (
    <main>
      <h1>{modal.card1.toString()}</h1>
      <h2>Mes élevages suivis</h2>
      <div className="grid-farms">
        <div className="farm ok" onClick={() => modalClickHandler("card1")}>
          <h3>BLANCHE MAISON</h3>
          <p>CT : 0</p>
          <p>THI : 24.7</p>
          <button className="ok">Détail</button>
          {/* {modal.card1 && <Modal/>} */}
        </div>
        <div className="farm danger" onClick={() => modalClickHandler("card2")}>
          <h3>TREVAREZ</h3>
          <p>CT : 15</p>
          <p>THI : 72.3</p>
          <button className="danger">Détail</button>
        </div>
        <div
          className="farm warning"
          onClick={() => modalClickHandler("card3")}
        >
          <h3>DERVAL</h3>
          <p>CT : 7</p>
          <p>THI : 46.1</p>
          <button className="warning">Détail</button>
        </div>
        <div
          className="farm warning"
          onClick={() => modalClickHandler("card4")}
        >
          <h3>TRINOTTIERES</h3>
          <p>CT : 5</p>
          <p>THI : 39.3</p>
          <button className="warning">Détail</button>
        </div>
      </div>
    </main>
  );
};

export default AdvisedSites;

import { useState } from "react";
import { useNavigate } from "react-router";

const AdvisedSites = () => {
  const navigate= useNavigate()

  const redirect = (farmName)=>{
    navigate(`/mes-elevages-conseilles/${farmName}`)
  }

  return (
    <main>
      <h2>Mes élevages suivis</h2>
      <div className="grid-farms">
        <div className="farm ok" onClick={()=>redirect("blanche-maison")} >
          <h3>BLANCHE MAISON</h3>
          <p>CT : 0</p>
          <p>THI : 24.7</p>
          <button className="ok">Détail</button>
          {/* {modal.card1 && <Modal/>} */}
        </div>
        <div className="farm danger" onClick={()=>redirect("trevarez")} >
          <h3>TREVAREZ</h3>
          <p>CT : 15</p>
          <p>THI : 72.3</p>
          <button className="danger">Détail</button>
        </div>
        <div
          className="farm warning" onClick={()=>redirect("derval")} >
          <h3>DERVAL</h3>
          <p>CT : 7</p>
          <p>THI : 46.1</p>
          <button className="warning">Détail</button>
        </div>
        <div
          className="farm warning"
         
          onClick={()=>redirect("trinottieres")} >
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

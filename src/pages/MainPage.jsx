import { useNavigate } from "react-router-dom";
import { useAddShoes } from "../hooks/useAddShoes";
import { useSelector } from "react-redux";

function MainPage() {  
    const shoes = useSelector((state)=> state.shoes.data)
    const addShoes = useAddShoes()
    const navigate = useNavigate();

    return (
      <>
      <div className="main-bg"></div>
      <div className='container'>
        <div className='row'>
          {
            shoes.map((a) => {
              const shoeId = a.id + 1;
              const imgUrl = "https://codingapple1.github.io/shop/shoes" + shoeId + ".jpg";
              return (
                <div className='col-md-4' key={a.id} onClick={()=>{
                    navigate('/detail/' + a.id)
                }}>
                  <img src={imgUrl} width="80%" />
                  <h4>{a.title}</h4>
                  <p>{a.price}</p>
                </div>
              );
            })
          }
        </div>
      </div>
      <button onClick={addShoes}>더보기</button>
      </>
    );
  }

  export default MainPage
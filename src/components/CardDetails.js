import React, { useEffect, useState } from 'react'
import './style.css'
import Table from 'react-bootstrap/Navbar'
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { DLT, REMOVE, add } from '../redux/actions/action';




const CardDetails = () => {
  const [data, setData] = useState([])
  const { id } = useParams()

  const history = useNavigate();

  const dispatch = useDispatch();


  const send = (e) => {
    dispatch(add(e))
  }

  const dlt = (id) => {
    dispatch(DLT(id));
    history("/");
  }

  const getData = useSelector((state) => state.cartReducer.carts);

  const compare = () => {
    let compareDate = getData.filter((e) => {
      return e.id == id
    })
    setData(compareDate)
  }


  const remove = (item) => {
    dispatch(REMOVE(item));
  }

  useEffect(() => {
    compare();
  }, [id])



  return (
    <>
      <div className="container mt-2 text-center">
        <h2>Items Details</h2>

        <section className="container mt-5">
          <div className="itemsdetails">
            {
              data.map((ele) => {
                return (
                  <>
                    <div className="items_img">
                      <img src={ele.imgdata} alt="" />
                    </div>
                    <div className="details">
                      <Table>
                        <tr>
                          <td>
                            <p> <strong>Restaurant : </strong> {ele.rname}</p>
                            <p> <strong>Price : </strong>₹ {ele.price}</p>
                            <p> <strong>Dishes : </strong>{ele.address}</p>
                            <p> <strong>Total : </strong> ₹ {ele.price * ele.qnty}</p>

                            <div className="mt-5 text-center d-flex justify-content-around align-items-center" style={{ width: 100, cursor: "pointer", background: "#ddd", color: "#111" }}>
                              <span style={{ fontSize: 24 }} onClick={ele.qnty <= 1 ? () => dlt(ele.id) : () => remove(ele)}>-</span>
                              <span style={{ fontSize: 24 }}>{ele.qnty}</span>
                              <span style={{ fontSize: 24 }} onClick={() => send(ele)}>+</span>

                            </div>
                          </td>
                          <td>
                            <p>
                              <strong>Rating :</strong><span style={{ background: "green", color: "#fff", padding: "2px 5px", borderRadius: "8px", marginLeft: "3px" }}>{ele.rating} ★</span>
                            </p>
                            <p>
                              <strong>Order Review :</strong><span>{ele.somedata}</span>
                            </p>
                            <p>
                              <strong>Remvoe:</strong><span onClick={() => dlt(ele.id)}><DeleteIcon sx={{ color: pink[500] }} style={{ cursor: "pointer" }} /></span>
                            </p>
                          </td>
                        </tr>
                      </Table>
                    </div>
                  </>
                )
              })
            }

          </div>
        </section>
      </div>
    </>
  )
}

export default CardDetails
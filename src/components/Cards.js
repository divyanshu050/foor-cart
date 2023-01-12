import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Cardsdata from './CardsData';
import './style.css'
import { useDispatch } from 'react-redux';
import { add } from '../redux/actions/action';

const Cards = () => {
  const [data, setData] = useState(Cardsdata)

  const dispatch = useDispatch()

  const send = (e) => {
    dispatch(add(e))
  }

  return (
    <div className="container mt-3">
      <h2 className='text-center' style={{ color: "orange", fontSize: "50px" }}> Food Cart</h2>
      <div className="wholeCard row d-flex justify-content-center align-items-center">
        {
          data.map((ele, id) => {
            return (
              <>
                <Card style={{ width: '22rem', border: "none" }} className="mx-2 mt-4 card_style">
                  <Card.Img src={ele.imgdata} style={{ height: "16rem", marginTop: "20px" }} />
                  <Card.Body>
                    <Card.Title>{ele.rname}</Card.Title>
                    <Card.Text>
                      Price: ₹ {ele.price}
                    </Card.Text>
                    <div className="button_div d-flex justify-content-center align-items-center ">
                      <Button variant="primary" onClick={() => send(ele)} className='col-lg-12'>Add to Cart</Button>
                    </div>

                  </Card.Body>
                </Card>
              </>
            )
          })
        }

      </div>
    </div>
  )
}

export default Cards
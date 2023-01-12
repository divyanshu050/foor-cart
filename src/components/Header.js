import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import { NavLink } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import './style.css'
import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import { pink } from '@mui/material/colors';
import { DLT } from '../redux/actions/action';



const Header = () => {

    const [price, setPrice] = useState(0);

    const getData = useSelector((state) => state.cartReducer.carts);
    console.log(getData);

    const dispatch = useDispatch();


    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const dlt = (id) => {
        dispatch(DLT(id))
    }

    const total = () => {
        let price = 0;
        getData.map((ele, k) => {
            price = ele.price * ele.qnty + price;
        })
        setPrice(price);
    }

    useEffect(() => {
        total()
    }, [total])

    return (
        <>
            <Navbar bg="dark" variant="dark" style={{ height: "70px" }}>
                <Container>
                    <NavLink to="/" className="text-decoration-none text-light">Add to Cart</NavLink>
                    {/* <Nav className="me-auto">
                        <NavLink to="/cart" className="text-decoration-none text-light mx-4">Home</NavLink>
                    </Nav> */}
                    <Badge badgeContent={getData.length} color="primary"
                        id="demo-positioned-button"
                        aria-controls={open ? 'demo-positioned-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={handleClick}>
                        <AddShoppingCartIcon color="primary" style={{ fontSize: 35, cursor: "pointer" }} />
                    </Badge>
                </Container>

                <Menu
                    id="demo-positioned-menu"
                    aria-labelledby="demo-positioned-button"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }} >

                    {
                        getData.length ?
                            <div className="card_details" style={{ width: "30rem", padding: 20 }}>
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>Photo</th>
                                            <th>Restaurent Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            getData.map((e) => {
                                                return (
                                                    <>
                                                        <tr>
                                                            <td><NavLink onClick={handleClose} to={`./cart/${e.id}`}><img src={e.imgdata} style={{ width: "5rem", height: "5rem", margin: "0.5rem" }} alt="" /></NavLink></td>
                                                            <td>
                                                                <p>{e.rname}</p>
                                                                <p>Price : ₹  {e.price}</p>
                                                                <p>Quantity : {e.qnty}</p>
                                                                <p className="smalltrash" onClick={() => dlt(e.id)}><DeleteIcon sx={{ color: pink[500] }} style={{ cursor: "pointer" }} /></p>
                                                            </td>
                                                            <td className="largetrash" onClick={() => dlt(e.id)}>
                                                                <DeleteIcon sx={{ color: pink[500] }} style={{ cursor: "pointer" }} />
                                                            </td>
                                                        </tr>
                                                    </>
                                                )
                                            })
                                        }
                                        <p className='text-center'>Total : ₹ {price} </p>
                                    </tbody>

                                </Table>
                            </div> : <div className="card-details d-flex justify-content-center align-items-center" style={{ width: "22rem", padding: 10, position: "relative" }}>
                                <ClearIcon onClick={handleClose} className='smallclose'
                                    style={{ top: 2, right: 20, fontSize: 25, cursor: "pointer", position: "absolute" }} />
                                <p style={{ fontSize: 22 }}>Your cart is empty</p>
                                <img src="https://cdn.pixabay.com/photo/2014/04/02/16/17/shopping-cart-306793_960_720.png" style={{ width: "8rem", padding: 10 }} class="emptycart_img" />
                            </div>
                    }

                </Menu>
            </Navbar>
        </>
    )
}

export default Header
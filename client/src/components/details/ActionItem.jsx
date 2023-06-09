import { useState } from 'react';
import { Box, Button, styled } from '@mui/material';

import { ShoppingCart as Cart, FlashOn as Flash } from '@mui/icons-material';

import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/actions/cartActions';

import { payUsingPaytm } from '../../service/api'
import { post } from '../../utils/paytm';

const LeftContainer = styled(Box)(({ theme }) => ({
    minWidth: '40%',
    padding: '40px 0 0 80px',
    [theme.breakpoints.down('lg')]: {
        padding: '20px 40px'
    }
}));

const Image = styled('img')({
    width: '90%',
    padding: '15px',
    border: '1px solid #f0f0f0'
});

const StyledButton = styled(Button)(({ theme }) => ({
    width: '48%',
    height: 50,
    borderRadius: 2,
    [theme.breakpoints.down('lg')]: {
        width: '46%'
    },
    [theme.breakpoints.down('sm')]: {
        width: '48%'
    }
}));

const ActionItem = ({ product }) => {

    const navigate = useNavigate();
    const { id } = product;

    const [quantity, setQuantity] = useState(1);

    const dispatch = useDispatch();

    const addItemToCart = () => {
        dispatch(addToCart(id, quantity))
        navigate('/cart');
    }

    const buyNow = async () => {
        let response = await payUsingPaytm({ amount: 500, email: 'shubham805822@gmail.com' });
        let information = {
            action: 'https://securegw-stage.paytm.in/order/process',
            params: response
        }
        post(information);
    }

    return (
        <LeftContainer>
            <Image src={product.detailUrl} alt='product' />
            <StyledButton variant='contained' onClick={() => addItemToCart()} style={{ marginRight: 10, background: '#ff9f00' }}><Cart />ADD TO CART</StyledButton>
            <StyledButton variant='contained' onClick={() => buyNow()} style={{ background: '#fb541b' }}><Flash />BUY NOW</StyledButton>
        </LeftContainer>
    )
}

export default ActionItem;
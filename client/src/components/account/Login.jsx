import styled from '@emotion/styled';
import {Box,Button,TextField,Typography} from '@mui/material';
import { useState,useContext } from 'react';
import { API } from '../../services/api';
import { DataContext } from '../../context/DataProvider';
import { useNavigate } from 'react-router-dom';

const Error=styled(Typography)`
    font-size:10px;
    color: #ff6161;
    line-height:0;
    margin-top:10px; 
    font-weight:600
` 

const Component= styled(Box)`
width:400px;
margin:auto;
box-shadow: 5px 2px 5px 2px rgb(0 0 0/0.6);
`;
const Image=styled('img')(
    {
        width: 100,
        margin: 'auto',
        display: 'flex',
        padding : '50px 0 0'

    }
)
const Wrapper = styled(Box)`
    padding: 25px 35px;
    display: flex;
    flex:1;
    flex-direction:column;
    & > div, & >button, &>p{
        margin-top: 20px;
    } 
`
const LoginButton= styled(Button)`
text-transform:none;
background:#F86418;
color:#fff;
height:48px;
border-radius:2px
`
const SignloginButton= styled(Button)`
text-transform:none;
background:#fff;
color:#2874f0;
height:48px;
border-radius:2px;
box-shadow:0 2px 4px 0 rgb(0 0 0/20%);
`
const signupInitialValues={
    name:'',
    username:'',
    password:''
}
const loginInitialValues={
    username:'',
    password:''
}
const Login=({isUserAuthenticated})=>{
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';
    const [account,toggleAccount]=useState('login');
    const [signup,setSignUp]=useState(signupInitialValues);
    const [login,setLogin]=useState(loginInitialValues);
    const [error,setError]=useState('');
    let navigate=useNavigate();

    const {setAccount}=useContext(DataContext);


    const onInputChange=(event)=>{
        setSignUp({...signup,[event.target.name]:event.target.value})
    }

    const onValueChange=(event)=>{
        setLogin({...login,[event.target.name]:event.target.value})
    }


    const signupUser= async ()=>{
      let response= await API.userSignup(signup);
       if(response.isSuccess){
        setError('');
        setSignUp(signupInitialValues);
        toggleAccount('login');
       }else{
        setError('Something went wrong! please try again later');
      }
    }


    const loginUser= async()=>{
       let response= await API.userLogin(login);
       if(response.isSuccess){
        setError('');
        sessionStorage.setItem('accessToken',`Bearer ${response.data.accessToken}`);
        sessionStorage.setItem('refreshToken',`Bearer ${response.data.refreshToken}`);
        setAccount({username:response.data.username,name:response.data.name});
        isUserAuthenticated(true);
        navigate('/');
       }else{
        setError('Something went wrong! please try again later');
       }
    }

    return(
        <Component>  
        <Box>
        <Image src={imageURL} alt='login'></Image>
        { account==='login'?
        <Wrapper>
        <TextField variant='standard' value={login.username} onChange={onValueChange} name='username' label='Enter Username'/>
        <TextField variant='standard' value={login.password} onChange={onValueChange} name='password' label='Enter  Password'/>
        {error && <Error>{error}</Error>}

        <LoginButton variant='contained' onClick={loginUser}>Login</LoginButton>
        <Typography style={{textAlign:'center',color:'#878787'}}>OR</Typography>
        <SignloginButton onClick={()=>{toggleAccount('signup')}}>Create an account</SignloginButton>
        </Wrapper>
        :

         <Wrapper>
        <TextField variant='standard' onChange={onInputChange} name='name' label='Enter Name'/>
        <TextField variant='standard' onChange={onInputChange} name='username' label='Enter Username'/>
        <TextField variant='standard' onChange={onInputChange} name='password' label='Enter  Password'/>
        {error && <Error>{error}</Error>}
        <SignloginButton onClick={signupUser}>SignUp</SignloginButton>
        <Typography style={{textAlign:'center',color:'#878787'}}>OR</Typography>
        <LoginButton variant='contained' onClick={()=>{toggleAccount('login')}}>Already have an account</LoginButton>
        </Wrapper>
        }
        </Box>
        </Component>
    );
}
export default Login; 
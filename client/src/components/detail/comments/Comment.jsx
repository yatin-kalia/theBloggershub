import {Box, Typography } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../../../context/DataProvider";
import {Delete} from "@mui/icons-material";
import {  styled } from "@mui/system";
import { API } from "../../../services/api";

const Component=styled(Box)`
margin-top: 30px;
background:#f5f5f5;
padding:10px;
`
const Container=styled(Box)`
display:flex;
margin-bottom:5px;
`

const Name=styled(Typography)`
font-weight:600;
font-size:18px;
margin-right:20px;

`
const StyleDate=styled(Typography)`
color:$878787;
font-size:14px;
`

const StyleDelete=styled(Delete)`
margin-left:auto;
`
const Comment=({comment,setToggle})=>{
    const {account}=useContext(DataContext);

    const removeComment=async()=>{
        let response=await API.deleteComment(comment._id);
        if(response.isSuccess){
            setToggle(prev=>!prev);
        }
    }

    return(
        <Component>
            <Container>
                <Name>{comment.name}</Name>
                <StyleDate>
                    {new Date(comment.date).toDateString()}
                </StyleDate>
                {comment.name===account.username && <StyleDelete onClick={removeComment}/> }
            </Container>
            <Box>
                <Typography>{comment.comments}</Typography>
            </Box>
        </Component>
    )
}
export default Comment;
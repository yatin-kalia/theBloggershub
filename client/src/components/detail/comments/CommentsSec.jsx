import { Button } from "@mui/material";
import { TextareaAutosize } from "@mui/material";
import { Box, styled } from "@mui/system";
import { useContext, useEffect, useState } from "react";
import {API} from '../../../services/api';
import { DataContext } from "../../../context/DataProvider";
import Comment from "./Comment";

const Container=styled(Box)`
margin-top:100px;
display:flex;
`;  
const Image=styled('img')({
    width:50,
    height:50,
    borderRadius:'50%'

})

const InitialValues={
    name:'',
    postId:'',
    comments:'',
    date: new Date()
}

const StyledTextarea=styled(TextareaAutosize)`
height:100px;
width:100%;
margin:0 20px;
`

const CommentsSec=({post})=>{
    const url = 'https://static.thenounproject.com/png/12017-200.png';

    const [comment,setComment]=useState(InitialValues);
    const [comments,setComments]=useState([]);
    const [toggle,setToggle]=useState(false);

    const {account}=useContext(DataContext);

    useEffect(()=>{
        const getData= async()=>{
            const response=await API.getAllComments(post._id);  
            if(response.isSuccess){
                setComments(response.data);
            }
        }
        if(post._id){
        getData();
        }
    },[post,toggle])

    const handleChange=(event)=>{
        setComment({
            ...comment,
            name:account.username,
            postId:post._id,
            comments:event.target.value
        }) ;
    }

    const addComment=async(event)=>{
        let response=await API.newComment(comment);
        if(response.isSuccess){ 
            setComment(InitialValues);
        }
        setToggle(prev=>!prev);
    }


    return(
        <Box>
            <Container>
                <Image src={url} alt="dp"/>
                <StyledTextarea
                    minRows={5}
                    placeholder="What is your comment?"
                    value={comment.comments}
                    onChange={handleChange}
                />
                <Button variant="contained" color="primary" size="medium" style={{height:40}}
                onClick={addComment}
                >Post</Button>
            </Container>
            <Box>
                {
                    comments && comments.length>0 && comments.map(comment=>(
                        <Comment comment={comment} setToggle={setToggle}/>
                    ))
                }
            </Box>
        </Box>
    )
}
export default CommentsSec;
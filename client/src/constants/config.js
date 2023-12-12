
// API_NOTIFICATIONS_MESSAGES
export const API_NOTIFICATIONS_MESSAGES={
    loading:{
        title:'loading...',
        message:'Data is being loaded , Please wait'
    },
    success:{
        title:'Success',
        message:'Data successfully loaded'
    },
    responseFailure:{
        title:'error',
        message:'An error occur while fetching from the server. Please try again'
    },
    requestFailure:{
        title:'error',
        message:'An error occured while parsing request data'
    },
    networkError:{
        title:'error',
        message:'unable to connect with the server.please check internet connectivity and try again later'
    }

}

// API SERVICE CALL
//SAMPLE REQUEST
// NEED SERVICE CALL:{url:'/',method:'POST/GET/PUT/DELETE' params:true/false,query:true/false}
export const SERVICE_URLS={
    userSignup:{url:'/signup',method:'POST'},
    userLogin:{url:'/login',method:'POST'},
    uploadFile:{url:'/file/upload',method:'POST'},
    createPost:{url:'create',method:'POST'},
    getAllPosts:{url:'/posts',method:'GET',params:true},
    getPostById:{url:'post',method:'GET',query:true},
    updatePost:{url:'update',method:'PUT',query:true},
    deletePost:{url:'delete',method:'DELETE',query:true},
    newComment:{url:'/comment/new',method:'POST'},
    getAllComments:{url:'comments',method:'GET',query:true},
    deleteComment:{url:'comment/delete',method:'DELETE',query:true}
}
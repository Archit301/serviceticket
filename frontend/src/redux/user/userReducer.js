const initialState={
    user:null,
    loading:false,
    error:null,
    adminRequests:[]
}



const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case 'USER_LOADING':
            return {...state,loading:true};
       case 'USER_SUCCESS':
         return {...state,user:action.payload,loading:false};
        case 'USER_ERROR':
         return { ...state, error: action.payload, loading: false };
        
         default:
            return state;



    }
}

export default userReducer;
export const SendSuccess = (res,message,data)=>{
    res.status(200).json({status: true , message , data}) // 200 = Ok update , get ,delete
}
export const SendCreate = (res,message,data)=>{
    res.status(201).json({status: true , message , data}) // 201 = Post
}
export const SendError400 = (res,message,error)=>{
    res.status(400).json({status: false , message , data: {}, error}) // 400 = Bad request
}
export const SendError401 = (res,message,error)=>{
    res.status(401).json({status: false , message , data: {}, error}) // 401 = UnAuthorization
}
export const SendError404 = (res,message,error)=>{
    res.status(404).json({status: false , message , data: {}, error}) // 404 = No Found
}
export const SendError500 = (res,message,error)=>{
    res.status(500).json({status: false , message , data: {}, error}) // 500 = Internal Server Error
}

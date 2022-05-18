import { gql } from "@apollo/client";


export const UPLOAD_AVATAR = gql`
    mutation uploadAvatar($file:Upload!){
        uploadAvatar(file:$file)
    }
`

export const UPLOAD_BACKGROUND = gql`
   mutation uploadBackground($file:Upload!){
        uploadBackground(file:$file)
    }
`

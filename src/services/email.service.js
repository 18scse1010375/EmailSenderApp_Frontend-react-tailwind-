import { customAxios } from "./helper";
export async function  sendEmailWithFiles(formData){

    console.log("sendEmailWithFile method is callling...")
    console.log(formData)

    

    const result = (await customAxios.post(`/send-with-files`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })).data;

    console.log(result)

}


    export async function  sendEmailWithoutFile(emailData){

        console.log("sendEmailWithoutFile method is callling...")
        
    
        
    
        const result = (await customAxios.post(`/send`, emailData)).data;
    
        console.log(result)

    }





    // const result=(await customAxios.post(`/send-with-file` , emailData,files[0] )).data

    // console.log("result are==>" , result )

    // return result;


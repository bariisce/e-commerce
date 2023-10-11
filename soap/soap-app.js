const soap=require("soap")
const fs=require("fs")
const express=require('express')
const bcrypt = require('bcrypt')

function passwordMaskingFunction(args){
    const incomingPassword = args.password
    const cryptedPassword=bcrypt.hash(incomingPassword,10)
    return {
        result:cryptedPassword
    }
}

const serviceObject={
    PasswordMaskingService:{
        PasswordMaskingServiceSoapPort:{
            PasswordMasking:passwordMaskingFunction,
        },
        PasswordMaskingServiceSoap12Port:{
            PasswordMasking:passwordMaskingFunction,
        },
    }
}

const xml=fs.readFileSync("service.wsdl",'utf8')
const app=express()

app.listen(8000,()=>{
    console.log("Listening on port 8000");
    const wsdl_path="/wsdl"
    soap.listen(app,wsdl_path,serviceObject,xml)
})
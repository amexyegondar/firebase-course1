import {auth} from '../config/firebase'
import {googleProvider} from '../config/firebase'
// import './auth.css'
import {useState} from 'react'
import {createUserWithEmailAndPassword,signInWithPopup,signOut} from 'firebase/auth'
import { async } from '@firebase/util'
export const Auth =()=>{
    const[email,setEmail]=useState('')
    const[password,setPassword]=useState('')
    console.log(auth?.currentUser?.photoURL)
    const signinwithgoogle= async()=>{
        try{
   await signInWithPopup(auth,googleProvider)
        }
        catch(err){
            console.log(err)
        }
    }
const signin= async()=>{
    try{
        await createUserWithEmailAndPassword(auth,email,password)
             }
             catch(err){
                 console.log(err)
             }

}
const logout= async()=>{
    try{
        await signOut(auth)
             }
             catch(err){
                 console.log(err)
             }
}
    return(
        <div className='auth'>
            <input type="email" placeholder="Email ..." onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)}/>
            <button onClick={signin}>Sign in</button>
            <button onClick={signinwithgoogle}>Sign with Google</button>
            <button onClick={logout}>LogOut</button>
        </div>
    )
}
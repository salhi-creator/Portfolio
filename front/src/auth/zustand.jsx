import { create } from "zustand";
import { persist } from "zustand/middleware";

const AuthInfo = create(persist(
    (set)=>({
        user:null,
        isSage:false,
        setSage: (d)=> set({user:d.name ,isSage:true, pass:d.pass})

    }),
    { name: "Sage-storage" },
))

export default AuthInfo
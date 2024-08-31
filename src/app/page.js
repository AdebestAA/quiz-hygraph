"use client"
import { redirect } from "next/dist/server/api-utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";


export default function Home() {
const [windowHeight,setWindowHeight] = useState(0)
const [user,setUser]= useState(false)
const router = useRouter()
  const listOfDivs = ["first div","second div","third div","fourth div","fifth div"]

  const formerClass = "flex min-h-screen flex-col items-center justify-between p-24"

  useEffect(()=>{

window.scrollTo({top:windowHeight,behavior:"smooth"})
console.log(windowHeight);

  },[windowHeight])

  const handleScroll = ()=>{
    const height = window.innerHeight
    console.log("play");
    if (windowHeight === 0) {
      setWindowHeight(window.innerHeight)
      return
    }
   setWindowHeight(prev => prev + height)
  }

  if (!user) {
    router.push("/quiz")
    return
  }

  return (
    <main className={""}>
{
  listOfDivs.map((div,index)=>{

    return (
<div key={index} className="bg-red-500 h-screen flex justify-center ">
  {div}
</div>

    )
  })
}

<button className="fixed w-16 h-12 bg-blue-500 bottom-[10%] right-[20%]"
onClick={handleScroll}
>Move</button>
    </main>
  );
}


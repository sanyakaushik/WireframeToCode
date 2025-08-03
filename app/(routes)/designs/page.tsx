"use client"
import { useAuthContext } from '@/app/provider'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DesignCard from './_components/DesignCard';
import { RECORD } from '@/app/view-code/[uid]/page';

function Designs() {

    const { user } = useAuthContext();
    const [wireframeList, setWireframeList] = useState([]);
    useEffect(() => {
        user && GetAllUserWireframe();
    }, [user])

    const GetAllUserWireframe = async () => {

        const result = await axios.get('/api/wireframe-to-code?email='
            + user?.email);
        console.log(result.data);
        setWireframeList(result.data);
    }

    return (
        <div className="w-full px-4 sm:px-6 lg:px-10">
          <h2 className="font-bold text-3xl text-center mt-10 mb-6">
            Wireframe & Codes
          </h2>
      
          <div className="grid gap-6 mt-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]">
            {wireframeList?.map((item: RECORD, index) => (
              <DesignCard key={index} item={item} />
            ))}
          </div>
        </div>
      )
      
      
}

export default Designs
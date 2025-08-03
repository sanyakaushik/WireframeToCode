"use client"
import { useAuthContext } from '@/app/provider'
import { Button } from '@/components/ui/button'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function Credits() {

    const { user } = useAuthContext();
    const [userData, setUserData] = useState<any>();
    useEffect(() => {
        user && GetUserCredits();
    }, [user])

    const GetUserCredits = async () => {
        if (!user?.email) {
            console.error("User email not available");
            return;
        }
        try {
            //setLoading(true);
            const result = await axios.post('/api/user', { 
                userEmail: user.email,
                //userName: user.name || "" // if you have a name field, or empty
            });
            console.log("Result from API:", result.data);
            setUserData(result.data);
        } catch (error) {
            console.error("Failed to fetch user credits:", error);
        } finally {
            //setLoading(false);
        }
    };
    
    
    

    return (
        <div>
            <h2 className='font-bold text-2xl'>Credits</h2>

            <div className='p-5 bg-slate-50 rounded-xl border
             flex justify-between items-center mt-6'>
                <div>
                    <h2 className='font-bold text-xl'>My Credits:</h2>
                    {userData?.credits && <p className='text-lg text-gray-500'>{userData?.credits} Credits left</p>}
                </div>
                
            </div>
        </div>
    )
}

export default Credits
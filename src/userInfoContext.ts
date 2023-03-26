import React from 'react';
import { User } from '@/types/User';

export const UserInfoContext = React.createContext<{ myInfo: User | null; setMyInfo: React.Dispatch<React.SetStateAction<User | null>>; }>(
    {myInfo:null,setMyInfo:()=>{}}
);

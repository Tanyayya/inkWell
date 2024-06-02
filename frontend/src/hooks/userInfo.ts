import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export interface User {
    name: string;
    email: string;
    password: string;
    about:string;
    posts:[]
    saved:[]
}

export const useUserInfo = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            axios.get(`${BACKEND_URL}/api/vi/user`, {
                headers: {
                    Authorization: localStorage.getItem("token"),
                },
            })
                .then(response => {
                    const userData = response.data.response;
                    setUser(userData);
                })
                .catch(error => {
                    console.error("Error fetching user data:", error);
                    setError("Error fetching user data");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setError("No token found");
            setLoading(false);
        }
    }, []);

    return { user, loading, error };
};
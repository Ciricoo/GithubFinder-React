import { UserProps } from "../types/user";
import Search from "../components/Search";
import { useState } from "react";
import User from "../components/User";
import Error from "../components/Error";

const Home = () => {
    const [user, setUser] = useState<UserProps | null>(null);
    const [error, setError] = useState(false);

    const loadUser = async(userName: string) =>{
        setError(false)
        setUser(null)
        const res = await fetch(`https://api.github.com/users/${userName}`);
        const data = await res.json();

        if(res.status === 404){
            setError(true);
            return
        }

        const {avatar_url, login, location, followers, following, bio} = data;

        const userData: UserProps = {
            avatar_url,
            login, 
            location,
            followers,
            following,
            bio,
        };

        setUser(userData);
    }
    return <div>
        <Search loadUser={loadUser} />
        {user && <p><User {...user} /></p>}
        {error && <Error />}
    </div>
}

export default Home;

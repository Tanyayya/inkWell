import { Appbar } from "../components/Appbar";
import { Loader } from "../components/Loader";
import { useUserInfo } from "../hooks/userInfo";

export const UserPage = () => {
    const { loading, error, user } = useUserInfo(); // Destructure as an object

    if (loading) {
        return (
            <div>
                <Appbar />
                <Loader message="Loading Author Details" />
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Appbar />
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div>
            <Appbar />
            <div>
                {/* Render user details here */}
                {user && (
                    <div>
                        <p>Name: {user.name}</p>
                        <p>Email: {user.email}</p>
                        {/* Add other user details here */}
                    </div>
                )}
            </div>
        </div>
    );
};

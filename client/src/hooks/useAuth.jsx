import Cookies from "js-cookie";
function useAuth() {
    const token = Cookies.get("token");
    return token;
}

export default useAuth;

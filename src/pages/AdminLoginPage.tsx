import AdminLoginForm from "../components/AdminLoginForm";

const AdminLoginPage = () => {
    if(localStorage.getItem("accessTokenAdmin")){
        window.open("/admin","_self");
    }
    return <div className="page">
        <AdminLoginForm />
    </div>
}
export default AdminLoginPage;
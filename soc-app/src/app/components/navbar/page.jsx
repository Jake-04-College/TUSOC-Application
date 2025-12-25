import MobileNavbar from "./MobileNavbar";

export default function NavbarDevPage() {

    return (
        <div>
            <h1>Navbar Preview</h1>
            <p>Testing the mobile navbar rendering.</p>
            <MobileNavbar isLoggedIn={true} isManager={true} />
        </div>
    );
}
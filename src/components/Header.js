import logo from '../images/logo.svg';
export default function Header() {
    return (
        <header className="header">
        <img className="header__logo" src={logo} alt="logo Around the U.S." />
        <span className="header__divider"></span>
      </header>
    );
}

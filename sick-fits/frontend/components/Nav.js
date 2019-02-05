import Link from "next/link";
import NavStyles from "./styles/NavStyles";

// from line 5 to 9 => the boarder will appear at the top of the page by navigating between pages
import NProgress from "nprogress";
import Router from "next/router";
Router.onRouteChangeStart = () => NProgress.start();
Router.onRouteChangeComplete = () => NProgress.done();
Router.onRouteChangeError = () => NProgress.done();

const Nav = () => {
  return (
    <NavStyles>
      <Link href="/item">
        <a>Item</a>
      </Link>
      <Link href="/second">
        <a>Sell</a>
      </Link>
      <Link href="/signUp">
        <a>Sign up</a>
      </Link>
      <Link href="/orders">
        <a>Orders</a>
      </Link>
      <Link href="/account">
        <a>Account</a>
      </Link>
    </NavStyles>
  );
};

export default Nav;

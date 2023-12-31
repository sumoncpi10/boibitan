import React, { useState } from "react";
import Link from "next/link";
import { Button, Drawer } from "antd";
import { useSelector } from "react-redux";
import { CloseOutlined } from "@ant-design/icons";

import productsData from "../../../data/product.json";
import CartSidebar from "../../cart/CartSidebar";
import WishlistSidebar from "../../wishlist/WishlistSidebar";
import MenuSidebar from "./MenuSidebar";
import SearchBar from "./SearchBar";
import { getTotalProductInCart } from "../../../common/shopUtils";
import Container from "../../other/Container";

function Menu({ containerType }) {
  const cartState = useSelector((state) => state.cartReducer);
  const wishlistState = useSelector((state) => state.wishlistReducer);
  const [cartSidebarOpen, setCartSidebarOpen] = useState(false);
  const [menuSidebarOpen, setMenuSidebarOpen] = useState(false);
  const [wishlistSidebarOpen, setWishlistSidebarOpen] = useState(false);

  return (
    <>
      <div className="menu">
        <Container type={containerType}>
          <div className="menu-wrapper">
            <Link href="/">
              <img src="/assets/images/logo (1).png" alt="Logo" />
            </Link>
            <SearchBar fillData={productsData} placeholder="What are you looking for?" />
            <div className="menu-functions">

              <div className="menu-function-item" onClick={() => setWishlistSidebarOpen(true)}>
                <img src="/assets/images/header/menu-wishlist.png" alt="" />
                <span>{wishlistState.length}</span>
              </div>
              <div className="menu-function-item" onClick={() => setCartSidebarOpen(true)}>
                <img src="/assets/images/header/menu-bag.png" alt="" />
                <span>{getTotalProductInCart(cartState)}</span>
              </div>
              <Button>
                <Link href="\login">Login</Link>
              </Button>
            </div>
          </div>
        </Container>
      </div>
      <div className="menu-mobile-search">
        <Container>
          <SearchBar fillData={productsData} placeholder="Searching..." />
        </Container>
      </div>
      <Drawer
        placement="right"
        title={`Wishlist (${wishlistState.length})`}
        closable={true}
        onClose={() => setWishlistSidebarOpen(false)}
        closeIcon={<CloseOutlined />}
        visible={wishlistSidebarOpen}
        width={445}
        className="menu-side"
      >
        <WishlistSidebar />
      </Drawer>
      <Drawer
        placement="right"
        title={`Shopping cart (${getTotalProductInCart(cartState)})`}
        closable={true}
        onClose={() => setCartSidebarOpen(false)}
        closeIcon={<CloseOutlined />}
        visible={cartSidebarOpen}
        width={445}
        className="menu-side"
      >
        <CartSidebar />
      </Drawer>
      <Drawer
        placement="right"
        closable={true}
        title=" "
        onClose={() => setMenuSidebarOpen(false)}
        closeIcon={<CloseOutlined />}
        visible={menuSidebarOpen}
        width={350}
        className="menu-side"
      >
        <MenuSidebar />
      </Drawer>
    </>
  );
}

export default React.memo(Menu);

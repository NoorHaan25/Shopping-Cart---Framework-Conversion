import { Link, useNavigate } from 'react-router-dom';
import LogoImg from '../../images/logo.jpg';
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { supabase } from '../../supabaseClient';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { incrementQuantity, decrementQuantity } from '../../rtk/Slices/cart-slice'

function Header() {
  const [user, setUser] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const favorites = useSelector((state) => state.favorites);
  // console.log('cart items in header:', cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // fetch user data
  const fetchUser = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
    setDisplayName(user?.user_metadata?.display_name || "");
  };
  // listen for auth changes
  useEffect(() => {
    fetchUser(); // initial fetch
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      setDisplayName(session?.user?.user_metadata?.display_name || "");
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);
  // logout
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setDisplayName("");
    navigate("/signin");
  };
  return (
    <header className="bg-blue-600 text-white fixed top-0 left-0 w-full z-[200]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-[70px]">
          {/* Logo */}
          <Link to="/" className="inline-block">
            <img
              src={LogoImg}
              alt="Logo"
              className="w-[100px] h-[60px] object-contain"
            />
          </Link>
          {/* Welcome */}
          {user && (
            <div className="text-white font-bold mx-2 text-sm sm:text-base md:text-lg">
              Welcome, {displayName.charAt(0).toUpperCase() + displayName.slice(1)}
            </div>
          )}
          {/* Nav */}
          <nav className="flex items-center gap-4">
            <ul className="flex items-center gap-3 text-sm sm:text-base">
              {!user ? (
                <>
                  <li>
                    <Link
                      to="/signin"
                      className="block px-2 py-1 font-semibold hover:underline"
                    >
                      Sign In
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/signup"
                      className="block px-2 py-1 font-semibold hover:underline"
                    >
                      Sign Up
                    </Link>
                  </li>
                </>
              ) : (
                <li>
                  <button
                    onClick={handleLogout}
                    className="block px-2 py-1 font-semibold hover:underline"
                  >
                    Logout
                  </button>
                </li>
              )}
            </ul>

            {/* Cart & Favorites */}
            {user && (
              <div className="flex items-center gap-4">
                {/* Cart */}
                <div className="relative">
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2">
                    {cart.length}
                  </span>
                  <div
                    onClick={() => setIsCartOpen(!isCartOpen)}
                    className="cursor-pointer"
                  >
                    <AiOutlineShoppingCart className="text-2xl sm:text-3xl hover:text-gray-200" />
                  </div>

                  {/* Dropdown Cart */}
                  {isCartOpen && (
                    <ul className="absolute right-0 top-10 mt-2 min-w-72 bg-white text-black rounded-md shadow-lg max-h-72 overflow-y-auto">
                      {cart.length === 0 ? (
                        <li className="px-4 py-4 flex justify-center">
                          Your cart is empty
                        </li>
                      ) : (
                        <>
                          {cart.map((item) => {
                            const quantity = item.quantity * item.sale_price;
                            return (
                              <li
                                key={item.id}
                                className="flex items-center justify-between px-4 py-3 border-b border-gray-200"
                              >
                                <span className="font-medium">{item.title}</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-green-600 text-sm sm:text-base">
                                    {quantity}
                                  </span>
                                  <div className="flex items-center gap-2">
                                    <button
                                      onClick={() =>
                                        dispatch(decrementQuantity(item.id))
                                      }
                                      className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                                    >
                                      -
                                    </button>
                                    <span className="w-6 text-center">
                                      {item.quantity}
                                    </span>
                                    <button
                                      onClick={() =>
                                        dispatch(incrementQuantity(item.id))
                                      }
                                      className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded hover:bg-gray-300 flex items-center justify-center"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                          <li className="px-4 py-2 text-center">
                            <Link
                              to="/cart"
                              className="text-blue-600 hover:underline"
                            >
                              View Cart
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  )}
                </div>

                {/* Favorites */}
                <div
                  className="relative cursor-pointer"
                  onClick={() => navigate("/favorites")}
                >
                  <span className="absolute -top-2 -right-2 bg-red-500 text-xs text-white rounded-full px-2">
                    {favorites.length}
                  </span>
                  <FaRegHeart className="text-2xl sm:text-3xl hover:text-gray-200" />
                </div>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>

  );
}

export default Header;


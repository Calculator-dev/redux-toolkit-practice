import CartContainer from "./components/CartContainer";
import { Navbar } from "./components/Navbar";
import {useDispatch, useSelector} from "react-redux"
import { calculateTotal, getCartItems } from "./features/cart/cartSlice";
import {useEffect} from "react";
import Modal from "./components/Modal";


function App() {
  const {cartItems, isLoading} = useSelector((state) => state.cart)
  const {isOpen} = useSelector((store) => store.modal)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(calculateTotal())
  }, [dispatch, cartItems])

  useEffect(() => {
    dispatch(getCartItems())
  }, [dispatch])
  
  if (isLoading) {
    return (
      <div className="loading">
        <h1>Loading...</h1>
      </div>
    )
  }

  return <main>
    {isOpen && <Modal />}
    <Navbar />
    <CartContainer />
  </main>
  ;
}
export default App;

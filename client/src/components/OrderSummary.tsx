import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { MoveRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import {loadStripe} from "@stripe/stripe-js";
import axiosInstance from "../lib/axios";
import { useEffect, useState } from "react";


const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`);

const OrderSummary = () => {
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const { total, subtotal, coupon, isCouponApplied, cart } = useCartStore();

  const savings = subtotal - total;
  const formattedSubtotal = subtotal.toFixed(2);
  const formattedTotal = total.toFixed(2);
  const formattedSavings = savings.toFixed(2);
  const formattedRemaining = remaining.toFixed(2);

  useEffect(() => {
    setRemaining(200 - total);
  },[remaining, total])


  const handlePayment = async () => {
    setLoading(true);
    const stripe = await stripePromise;
		const res = await axiosInstance.post("/payments/create-checkout-session", {
			products: cart,
			couponCode: coupon ? coupon.code : null,
		});

		const session = res.data;
    const result = await stripe?.redirectToCheckout({
			sessionId: session.id,
		});

    setLoading(false);

    if (result?.error) {
			console.error("Error:", result.error);
      setLoading(false);
		}
  }

  return (
    <motion.div
      className="space-y-4 rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-xl font-semibold text-emerald-400">Order summary</p>

      <div className="space-y-4">
        <div className="space-y-2">
          <dl className="flex items-center justify-between gap-4">
            <dt className="text-base font-normal text-gray-300">
              Original price
            </dt>
            <dd className="text-base font-medium text-white">
              ${formattedSubtotal}
            </dd>
          </dl>

          {savings > 0 && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">Savings</dt>
              <dd className="text-base font-medium text-emerald-400">
                -${formattedSavings}
              </dd>
            </dl>
          )}
          {coupon && isCouponApplied && (
            <dl className="flex items-center justify-between gap-4">
              <dt className="text-base font-normal text-gray-300">
                Coupon ({coupon.code})
              </dt>
              <dd className="text-base font-medium text-emerald-400">
                -{coupon.discountPercentage}%
              </dd>
            </dl>
          )}
          <dl className="flex items-center justify-between gap-4 border-t border-gray-600 pt-2">
            <dt className="text-base font-bold text-white">Total</dt>
            <dd className="text-base font-bold text-emerald-400">
              ${formattedTotal}
            </dd>
          </dl>
        </div>
        <motion.button
          className="flex w-full items-center justify-center rounded-lg bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePayment}
        >
          {loading ? "Processing..." : "Proceed to Checkout"}
        </motion.button>

        { total < 200 ? (<motion.h3>
          <p className="text-sm font-normal text-gray-400">Add <span className="text-emerald-400">{formattedRemaining}$</span> more to get <span className="text-emerald-400">10% off</span> on next order</p>
        </motion.h3>) : (
          <p className="text-sm font-normal text-gray-400"><span className="text-emerald-400">10% off</span> on next order</p>
        )}


        <div className="flex items-center justify-center gap-2">
          <span className="text-sm font-normal text-gray-400">or</span>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-emerald-400 underline hover:text-emerald-300 hover:no-underline"
          >
            Continue Shopping
            <MoveRight size={16} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderSummary;
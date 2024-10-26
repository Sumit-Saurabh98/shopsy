import LoadingSpinner from "../components/LoadingSpinner";
import { useOrderStore } from "../stores/useOrderStore";
import { motion } from "framer-motion";

const OrderList = () => {
  const { customerOrder, loadingCustomerOrder } = useOrderStore();

  console.log(customerOrder, "OrderList for customer orders");

  // Function to determine the status circle color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-400";
      case "accepted":
        return "bg-green-500";
      case "shipped":
        return "bg-orange-500";
      case "delivered":
        return "bg-green-800";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-300";
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      {loadingCustomerOrder && <LoadingSpinner />}
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-400">
        Order History
      </h1>
      {customerOrder.length > 0 ? (
        customerOrder.map((order) => (
          <motion.div
            key={order._id}
            className="border border-gray-300 rounded-lg p-6 mb-6 shadow-lg transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <h2 className="text-xl font-bold mb-4 text-emerald-500"><span className="text-gray-300">Order ID:</span> {order._id}</h2>
            {order.products.map((product) => (
              <div
                key={product._id}
                className="flex items-center mb-4 border-b border-gray-200 pb-4"
              >
                <img
                  src={product.productId.image}
                  alt={product.productId.name}
                  className="w-24 h-24 object-cover rounded-md shadow-md mr-4"
                />
                <div className="flex-grow">
                  <p className="text-lg font-semibold text-gray-300">
                    {product.productId.name}
                  </p>
                  <p className="text-gray-600">Quantity: {product.quantity}</p>
                  <p className="text-gray-500 font-bold">
                    Price: ${product.price.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
            <div className="flex items-center mb-2">
              <div
                className={`w-3 h-3 rounded-full mr-2 ${getStatusColor(
                  order.orderStatus
                )}`}
              ></div>
              <p
                className={`mb-2 ${
                  order.orderStatus === "pending" ? "text-yellow-600" : ""
                }`}
              >
                Order Status:{" "}
                {order.orderStatus.charAt(0).toUpperCase() +
                  order.orderStatus.slice(1)}
              </p>
            </div>
            {/* New Section for Total Amount and Dates */}
            <p className="text-lg font-bold mt-4 text-gray-300">
              Total Amount: ${order.totalAmount.toFixed(2)}
            </p>
            <p className="text-gray-600">
              Ordered Date: {new Date(order.createdAt).toLocaleDateString()}
            </p>
            <p className="text-gray-600">
              Last Updated: {new Date(order.updatedAt).toLocaleDateString()}
            </p>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-500">No orders found.</p>
      )}
    </div>
  );
};

export default OrderList;

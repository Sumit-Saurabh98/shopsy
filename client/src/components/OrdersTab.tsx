
import { useOrderStore } from "../stores/useOrderStore";
import LoadingSpinner from "./LoadingSpinner";

const OrdersTab = () => {
  const { allOrder, loadingAllOrder, orderStatusChanged } = useOrderStore();

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
        return "bg-white";
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
   orderStatusChanged(orderId, newStatus);
  };

  return (
    <div>
      {loadingAllOrder && <LoadingSpinner />}
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-400">
        All Orders
      </h1>
      {allOrder.length > 0 ? (
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr>
              <th className="border border-emerald-400 px-4 py-2">Order ID</th>
              <th className="border border-emerald-400 px-4 py-2">
                Customer Name
              </th>
              <th className="border border-emerald-400 px-4 py-2">
                Customer Email
              </th>
              <th className="border border-emerald-400 px-4 py-2">
                Order Date
              </th>
              <th className="border border-emerald-400 px-4 py-2">
                Last update
              </th>
              <th className="border border-emerald-400 px-4 py-2">
                Total Price
              </th>
              <th className="border border-emerald-400 px-4 py-2">
                Order status
              </th>
            </tr>
          </thead>
          <tbody>
            {allOrder.map((order) => (
              <tr key={order._id}>
                <td className="border border-emerald-400 px-4 py-2">
                  {order._id}
                </td>
                <td className="border border-emerald-400 px-4 py-2">
                  {order.userId.name}
                </td>
                <td className="border border-emerald-400 px-4 py-2">
                  {order.userId.email}
                </td>
                <td className="border border-emerald-400 px-4 py-2">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="border border-emerald-400 px-4 py-2">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </td>
                <td className="border border-emerald-400 px-4 py-2">
                  ${order.totalAmount}
                </td>
                <td className="border border-emerald-400 px-4 py-2">
                  <select
                    className={`border border-emerald-400 text-black ${getStatusColor(
                      order.orderStatus
                    )}`}
                    value={order.orderStatus}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-center text-emerald-400">No orders found</p>
      )}
    </div>
  );
};

export default OrdersTab;
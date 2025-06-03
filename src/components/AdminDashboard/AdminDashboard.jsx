import styles from "./adminDash.module.css";
import { useInventory } from "../../context/inventory/inventoryContext";
import AdminDashItem from "./AdminDashItem";

export default function AdminDashboard() {
  const { inventory } = useInventory();

  function adminDash() {
    return (
      <>
        {inventory.map((item) => {
          return <AdminDashItem key={item._id} {...item} />;
        })}
      </>
    );
  }

  return inventory ? (
    <table className={styles.tableStyle}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Price</th>
          <th>InStock</th>
          <th>Options</th>
        </tr>
      </thead>
      <tbody>{adminDash()}</tbody>
    </table>
  ) : (
    <h2>Loading</h2>
  );
}

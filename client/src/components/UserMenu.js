
import { NavLink } from "react-router-dom"
const UserMenu = () => {
  return (
    <>
      <div className="list-group">
 <h1>DashBoard</h1>
  <NavLink to="/dashboard/user/profile" className="list-group-item list-group-item-action">Profile</NavLink>
  <NavLink to="/dashboard/user/orders" className="list-group-item list-group-item-action">orders</NavLink>
</div>
    </>
  )
}

export default UserMenu

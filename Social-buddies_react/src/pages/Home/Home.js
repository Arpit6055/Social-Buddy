import Feed from "../../components/Feed/Feed"
import Rightbar from "../../components/Rightbar/Rightbar"
import Sidebar from "../../components/Sidebar/Sidebar"
import Topbar from "../../components/Topbar/Topbar"
import './Home.css'
export default function Home() {
  return (
    <div>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
  </div>
  )
}

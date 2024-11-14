import "./style.css";
import List from "../../component/accomodation/list";
import Topbar from "src/component/topbar";

const AccommodationList = () => {

  return (
    <div className="AccommodationList">
          <Topbar />
      <div className="app-container">
        <div className="content-container">
        {/* <Filter /> */}
        <List/>
        </div>
      </div>
    </div>
  );
};

export default AccommodationList;

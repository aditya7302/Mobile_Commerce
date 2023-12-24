import React from "react";
import Layout from "./../../components/Layout/Layout";
import { useAuth } from "../../context/auth";
import UserMenu from "../../components/Layout/UserMenu";

const Dashboard = () => {
  const [auth] = useAuth();

  return (
    <Layout>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className="flex flex-col md:flex-row">
          {/* Admin Menu */}
          <div className="md:w-1/4">
            <UserMenu />
          </div>
          {/* Admin Details */}
          <div className="md:w-3/4">
            <div className="card w-full p-3">
              <h3> User Name : {auth?.user?.name}</h3>
              <h3> User Email : {auth?.user?.email}</h3>
              <h3> User Contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

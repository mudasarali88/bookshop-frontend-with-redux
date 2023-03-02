import React, { useEffect, useState, Fragment } from "react";
import Card from "../../../common/Card";
import { getCurrentUser } from "../../../helper/helper";
import { purchaseHistory, getPurchaseHistory } from "../../userSlice";
import { useSelector, useDispatch } from "react-redux";

function ContentBody(props) {
  const dispatch = useDispatch();
  const purchasedHistory = useSelector(purchaseHistory);
  const user = getCurrentUser();
  const userId = user._id;

  useEffect(() => {
    dispatch(getPurchaseHistory(userId));
  }, []);
  const isAdmin = user && user.role === 1;
  const title = user.role === 1 ? "Admin Information" : "User Information";
  const userRole = user.role === 1 ? "Admin" : "Registered User";

  const userInfo = [
    { keys: `${user.name}` },
    { keys: `${user.email}` },
    { keys: `${userRole}` },
  ];
  const adminInfo = [
    { keys: `${user.name}` },
    { keys: `${user.email}` },
    { keys: `${userRole}` },
  ];
  const info = isAdmin ? adminInfo : userInfo;

  return (
    <Fragment>
      <div>
        <Card title={title}>
          <ul className="list-group">
            {info.map((i) => (
              <li key={i.keys} className="list-group-item">
                {i.keys}
              </li>
            ))}
          </ul>
        </Card>
      </div>
      {purchasedHistory && (
        <div className="mt-5">
          <Card title="Purchase History">
            <ul className="list-group">
              {purchasedHistory?.map((h, i) => {
                return (
                  <div key={i} style={{ borderBottom: "3px solid black" }}>
                    <li className="list-group-item">
                      Status : {h && h.status}
                    </li>
                    {h &&
                      h.products?.map((p, i) => (
                        <li
                          key={i}
                          className="d-flex justify-content-between list-group-item"
                        >
                          <span>Name : {p && p.name}</span>
                          <span>Price : {p && p.price}</span>
                          <span>Quantity : {p && p.count}</span>
                        </li>
                      ))}
                  </div>
                );
              })}
            </ul>
          </Card>
        </div>
      )}
    </Fragment>
  );
}

export default ContentBody;

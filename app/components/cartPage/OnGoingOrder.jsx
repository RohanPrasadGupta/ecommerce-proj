import React from "react";
import GlobalButton from "../Buttons/GlobalButton";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

export default function OnGoingOrder() {
  return (
    <div className="flex flex-col md:flex-row bg-gray-100 p-6 ">
      <div className="w-full bg-white p-6 rounded-lg shadow-md ">
        <table className="w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left">Product</th>
              <th className="text-left">Status</th>
              <th className="text-left">Quantity</th>
              <th className="text-left">Total</th>
              <th className="text-left">Order Date</th>
              <th className="text-left"></th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="flex items-center py-4">
                {/* <img
                  src={item?.product?.thumbnail}
                  alt={item?.product?.title}
                  className="w-16 h-16 mr-4 rounded-md"
                  /> */}
                <div>
                  <p>title</p>
                  <div className="flex items-center gap-2">
                    <p>brand</p>
                    <p>status</p>
                  </div>
                </div>
              </td>
              <td>status</td>
              <td>4</td>
              <td className="flex items-center gap-2">
                <span>Total Price</span>
              </td>
              <td className="font-semibold">Date</td>
              <td>
                <GlobalButton
                  type="button"
                  text="Cancel Order"
                  theme="outline"
                  width="fit-content"
                  height="40px"
                  icon={<CloseOutlinedIcon />}
                  // onClick={() => {}}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

import React from "react";

const mockData = [
  {
    srNo: 1,
    matterName: "JHUNSONS CHEMICALS PVT LTD",
    meetingTitle: "12th COC MEETING OF JHUNSONS CHEMICALS PVT LTD",
    startDate: "06 May 2025 | 17:00:00",
    endDate: "28 May 2025 | 19:00:00",
    status: "Completed",
  },
  // ... add more items as needed
];

const VoteStatus = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-800 mb-6">Vote Status</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-blue-100 text-blue-900 text-left">
            <tr>
              <th className="p-3">Sr No</th>
              <th className="p-3">Name of Matter</th>
              <th className="p-3">Title of Meeting</th>
              <th className="p-3">Start Date & Time</th>
              <th className="p-3">End Date & Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockData.map((item, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3">{item.srNo}</td>
                <td className="p-3">{item.matterName}</td>
                <td className="p-3">{item.meetingTitle}</td>
                <td className="p-3">{item.startDate}</td>
                <td className="p-3">{item.endDate}</td>
                <td className="p-3">
                  <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                    {item.status}
                  </span>
                </td>
                <td className="p-3 flex gap-2">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm">
                    View
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VoteStatus;

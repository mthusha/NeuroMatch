// import React from 'react';
// import {
//   AreaChart,
//   Area,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';

// const data = [
//   { name: 'A', value: 10 },
//   { name: 'B', value: 50 },
//   { name: 'C', value: 20 },
//   { name: 'D', value: 40 },
//   { name: 'E', value: 5 },
//   { name: 'F', value: 30 },
//   { name: 'G', value: 15 },
// ];

// const NeuralChart = () => {
//   return (
//     <div className="w-full h-64">
//       <ResponsiveContainer width="100%" height="100%">
//         <AreaChart
//           data={data}
//           margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//         >
//           <defs>
//             <linearGradient id="colorRed" x1="0" y1="0" x2="0" y2="1">
//               <stop offset="5%" stopColor="#f87171" stopOpacity={0.8} />
//               <stop offset="95%" stopColor="#f87171" stopOpacity={0} />
//             </linearGradient>
//           </defs>
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Area
//             type="monotone"
//             dataKey="value"
//             stroke="#f87171"
//             fillOpacity={1}
//             fill="url(#colorRed)"
//             activeDot={{ r: 6 }}
//           />
//         </AreaChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default NeuralChart;

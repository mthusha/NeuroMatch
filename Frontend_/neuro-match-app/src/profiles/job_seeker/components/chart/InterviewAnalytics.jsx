import React from "react";
import { Line, Bar, Radar } from "react-chartjs-2";
import { FaChartLine, FaChartBar, FaChartArea } from "react-icons/fa";

const InterviewAnalytics = ({ chartData, barChartData, radarChartData, timeComparisonData }) => {

   return (
      <div className="lg:col-span-2 space-y-6">
            {/* Line Chart */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center">
                <FaChartLine className="text-indigo-500 mr-2" /> Score Trend Over Time
              </h3>
              <div className="h-64">
                <Line 
                  data={chartData} 
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: true,
                        position: 'top',
                        labels: {
                          color: '#6b7280',
                          font: {
                            family: 'Inter, sans-serif',
                            size: 0,
                            weight: '500'
                          },
                          padding: 20,
                          boxWidth: 12,
                          usePointStyle: true
                        }
                      },
                      tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleFont: {
                          family: 'Inter, sans-serif',
                          size: 12,
                          weight: 'bold'
                        },
                        bodyFont: {
                          family: 'Inter, sans-serif',
                          size: 12
                        },
                        padding: 12,
                        cornerRadius: 8,
                        displayColors: true,
                        callbacks: {
                          label: function(context) {
                            return `${context.dataset.label}: ${context.parsed.y}`;
                          }
                        }
                      }
                    },
                    scales: {
                      x: {
                        grid: {
                          display: false,
                          drawBorder: false
                        },
                        ticks: {
                          color: '#9ca3af',
                          font: {
                            family: 'Inter, sans-serif',
                            size: 11
                          },
                          callback: function(value, index) {
                            return index + 1;
                          }
                        }
                      },
                      y: {
                        beginAtZero: true,
                        max: 10,
                        grid: {
                          color: 'rgba(229, 231, 235, 0.5)',
                          drawBorder: false
                        },
                        ticks: {
                          color: '#9ca3af',
                          font: {
                            family: 'Inter, sans-serif',
                            size: 11
                          },
                          stepSize: 1,
                          padding: 10
                        }
                      }
                    },
                    elements: {
                      line: {
                        borderWidth: 2,
                        tension: 0.3
                      },
                      ppoint: {
                         radius: 0,
                         hoverRadius: 0
                      }
                    },
                    interaction: {
                      intersect: false,
                      mode: 'index'
                    }
                  }}
                />
                {/* <label>Qesion</label> */}
              </div>
            </div>

            {/* Bottom Row - Smaller Charts */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                  <FaChartBar className="text-blue-500 mr-2" /> Avg Scores
                </h3>
                <div className="h-48">
                  <Bar 
                    data={barChartData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: '#6b7280',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 0
                            },
                            boxWidth: 12,
                            usePointStyle: true
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          titleFont: {
                            family: 'Inter, sans-serif',
                            size: 12,
                            weight: 'bold'
                          },
                          bodyFont: {
                            family: 'Inter, sans-serif',
                            size: 12
                          },
                          padding: 10,
                          cornerRadius: 6,
                          displayColors: true,
                          callbacks: {
                            label: function(context) {
                              return `Avg: ${context.parsed.y.toFixed(1)}`;
                            }
                          }
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            drawBorder: false
                          },
                          ticks: {
                            color: '#9ca3af',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 11
                            }
                          }
                        },
                        y: {
                          beginAtZero: true,
                          max: 10,
                          grid: {
                            color: 'rgba(229, 231, 235, 0.5)',
                            drawBorder: false
                          },
                          ticks: {
                            color: '#9ca3af',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 11
                            },
                            stepSize: 1,
                            padding: 5
                          }
                        }
                      },
                      borderRadius: 4, 
                      barPercentage: 0.7, 
                      categoryPercentage: 0.8 
                    }}
                  />
                </div>
              </div>

              {/* Radar Chart */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                  <FaChartArea className="text-teal-500 mr-2" /> Score Distribution
                </h3>
                <div className="h-48">
                  <Radar
                    data={radarChartData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      scales: {
                        r: {
                          angleLines: {
                            display: true,
                            color: 'rgba(203, 213, 225, 0.3)'
                          },
                          grid: {
                            color: 'rgba(203, 213, 225, 0.3)'
                          },
                          pointLabels: {
                            color: '#64748b',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 11
                            }
                          },
                          ticks: {
                            display: false,
                            backdropColor: 'transparent'
                          },
                          suggestedMin: 0,
                          suggestedMax: Math.max(...radarChartData.datasets[0].data) + 1
                        }
                      },
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: '#6b7280',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 0
                            },
                            boxWidth: 12,
                            usePointStyle: true
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          titleFont: {
                            family: 'Inter, sans-serif',
                            size: 12,
                            weight: 'bold'
                          },
                          bodyFont: {
                            family: 'Inter, sans-serif',
                            size: 12
                          },
                          padding: 10,
                          cornerRadius: 6,
                          displayColors: true
                        }
                      },
                      elements: {
                        line: {
                          borderWidth: 2,
                          tension: 0.1
                        },
                        point: {
                          radius: 3,
                          hoverRadius: 5,
                          backgroundColor: 'rgba(99, 102, 241, 1)',
                          borderWidth: 2,
                          borderColor: '#ffffff'
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {timeComparisonData && (
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <h3 className="text-md font-semibold text-gray-700 mb-3 flex items-center">
                  <FaChartLine className="text-purple-500 mr-2" /> Response Times
                </h3>
                <div className="h-48">
                  <Bar 
                    data={timeComparisonData} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                          labels: {
                            color: '#6b7280',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 8
                            },
                            boxWidth: 12,
                            usePointStyle: true,
                            padding: 5
                          }
                        },
                        tooltip: {
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          titleFont: {
                            family: 'Inter, sans-serif',
                            size: 12,
                            weight: 'bold'
                          },
                          bodyFont: {
                            family: 'Inter, sans-serif',
                            size: 12
                          },
                          padding: 10,
                          cornerRadius: 8,
                          displayColors: true,
                          callbacks: {
                            label: function(context) {
                              return `${context.dataset.label}: ${context.parsed.y}s`;
                            }
                          }
                        }
                      },
                      scales: {
                        x: {
                          grid: {
                            display: false,
                            drawBorder: false
                          },
                          ticks: {
                            color: '#9ca3af',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 11
                            }
                          }
                        },
                        y: {
                          beginAtZero: true,
                          grid: {
                            color: 'rgba(229, 231, 235, 0.5)',
                            drawBorder: false
                          },
                          ticks: {
                            color: '#9ca3af',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 11
                            },
                            padding: 5
                          },
                          title: {
                            display: true,
                            text: 'Seconds',
                            color: '#6b7280',
                            font: {
                              family: 'Inter, sans-serif',
                              size: 12,
                              weight: '500'
                            },
                            padding: { top: 10, bottom: 10 }
                          }
                        }
                      },
                      elements: {
                        bar: {
                          borderRadius: 4,
                          borderWidth: 0,
                          borderSkipped: false
                        }
                      },
                      barPercentage: 0.8,
                      categoryPercentage: 0.7
                    }}
                  />
                </div>
              </div>
            )}
          </div>

    );
};

export default InterviewAnalytics;
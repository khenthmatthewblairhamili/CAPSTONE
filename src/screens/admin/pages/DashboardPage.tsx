import React from "react";
import {
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Line, Polyline, Text as SvgText } from "react-native-svg";
import { BottomNavigation } from "../../../components/common/BottomNavigation";
import styles from "./dashboardStyles";

import { User } from "../../../services/authService";

interface DashboardPageProps {
  profileImage: string | null;
  currentUser: User | null;
  allRequests: any[];
  recentRequests: any[];
  selectedDateRange: number;
  onDateRangeChange: (days: number) => void;
  pendingRequests: any[];
  completedRequests: any[];
  inProgressRequests: any[];
  activeTechnicians: number;
  completedThisWeek: number;
  avgResponseTime: number;
  weeklyChartData: { day: string; completed: number; pending: number }[];
  getProfileImageSource: () => any;
  onProfilePress: () => void;
  onShowAllRequests: () => void;
  onShowPending: () => void;
  onShowCompleted: () => void;
  onShowInProgress: () => void;
  onNavigateToTasks: () => void;
  onNavigateToHome: () => void;
  onNavigateToNotifications: () => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({
  profileImage,
  currentUser,
  allRequests,
  recentRequests,
  selectedDateRange,
  onDateRangeChange,
  pendingRequests,
  completedRequests,
  inProgressRequests,
  activeTechnicians,
  completedThisWeek,
  avgResponseTime,
  weeklyChartData,
  getProfileImageSource,
  onProfilePress,
  onShowAllRequests,
  onShowPending,
  onShowCompleted,
  onShowInProgress,
  onNavigateToTasks,
  onNavigateToHome,
  onNavigateToNotifications,
}) => {
  const dateRanges = [1, 3, 7, 30];

  const getDateRangeText = () => {
    if (selectedDateRange === 1) return "Today";
    if (selectedDateRange === 7) return "Last 7 days";
    if (selectedDateRange === 30) return "Last 30 days";
    return `Last ${selectedDateRange} days`;
  };

  const handleNextDateRange = () => {
    const currentIndex = dateRanges.indexOf(selectedDateRange);
    const nextIndex = (currentIndex + 1) % dateRanges.length;
    onDateRangeChange(dateRanges[nextIndex]);
  };

  // Calculate chart points from data
  const getChartPoints = (data: number[]) => {
    const maxValue = Math.max(
      ...weeklyChartData.map((d) => Math.max(d.completed, d.pending)),
      1
    );
    const scale = 120 / maxValue; // Max height of 120px
    const chartWidth = 250; // Total width for points
    const spacing = chartWidth / Math.max(weeklyChartData.length - 1, 1); // Spacing between points, avoid division by zero

    return data
      .map((value, index) => {
        const x = 40 + index * spacing; // Dynamic spacing between points
        const y = 140 - (value || 0) * scale; // Invert Y axis, ensure value is not NaN
        return `${x},${y}`;
      })
      .join(" ");
  };

  const completedPoints = getChartPoints(
    weeklyChartData.map((d) => d.completed)
  );
  const pendingPoints = getChartPoints(weeklyChartData.map((d) => d.pending));
  const maxValue = Math.max(
    ...weeklyChartData.map((d) => Math.max(d.completed, d.pending)),
    1
  );
  // Ensure we have at least 3 steps for better scale
  const yStep = maxValue <= 3 ? 1 : Math.ceil(maxValue / 3);

  // Parse points for rendering circles
  const parsePoints = (pointsStr: string) => {
    return pointsStr.split(" ").map((point) => {
      const [x, y] = point.split(",").map(Number);
      return { x, y };
    });
  };

  const completedCircles = parsePoints(completedPoints);
  const pendingCircles = parsePoints(pendingPoints);
  return (
    <SafeAreaView style={styles.dashboardContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      {/* Header */}
      <View style={styles.adminHeader}>
        <View style={styles.adminHeaderText}>
          <Text style={styles.welcomeBack}>Welcome back,</Text>
          <Text style={styles.adminName}>Admin {currentUser?.name}!</Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Text>
        </View>
        <TouchableOpacity style={styles.profilePic} onPress={onProfilePress}>
          <Image source={getProfileImageSource()} style={styles.profileImage} />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.adminContent}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }}
      >
        {/* Dashboard Overview Section with Background Image */}
        <View style={styles.overviewContainer}>
          <ImageBackground
            source={require("../../../assets/images/camella.jpeg")}
            style={styles.overviewBackground}
            resizeMode="cover"
          >
            <View style={styles.overlay} />
            <View style={styles.overviewContent}>
              {/* Banner */}
              <View style={styles.overviewBanner}>
                <Text style={styles.overviewTitle}>Dashboard Overview</Text>
              </View>

              {/* Stats Grid - 4 cards in 2x2 layout */}
              <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: "#93c5fd" }]}>
                  <TouchableOpacity onPress={onShowAllRequests}>
                    <Text style={styles.statTotal}>
                      {recentRequests.length}
                    </Text>
                    <Text style={styles.statLabel}>Total Requests</Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginTop: 4,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#6b7280",
                        fontWeight: "500",
                      }}
                    >
                      {getDateRangeText()}
                    </Text>
                    <TouchableOpacity
                      onPress={handleNextDateRange}
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 19,
                          color: "#6b7280",
                          fontWeight: "bold",
                        }}
                      >
                        ›
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={[styles.statCard, { backgroundColor: "#fbbf24" }]}
                  onPress={onShowPending}
                >
                  <Text style={styles.statNumber}>
                    {pendingRequests.length}
                  </Text>
                  <Text style={styles.statLabel}>Pending</Text>
                  <Text style={styles.statSubtext}>Needs attention</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.statCard, { backgroundColor: "#86efac" }]}
                  onPress={onShowCompleted}
                >
                  <Text style={styles.statNumber}>
                    {completedRequests.length}
                  </Text>
                  <Text style={styles.statLabel}>Completed</Text>
                  <Text style={styles.statSubtext}>This week</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.statCard,
                    {
                      backgroundColor: "#fff",
                      borderWidth: 1,
                      borderColor: "#e5e7eb",
                    },
                  ]}
                  onPress={onShowInProgress}
                >
                  <Text style={styles.statNumber}>
                    {inProgressRequests.length}
                  </Text>
                  <Text style={styles.statLabel}>In progress</Text>
                  <Text style={styles.statSubtext}>Notification</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Weekly Progress Chart */}
        <View style={styles.chartSection}>
          <Text style={styles.chartTitle}>Weekly Progress</Text>
          <View style={styles.chartContainer}>
            <Svg width={300} height={200} style={styles.chart}>
              {(() => {
                // Calculate dynamic Y-axis scale based on actual data
                const maxDataValue = Math.max(
                  ...weeklyChartData.map((d) =>
                    Math.max(d.completed, d.pending)
                  ),
                  1
                );

                // Determine max Y value (round up to next multiple of 3 or 5)
                let maxYValue;
                if (maxDataValue <= 3) {
                  maxYValue = 3;
                } else if (maxDataValue <= 6) {
                  maxYValue = 6;
                } else if (maxDataValue <= 9) {
                  maxYValue = 9;
                } else if (maxDataValue <= 12) {
                  maxYValue = 12;
                } else if (maxDataValue <= 15) {
                  maxYValue = 15;
                } else {
                  maxYValue = Math.ceil(maxDataValue / 5) * 5;
                }

                // Create Y-axis steps (4 steps)
                const stepSize = maxYValue / 3;
                const ySteps = [0, stepSize, stepSize * 2, maxYValue];

                // Chart dimensions
                const chartHeight = 140; // Height for data area
                const chartWidth = 240; // Width for data area
                const margin = {
                  top: 20,
                  right: 20,
                  bottom: 40,
                  left: 40,
                };

                // Calculate scaling - dynamic based on max value
                const scaleY = chartHeight / maxYValue;
                const spacing =
                  chartWidth / Math.max(weeklyChartData.length - 1, 1); // Avoid division by zero

                // Helper to get Y coordinate
                const getY = (value: number) => {
                  const safeValue = isNaN(value) ? 0 : value; // Protect against NaN
                  const scaledValue = Math.min(safeValue, maxYValue); // Cap at max value
                  return margin.top + chartHeight - scaledValue * scaleY;
                };

                // Helper to get X coordinate
                const getX = (index: number) => {
                  return margin.left + index * spacing;
                };

                // Generate points for lines
                const getLinePoints = (data: number[]) => {
                  return data
                    .map((value, index) => {
                      const x = getX(index);
                      const y = getY(value);
                      return `${x},${y}`;
                    })
                    .join(" ");
                };

                const completedPoints = getLinePoints(
                  weeklyChartData.map((d) => d.completed)
                );
                const pendingPoints = getLinePoints(
                  weeklyChartData.map((d) => d.pending)
                );

                // Generate circles data
                const getCircles = (data: number[]) => {
                  return data.map((value, index) => ({
                    x: getX(index),
                    y: getY(value),
                    value: value,
                  }));
                };

                const completedCircles = getCircles(
                  weeklyChartData.map((d) => d.completed)
                );
                const pendingCircles = getCircles(
                  weeklyChartData.map((d) => d.pending)
                );

                return (
                  <>
                    {/* Horizontal grid lines only - no vertical grid lines */}
                    {ySteps.map((stepValue, index) => {
                      const y = getY(stepValue);
                      return (
                        <React.Fragment key={`h-grid-${index}`}>
                          <Line
                            x1={margin.left}
                            y1={y}
                            x2={margin.left + chartWidth}
                            y2={y}
                            stroke="#e5e7eb"
                            strokeWidth="1"
                          />
                          {/* Y-axis labels - dynamic based on data */}
                          <SvgText
                            x={margin.left - 5}
                            y={y + 4}
                            fontSize="10"
                            fill="#999"
                            textAnchor="end"
                          >
                            {Math.round(stepValue)}
                          </SvgText>
                        </React.Fragment>
                      );
                    })}

                    {/* Completed line (green) */}
                    <Polyline
                      points={completedPoints}
                      fill="none"
                      stroke="#86efac"
                      strokeWidth="2"
                    />

                    {/* Pending line (orange) */}
                    <Polyline
                      points={pendingPoints}
                      fill="none"
                      stroke="#fbbf24"
                      strokeWidth="2"
                    />

                    {/* Completed data points */}
                    {completedCircles.map((circle, index) => (
                      <React.Fragment key={`completed-${index}`}>
                        <Circle
                          cx={circle.x}
                          cy={circle.y}
                          r="4"
                          fill="#22c55e"
                          stroke="#fff"
                          strokeWidth="0"
                        />
                      </React.Fragment>
                    ))}

                    {/* Pending data points */}
                    {pendingCircles.map((circle, index) => (
                      <React.Fragment key={`pending-${index}`}>
                        <Circle
                          cx={circle.x}
                          cy={circle.y}
                          r="4"
                          fill="#f59e0b"
                          stroke="#fff"
                          strokeWidth="0"
                        />
                      </React.Fragment>
                    ))}

                    {/* X-axis labels */}
                    {weeklyChartData.map((item, index) => {
                      const x = getX(index);
                      return (
                        <SvgText
                          key={index}
                          x={x}
                          y={margin.top + chartHeight + 20}
                          fontSize="10"
                          fill="#666"
                          textAnchor="middle"
                        >
                          {item.day}
                        </SvgText>
                      );
                    })}
                  </>
                );
              })()}
            </Svg>

            {/* Legend */}
            <View style={styles.chartLegend}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#86efac" }]}
                />
                <Text style={styles.legendText}>Completed</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#fbbf24" }]}
                />
                <Text style={styles.legendText}>Pending</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Performance Summary */}
        <View style={styles.performanceSection}>
          <Text style={styles.performanceTitle}>Performance Summary</Text>
          <View style={styles.performanceGrid}>
            <View style={styles.performanceCard}>
              <Text style={styles.performanceIcon}>⏱️</Text>
              <Text style={styles.performanceValue}>
                {avgResponseTime > 0 ? `${avgResponseTime}hrs` : "N/A"}
              </Text>
              <Text style={styles.performanceLabel}>Average Response Time</Text>
            </View>
            <View style={styles.performanceCard}>
              <Text style={styles.performanceIcon}>📋</Text>
              <Text style={styles.performanceValue}>{completedThisWeek}</Text>
              <Text style={styles.performanceLabel}>
                Tasks completed this week
              </Text>
            </View>
            <View style={styles.performanceCard}>
              <Text style={styles.performanceIcon}>👷</Text>
              <Text style={styles.performanceValue}>{activeTechnicians}</Text>
              <Text style={styles.performanceLabel}>Technician Active</Text>
            </View>
          </View>
          <TouchableOpacity
            style={styles.taskButton}
            onPress={onNavigateToTasks}
          >
            <Text style={styles.taskButtonText}>View All Tasks</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <BottomNavigation
        activeTab="home"
        onTabPress={(tab) => {
          if (tab === "request-detail") onNavigateToTasks();
          if (tab === "notifications") onNavigateToNotifications();
        }}
      />
    </SafeAreaView>
  );
};

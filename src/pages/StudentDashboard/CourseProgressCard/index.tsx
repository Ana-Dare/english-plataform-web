import React from "react";
import {
  CardContainer,
  Title,
  ChartsContainer,
  ChartWrapper,
  ChartTitle,
  LegendContainer,
  LegendItem,
} from "./style";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const attendanceData = [
  { name: "Presenças", value: 17, color: "#2563eb" },
  { name: "Faltas", value: 1, color: "#ef4444" },
];

const gradeData = [
  { name: "atv 1", grade: 8, color: "#eab308" },
  { name: "atv 2", grade: 10, color: "#eab308" },
  { name: "prv 1", grade: 10, color: "#2563eb" },
  { name: "atv 3", grade: 9, color: "#eab308" },
  { name: "prv 2", grade: 9, color: "#2563eb" },
];

const CourseProgressCard: React.FC = () => {
  return (
    <CardContainer>
      <Title>Progresso do curso</Title>

      <ChartsContainer>
        <ChartWrapper>
          <ChartTitle>Frequência</ChartTitle>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={attendanceData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {attendanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <LegendContainer>
            <LegendItem>
              <span>94,4%</span>{" "}
              <div className="color-box" style={{ background: "#2563eb" }} />{" "}
              Presenças: 17
            </LegendItem>
            <LegendItem>
              <span>6,6%</span>{" "}
              <div className="color-box" style={{ background: "#ef4444" }} />{" "}
              Faltas: 1
            </LegendItem>
          </LegendContainer>
        </ChartWrapper>

        <ChartWrapper style={{ flex: 1.5 }}>
          <ChartTitle>Média geral do primeiro bimestre: 9.4</ChartTitle>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart
              data={gradeData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <XAxis
                dataKey="name"
                axisLine={true}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                axisLine={true}
                tickLine={false}
                tick={{ fontSize: 12 }}
                domain={[0, 10]}
                ticks={[0, 2, 4, 6, 8, 10]}
              />
              <Tooltip cursor={{ fill: "transparent" }} />
              <Bar dataKey="grade" radius={[10, 10, 10, 10]} barSize={30}>
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartWrapper>
      </ChartsContainer>
    </CardContainer>
  );
};

export default CourseProgressCard;

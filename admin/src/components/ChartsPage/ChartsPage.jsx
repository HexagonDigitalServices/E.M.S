import { useEffect, useMemo, useState } from "react";
import {
  CalendarDays,
  ChartColumn,
  ChevronDown,
  LineChart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import {
  chartMetrics,
  chartMonths,
  chartPeriods,
  chartWeeks,
  chartYears,
  getChartTitle,
} from "../../data/dashboardData";
import { useAuth } from "../../auth/useAuth";
import { chartsPageStyles as s } from "../../assets/dummyStyles";

const metricColors = {
  employees: {
    bar: "from-zinc-950 via-zinc-700 to-zinc-300",
    text: "text-zinc-950",
    soft: "bg-white",
    stroke: "#18181b",
    fill: "rgba(24,24,27,0.10)",
  },
  salary: {
    bar: "from-zinc-950 via-zinc-700 to-zinc-300",
    text: "text-zinc-950",
    soft: "bg-white",
    stroke: "#18181b",
    fill: "rgba(24,24,27,0.10)",
  },
  announcements: {
    bar: "from-zinc-950 via-zinc-700 to-zinc-300",
    text: "text-zinc-950",
    soft: "bg-white",
    stroke: "#18181b",
    fill: "rgba(24,24,27,0.10)",
  },
};

const formatValue = (value, metric) => {
  if (metric.key === "salary") {
    return `₹ ${Math.round(value)}`;
  }
  return Math.round(value).toLocaleString("en-IN");
};

const SelectControl = ({ icon: Icon, label, value, onChange, options }) => (
  <label className={s.selectLabel}>
    <Icon className={s.selectIcon} />
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={s.selectInput}
      aria-label={label}
    >
      {options.map((item) => (
        <option key={item.value || item} value={item.value || item}>
          {item.label || item}
        </option>
      ))}
    </select>
    <ChevronDown className={s.selectChevron} />
  </label>
);

const buildWavePath = (series, metricKey, maxValue) => {
  const width = 640;
  const plotTop = 52;
  const plotHeight = 140;
  const labelSpace = 28;
  const height = plotTop + plotHeight + labelSpace;

  const maxVal = Math.max(maxValue, 0.0001);
  const n = series.length;
  const points = series.map((item, index) => {
    const x = n === 1 ? width / 2 : (index / (n - 1)) * width;
    const y = plotTop + plotHeight - (item[metricKey] / maxVal) * plotHeight;
    return { x, y };
  });

  const line = points
    .map((point, index) => {
      if (index === 0) return `M ${point.x} ${point.y}`;
      const previous = points[index - 1];
      const controlX = (previous.x + point.x) / 2;
      return `C ${controlX} ${previous.y}, ${controlX} ${point.y}, ${point.x} ${point.y}`;
    })
    .join(" ");

  const firstX = points[0]?.x ?? 0;
  const lastX = points[points.length - 1]?.x ?? width;
  const sepY = plotTop + plotHeight;
  const area = `${line} L ${lastX} ${sepY} L ${firstX} ${sepY} Z`;

  return {
    line,
    area,
    points,
    width,
    height,
    plotTop,
    plotHeight,
    labelSpace,
    sepY,
  };
};

const ChartsPage = ({ loading = false }) => {
  const { user } = useAuth();
  const [period, setPeriod] = useState("daily");
  const [year, setYear] = useState(chartYears.at(-1));
  const [month, setMonth] = useState(() => {
    const m = new Date().getMonth() + 1;
    return String(m).padStart(2, "0");
  });
  const [week, setWeek] = useState("1");
  const [metricKey, setMetricKey] = useState("employees");

  const availableMonths = useMemo(() => {
    const today = new Date();
    const curYear = String(today.getFullYear());
    const curMonth = String(today.getMonth() + 1).padStart(2, "0");

    if (year > curYear) return [];
    if (year === curYear) {
      return chartMonths.filter((item) => item.value <= curMonth);
    }
    return chartMonths;
  }, [year]);

  const availableWeeks = useMemo(() => {
    const today = new Date();
    const curYear = String(today.getFullYear());
    const curMonth = String(today.getMonth() + 1).padStart(2, "0");
    const curDay = today.getDate();

    if (year > curYear) return [];
    if (year === curYear) {
      if (month > curMonth) return [];
      if (month === curMonth) {
        return chartWeeks.filter((item) => {
          const startDay = Number(item.range.split("-")[0]);
          return startDay <= curDay;
        });
      }
    }
    return chartWeeks;
  }, [year, month]);

  useEffect(() => {
    if (availableMonths.length > 0) {
      const exists = availableMonths.some((m) => m.value === month);
      if (!exists) {
        setMonth(availableMonths[availableMonths.length - 1].value);
      }
    }
  }, [availableMonths, month]);

  useEffect(() => {
    if (availableWeeks.length > 0) {
      const exists = availableWeeks.some((w) => w.value === week);
      if (!exists) {
        setWeek(availableWeeks[0].value);
      }
    }
  }, [availableWeeks, week]);

  const [series, setSeries] = useState([]);
  const [chartLoading, setChartLoading] = useState(false);

  const activeMetric = chartMetrics.find((metric) => metric.key === metricKey);
  const colors = metricColors[metricKey];
  const activeCopy = getChartTitle({ period, year, month, week });

  useEffect(() => {
    const fetchChartData = async () => {
      if (!user?.token) return;
      try {
        setChartLoading(true);
        const res = await fetch(
          `http://localhost:5000/api/admin/dashboard/charts?period=${period}&year=${year}&month=${month}&week=${week}&_t=${Date.now()}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          },
        );
        const data = await res.json();
        if (res.ok && data.success) {
          setSeries(data.series || []);
        }
      } catch (err) {
        console.error("Error fetching chart data:", err);
      } finally {
        setChartLoading(false);
      }
    };
    fetchChartData();
  }, [period, year, month, week, user]);

  const maxValue = Math.max(...series.map((item) => item[metricKey]), 1);
  const total = series.reduce((sum, item) => sum + item[metricKey], 0);
  const average = series.length > 0 ? total / series.length : 0;
  const peak = series.reduce(
    (best, item) => (item[metricKey] > best[metricKey] ? item : best),
    series[0] || {
      label: "-",
      caption: "-",
      employees: 0,
      salary: 0,
      announcements: 0,
    },
  );
  const low = series.reduce(
    (best, item) => (item[metricKey] < best[metricKey] ? item : best),
    series[0] || {
      label: "-",
      caption: "-",
      employees: 0,
      salary: 0,
      announcements: 0,
    },
  );
  const chartKey = `${period}-${year}-${month}-${week}-${metricKey}`;
  const wave = buildWavePath(series, metricKey, maxValue);

  if (loading || chartLoading || series.length === 0) {
    return (
      <section className={s.section}>
        <div className={s.container}>
          <div className={s.skeletonCard}>
            <div className={s.skeletonTitle} />
            <div className={s.skeletonGrid}>
              <div className={s.skeletonChart} />
              <div className={s.skeletonSidebar}>
                <div className={s.skeletonSelect} />
                <div className={s.skeletonStat} />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={s.section}>
      <div className={s.container}>
        <div className={s.headerWrapper}>
          <div>
            <p className={s.headerLabel}>Charts</p>
            <h2 className={s.headerTitle}>{activeCopy.title}</h2>
          </div>

          <div className={s.filtersWrapper}>
            <div className={s.periodButtons}>
              {chartPeriods.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setPeriod(key)}
                  className={s.getPeriodButtonClass(period === key)}
                >
                  {label}
                </button>
              ))}
            </div>

            <SelectControl
              icon={CalendarDays}
              label="Select chart year"
              value={year}
              onChange={setYear}
              options={chartYears}
            />

            {period !== "yearly" && availableMonths.length > 0 && (
              <SelectControl
                icon={CalendarDays}
                label="Select chart month"
                value={month}
                onChange={setMonth}
                options={availableMonths}
              />
            )}

            {period === "weekly" && availableWeeks.length > 0 && (
              <SelectControl
                icon={CalendarDays}
                label="Select chart week"
                value={week}
                onChange={setWeek}
                options={availableWeeks.map((item) => ({
                  value: item.value,
                  label: `${item.label} (${item.range})`,
                }))}
              />
            )}
          </div>
        </div>

        <div className={s.mainGrid}>
          <article
            className={s.chartCard}
            style={s.getAnimationDelayStyle("180ms")}
          >
            <div className={s.chartHeader}>
              <div>
                <p className={s.chartTitle}>{activeMetric.label}</p>
                <p className={s.chartSubtitle}>
                  {period === "daily"
                    ? "Date wise wave chart"
                    : period === "weekly"
                      ? "Date wise bars for selected week"
                      : period === "monthly"
                        ? "Week wise bars for selected month"
                        : "Month wise bars for selected year"}
                </p>
              </div>
              <span className={s.chartBadge}>
                {period === "daily" ? (
                  <LineChart className={s.badgeIcon} />
                ) : (
                  <ChartColumn className={s.badgeIcon} />
                )}
                {period === "daily" ? "Wave Chart" : "Bar Chart"}
              </span>
            </div>

            {period === "daily" ? (
              <div key={chartKey} className={s.waveWrapper}>
                <div className={s.waveContainer}>
                  <svg
                    viewBox={`0 0 ${wave.width} ${wave.height}`}
                    className={s.waveSvg}
                    role="img"
                    aria-label={`${activeMetric.label} daily wave chart`}
                  >
                    {/* Wave fill area */}
                    <path d={wave.area} fill={colors.fill} />
                    {/* Wave line */}
                    <path
                      d={wave.line}
                      fill="none"
                      stroke={colors.stroke}
                      strokeLinecap="round"
                      strokeWidth="5"
                      className="chart-line"
                    />
                    {/* Separator line above date labels */}
                    <line
                      x1="0"
                      y1={wave.sepY + 6}
                      x2={wave.width}
                      y2={wave.sepY + 6}
                      stroke="rgb(228,228,231)"
                      strokeWidth="1"
                    />
                    {/* Dots + value labels + date labels */}
                    {wave.points.map((point, index) => {
                      const val = series[index][metricKey];
                      const n = series.length;
                      const dateStep = Math.max(1, Math.ceil(n / 8));
                      const showDate =
                        index === 0 ||
                        index === n - 1 ||
                        index % dateStep === 0;
                      const anchor =
                        index === 0
                          ? "start"
                          : index === n - 1
                            ? "end"
                            : "middle";

                      const tooltipWidth = metricKey === "salary" ? 120 : 90;
                      const tooltipHeight = 40;
                      const rectY = Math.max(4, point.y - tooltipHeight - 8);

                      let rectX = point.x - tooltipWidth / 2;
                      if (index === 0) {
                        rectX = point.x;
                      } else if (index === n - 1) {
                        rectX = point.x - tooltipWidth;
                      }

                      const getTooltipLabel = (item, currentPeriod) => {
                        if (currentPeriod === "monthly") {
                          return `${item.label} (${item.caption})`;
                        }
                        return item.caption || item.label;
                      };

                      return (
                        <g key={series[index].label} className={s.waveGroup}>
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="16"
                            fill="transparent"
                          />
                          <circle
                            cx={point.x}
                            cy={point.y}
                            r="6"
                            fill="white"
                            stroke={colors.stroke}
                            strokeWidth="4"
                            className={s.waveDot}
                          />
                          {/* Tooltip Box */}
                          <g className={s.waveTooltipGroup}>
                            <rect
                              x={rectX}
                              y={rectY}
                              width={tooltipWidth}
                              height={tooltipHeight}
                              rx="8"
                              ry="8"
                              fill="#18181b"
                              stroke="#27272a"
                              strokeWidth="1.5"
                            />
                            <text
                              x={rectX + tooltipWidth / 2}
                              y={rectY + 16}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="10"
                              fontWeight="600"
                            >
                              {getTooltipLabel(series[index], period)}
                            </text>
                            <text
                              x={rectX + tooltipWidth / 2}
                              y={rectY + 31}
                              textAnchor="middle"
                              fill="#ffffff"
                              fontSize="12"
                              fontWeight="800"
                            >
                              {formatValue(val, activeMetric)}
                            </text>
                          </g>
                          {showDate && (
                            <text
                              x={point.x}
                              y={wave.sepY + wave.labelSpace - 4}
                              textAnchor={anchor}
                              fill="rgb(113,113,122)"
                              fontSize="11"
                              fontWeight="600"
                            >
                              {series[index].label}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            ) : (
              <div key={chartKey} className={s.barWrapper}>
                <div className={s.barContainer}>
                  {series.map((item, index) => {
                    const percent = Math.max(
                      (item[metricKey] / maxValue) * 82,
                      8,
                    );
                    const barClasses = s.getBarClasses(metricKey);
                    return (
                      <div key={item.label} className={s.barItem}>
                        <div className={s.barItemInner}>
                          <div
                            className={barClasses}
                            style={{
                              height: `${percent}%`,
                              animationDelay: `${index * 80}ms`,
                            }}
                            aria-label={`${item.label}: ${formatValue(item[metricKey], activeMetric)}`}
                          />
                          {/* Tooltip Box */}
                          <div
                            className={s.barTooltip}
                            style={{ bottom: `calc(${percent}% + 8px)` }}
                          >
                            <div className={s.barTooltipInner}>
                              <p className={s.barTooltipLabel}>
                                {period === "monthly"
                                  ? `${item.label} (${item.caption})`
                                  : item.caption || item.label}
                              </p>
                              <p className={s.barTooltipValue}>
                                {formatValue(item[metricKey], activeMetric)}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className={s.barLabel}>
                          <span className={s.barLabelPrimary}>
                            {item.label}
                          </span>
                          {item.caption && (
                            <span className={s.barLabelSecondary}>
                              {item.caption}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </article>

          <aside
            className={s.asidePanel}
            style={s.getAnimationDelayStyle("300ms")}
          >
            <div className={s.asideHeader}>
              <div>
                <p className={s.asideTitle}>Select Data</p>
                <p className={s.asideSubtitle}>Change chart metric</p>
              </div>
              <span className={s.asideIcon}>
                <TrendingUp className={s.asideIconSvg} />
              </span>
            </div>

            <div className={s.metricButtons}>
              {chartMetrics.map(({ key, label }) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setMetricKey(key)}
                  className={s.getMetricButtonClass(metricKey === key)}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className={s.statsContainer}>
              <div className={s.statItem}>
                <p className={s.statLabel}>Total</p>
                <p
                  className={`${s.statValue} ${s.getMetricTextClass(metricKey)}`}
                >
                  {formatValue(total, activeMetric)}
                </p>
              </div>
              <div className={s.statItem}>
                <p className={s.statLabel}>Peak</p>
                <p className={s.statPeak}>{total === 0 ? "-" : peak.label}</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default ChartsPage;

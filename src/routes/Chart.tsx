import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
    coinId: string;
}
interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        { refetchInterval: 10000 }
    );

    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <>
                    <ApexChart
                        type="line"
                        series={[
                            {
                                name: "price",
                                data: data?.map((price) => price.close),
                            },
                        ]}
                        options={{
                            yaxis: { show: false },
                            xaxis: {
                                labels: { show: false },
                                axisTicks: { show: false },
                                axisBorder: { show: false },
                                type: "datetime",
                                categories: data?.map(
                                    (price) => price.time_close
                                ),
                            },
                            theme: {
                                mode: "dark",
                            },
                            chart: {
                                height: "200px",
                                width: 500,
                                toolbar: {
                                    show: false,
                                },
                                background: "transparent",
                            },
                            grid: { show: false },
                            stroke: {
                                curve: "smooth",
                                width: 3,
                            },
                            fill: {
                                type: "gradient",
                                gradient: {
                                    gradientToColors: ["#0be881"],
                                    stops: [0, 100],
                                },
                            },
                            colors: ["#0fbcf9"],
                            tooltip: {
                                y: {
                                    formatter: (value) =>
                                        `$ ${value.toFixed(2)}`,
                                },
                            },
                        }}
                    />
                    <ApexChart
                        series={[ 
                            {
                                name: "price",
                                data: data?.map((price) => {
                                    return {
                                        x: price.time_close,
                                        y: [
                                            price.open.toFixed(2),
                                            price.high.toFixed(2),
                                            price.low.toFixed(2),
                                            price.close.toFixed(2),
                                        ],
                                    };
                                }),
                            },
                        ]}
                        type="candlestick"
                        options={{
                            yaxis: {
                                labels: {
                                    show: false,
                                },
                                tooltip: {
                                    enabled: true,
                                },
                            },
                            xaxis: {
                                type: "datetime",
                                labels: { show: false },
                                axisTicks: { show: false },
                                axisBorder: { show: false },
                            },
                            grid: {
                                show: false,
                            },
                            theme: {
                                mode: "dark",
                            },
                            chart: {
                                height: "200px",
                                width: 500,
                                toolbar: {
                                    show: false,
                                },
                                background: "transparent",
                            },
                            plotOptions: {
                                candlestick: {
                                    colors: {
                                        upward: "#81ecec",
                                        downward: "#e17055",
                                    },
                                },
                            },
                        }}
                    />
                </>
            )}
        </div>
    );
}
export default Chart;

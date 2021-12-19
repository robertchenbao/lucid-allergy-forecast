import Chart from "react-apexcharts";

function ForcastChart(props) {
    const chartOptions = {
        xaxis: {
            categories: props.forcastDates,
        },
        dataLabels: {
            enabled: false,
        },
        chart: {
            toolbar: {
                show: false,
            },
        },
        yaxis: {
            min: 0,
            title: { text: "Allergen Index (range: 1 - 3)" },
        },
    };
    const dataSeries = props.forcastDataSeries;

    return (
        <div className="area">
            <Chart
                options={chartOptions}
                series={dataSeries}
                type="area"
                className="w-6/7"
            />
        </div>
    );
}

export default ForcastChart;

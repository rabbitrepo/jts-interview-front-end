import { TypeSummary } from '@/types/data';
import { PieChart } from 'react-minimal-pie-chart';

interface TypePieChartProps {
    data: TypeSummary[];
}

export default function TypePieChart({ data }: TypePieChartProps) {
    const defaultLabelStyle = {
        fontSize: '10px',
        fontFamily: 'Arial, sans-serif',
        fill: '#fff',
    };

    const generateColor = (index: number) => {
        const hue = (index * 137.5) % 360;
        return `hsl(${hue}, 70%, 50%)`;
    };

    const chartData = data.map((item, index) => ({
        title: item.type_name,
        value: item.total,
        color: generateColor(index),
        percentage: item.percentage
    }));

    return (
        <div className="flex flex-col items-center">
            <div className="w-64 h-64">
                <PieChart
                    data={chartData}
                    label={({ dataEntry }) => (
                        dataEntry.percentage > 0 ? `${dataEntry.percentage}%` : null
                    )}
                    labelStyle={defaultLabelStyle}
                    labelPosition={50}
                    animate
                    animationDuration={500}
                    animationEasing="ease-out"
                    center={[50, 50]}
                    viewBoxSize={[100, 100]}
                    radius={42}
                />
            </div>

            <div className="flex flex-wrap gap-4 mt-4 justify-center">
                {chartData.map((entry) => (
                    <div key={entry.title} className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm font-medium">
                            {entry.title} ({entry.value.toLocaleString()})
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
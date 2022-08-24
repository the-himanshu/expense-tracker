import "../styles/ChartBar.css"

function ChartBar(props) {
    //this is the main logic to fill the bars in the chart bar
    let fillPercentage = '0%'
    if(props.totalSum > 0) fillPercentage = Math.round((props.value / props.totalSum) * 100) + "%"

    return (
        <div className="chart-bar-outer">
            <div className="chart-bar-label">{props.label}</div>
            <div className="chart-bar-inner">
                <div className="chart-bar-fill" style={{width: fillPercentage}}></div>
            </div>
        </div>
    )
}

export default ChartBar
const items = [
  { label: "USD/MXN",    value: "18.24",   change: "+0.12%", up: true  },
  { label: "BTC",        value: "$83,240",  change: "+1.84%", up: true  },
  { label: "ETH",        value: "$1,791",   change: "−0.42%", up: false },
  { label: "XRP",        value: "$2.07",    change: "−1.02%", up: false },
  { label: "SOL",        value: "$118.30",  change: "+2.11%", up: true  },
  { label: "ORO",        value: "$3,020",   change: "+0.31%", up: true  },
  { label: "WTI",        value: "$71.4",    change: "−0.8%",  up: false },
  { label: "CETES",      value: "9.50%",    change: null,     up: null  },
  { label: "INFLACIÓN",  value: "3.77%",    change: null,     up: null  },
  { label: "REAL YIELD", value: "+5.73%",   change: null,     up: null  },
];

const trackStyle: React.CSSProperties = {
  animation: "ticker 45s linear infinite",
  fontFamily: "'Satoshi', sans-serif",
  fontFeatureSettings: '"tnum" 1',
  fontVariantNumeric: "tabular-nums",
};

const labelStyle: React.CSSProperties = {
  fontSize: "11.5px",
  fontWeight: 500,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  color: "var(--color-muted-dark)",
};

const valueStyle: React.CSSProperties = {
  fontSize: "11.5px",
  fontWeight: 600,
  color: "var(--color-crema)",
};

const deltaStyle = (up: boolean): React.CSSProperties => ({
  fontSize: "11.5px",
  fontWeight: 600,
  color: up ? "var(--color-positivo)" : "var(--color-negativo)",
});

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-tinta border-b border-hairline-dark h-9 flex items-stretch overflow-hidden">
      {/* Badge EN VIVO */}
      <div className="flex-shrink-0 px-3 flex items-center border-r border-hairline-dark">
        <span
          style={{
            fontFamily: "'Satoshi', sans-serif",
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "0.22em",
            color: "var(--color-azuldk)",
            textTransform: "uppercase",
          }}
        >
          EN VIVO
        </span>
      </div>

      {/* Track */}
      <div className="overflow-hidden flex-1">
        <div className="flex items-center h-full whitespace-nowrap" style={trackStyle}>
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-5">
              <span style={labelStyle}>{item.label}</span>
              <span style={valueStyle}>{item.value}</span>
              {item.change !== null && item.up !== null && (
                <span style={deltaStyle(item.up!)}>
                  {item.up ? "▲" : "▼"} {item.change}
                </span>
              )}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

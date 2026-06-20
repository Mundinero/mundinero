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

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-tinta border-b border-hairline-dark h-9 flex items-stretch overflow-hidden">
      {/* Badge EN VIVO */}
      <div className="flex-shrink-0 px-3 flex items-center border-r border-hairline-dark">
        <span className="text-azuldk text-[10px] font-bold tracking-[0.22em] uppercase font-sans">
          EN VIVO
        </span>
      </div>

      {/* Track */}
      <div className="overflow-hidden flex-1">
        <div
          className="flex items-center h-full whitespace-nowrap"
          style={{ animation: "ticker 45s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5 px-5">
              <span className="text-muted-dark text-[11px] font-medium tracking-[0.12em] uppercase font-sans">
                {item.label}
              </span>
              <span className="text-crema text-[12px] font-semibold font-sans">
                {item.value}
              </span>
              {item.change !== null && item.up !== null && (
                <span
                  className={`text-[11px] font-semibold font-sans ${
                    item.up ? "text-positivo" : "text-negativo"
                  }`}
                >
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

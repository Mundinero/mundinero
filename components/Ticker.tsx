const items = [
  { label: "USD/MXN", value: "18.24",   change: "+0.12%", up: true  },
  { label: "BTC",     value: "$83,240",  change: "+1.84%", up: true  },
  { label: "ETH",     value: "$1,791",   change: "−0.42%", up: false },
  { label: "XRP",     value: "$2.07",    change: "−1.02%", up: false },
  { label: "SOL",     value: "$118.30",  change: "+2.11%", up: true  },
  { label: "ORO",     value: "$3,020",   change: "+0.31%", up: true  },
  { label: "WTI",     value: "$71.4",    change: "−0.8%",  up: false },
  { label: "CETES",      value: "9.50%",  change: null, up: null },
  { label: "INFLACIÓN",  value: "3.77%",  change: null, up: null },
  { label: "REAL YIELD", value: "+5.73%", change: null, up: true },
];

export default function Ticker() {
  const doubled = [...items, ...items];

  return (
    <div className="bg-tinta border-b border-crema/10 h-8 flex items-stretch overflow-hidden">
      {/* EN VIVO badge */}
      <div className="flex-shrink-0 bg-azul px-3 flex items-center">
        <span className="text-tinta text-[10px] font-bold tracking-[0.18em]">
          EN VIVO
        </span>
      </div>

      {/* Scrolling track */}
      <div className="overflow-hidden flex-1">
        <div
          className="flex items-center gap-8 h-full whitespace-nowrap"
          style={{ animation: "ticker 40s linear infinite" }}
        >
          {doubled.map((item, i) => (
            <span key={i} className="inline-flex items-center gap-1.5">
              <span className="text-crema/50 text-[11px] font-semibold tracking-widest">
                {item.label}
              </span>
              <span className="text-crema text-[12px] font-semibold">
                {item.value}
              </span>
              {item.change !== null && item.up !== null && (
                <span
                  className={`text-[11px] font-semibold ${
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

interface StatsBadgeProps {
  label: string
  value: number
  color?: string
}

const colorClasses: Record<string, { border: string; text: string }> = {
  blue: { border: 'border-blue-400', text: 'text-blue-600' },
  green: { border: 'border-green-400', text: 'text-green-600' },
  yellow: { border: 'border-yellow-400', text: 'text-yellow-600' },
  red: { border: 'border-red-300', text: 'text-red-500' },
}

export default function StatsBadge({ label, value, color = 'blue' }: StatsBadgeProps) {
  const { border, text } = colorClasses[color] ?? colorClasses.blue

  return (
    <div
      className={`flex flex-1 flex-col items-center justify-center rounded-xl border-2 bg-white px-4 py-4 ${border}`}
    >
      <span className={`text-2xl font-bold ${text}`}>{value}</span>
      <span className="mt-1 text-xs text-gray-500 text-center">{label}</span>
    </div>
  )
}

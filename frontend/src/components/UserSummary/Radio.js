export default function Radio({ label, value, selected, handleSelection, name }) {
  return (
    <div className="flex items-center gap-1">
      <input
        type="radio"
        id={`${label}${name}`}
        checked={selected}
        onChange={handleSelection}
        value={value}
        name={name}
      />
      <label htmlFor={`${label}${name}`} className="text-zinc-500 text-sm">
        {label}
      </label>
    </div>
  )
}
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ROLES } from "@/constants/roles"

interface RoleSelectProps {
  value: string 
  onChange: (value: any) => void
  error?: string
}

export function RoleSelect({ value, onChange, error }: RoleSelectProps) {
  const roleOptions = Object.entries(ROLES).map(([value, label]) => ({
    value,
    label,
  }))

  return (
    <div>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Selecione a função" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {roleOptions.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  )
}

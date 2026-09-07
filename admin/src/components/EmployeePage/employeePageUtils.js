export const genderOptions = ['Male', 'Female']
export const accountOptions = ['Active', 'Inactive']
export const salaryPeriodOptions = [
  { value: 'month', label: 'Per Month' },
  { value: 'year', label: 'Per Year' },
]
export const departmentOptions = [
  'Engineering',
  'Human Resources',
  'Finance',
  'Marketing',
  'Operations',
  'Design',
  'Sales',
  'Support',
]

export const getTodayDate = () => {
  const today = new Date()
  const year = today.getFullYear()
  const month = String(today.getMonth() + 1).padStart(2, '0')
  const day = String(today.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getCurrentMonth = () => getTodayDate().slice(0, 7)

export const emptyEmployeeForm = {
  id: '',
  profileImage: '',
  name: '',
  email: '',
  workEmail: '',
  workPassword: '',
  phone: '',
  gender: 'Male',
  department: 'Engineering',
  designation: '',
  salary: '',
  salaryPeriod: 'month',
  salaryMonth: getCurrentMonth(),
  joiningDate: '',
  bankName: '',
  accountNumber: '',
  ifscCode: '',
  accountStatus: 'Active',
}

export const isPastDate = (date, referenceDate = getTodayDate()) =>
  Boolean(date) && date < referenceDate

export const isFutureDate = (date, referenceDate = getTodayDate()) =>
  Boolean(date) && date > referenceDate

const getDateFromInputValue = (date) => {
  const [year, month, day] = date.split('-').map(Number)
  return new Date(year, month - 1, day)
}

const getInputValueFromDate = (date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

export const getDatesInRange = (startDate, endDate) => {
  if (!startDate || !endDate || endDate < startDate) return []

  const dates = []
  const currentDate = getDateFromInputValue(startDate)
  const lastDate = getDateFromInputValue(endDate)

  while (currentDate <= lastDate) {
    dates.push(getInputValueFromDate(currentDate))
    currentDate.setDate(currentDate.getDate() + 1)
  }

  return dates
}

export const statusStyles = {
  Present: 'border-zinc-950 bg-zinc-950 text-white',
  Leave: 'border-zinc-300 bg-zinc-100 text-zinc-700',
  'Not Marked': 'border-zinc-200 bg-zinc-100 text-zinc-500',
  'Leave Applied': 'border-zinc-300 bg-white text-zinc-700',
  'Leave Approved': 'border-zinc-950 bg-zinc-950 text-white',
  'Leave Rejected': 'border-zinc-300 bg-zinc-100 text-zinc-700',
  Active: 'border-zinc-950 bg-zinc-950 text-white',
  Inactive: 'border-zinc-200 bg-zinc-100 text-zinc-500',
}

export const getInitials = (name) => {
  const initials = name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return initials || 'EM'
}

export const createAvatarImage = (initials) => {
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const ctx = canvas.getContext('2d')

  // Background
  ctx.fillStyle = '#18181b'
  ctx.beginPath()
  ctx.arc(64, 64, 64, 0, Math.PI * 2)
  ctx.fill()

  // Initials text
  ctx.fillStyle = '#ffffff'
  ctx.font = 'bold 44px Inter, sans-serif'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(initials || 'EM', 64, 66)

  return canvas.toDataURL('image/png')
}

export const getDigitsOnly = (value) => value.toString().replace(/\D/g, '')

export const getPhoneDigits = (value) => getDigitsOnly(value).slice(-10)

export const formatPhone = (phone) => {
  const digits = getPhoneDigits(phone)

  if (digits.length !== 10) return digits

  return `${digits.slice(0, 5)} ${digits.slice(5)}`
}

export const formatSalary = (salary) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(salary)

export const getSalaryPeriodLabel = (period) =>
  salaryPeriodOptions.find((item) => item.value === period)?.label || 'Per Month'

export const formatSalaryPackage = (salary, period = 'month') =>
  `${formatSalary(salary)} / ${getSalaryPeriodLabel(period).replace('Per ', '').toLowerCase()}`

export const getMonthlySalaryValue = (salary, period = 'month') => {
  const salaryValue = Number(salary) || 0

  if (period === 'day') return salaryValue * 30
  if (period === 'week') return salaryValue * 4
  if (period === 'year') return salaryValue / 12

  return salaryValue
}

export const formatDate = (date) =>
  date
    ? (() => {
      const [year, month, day] = date.split('-')
      if (year && month && day) return `${day}-${month}-${year}`
      const parsedDate = new Date(date)
      if (Number.isNaN(parsedDate.getTime())) return date
      return `${String(parsedDate.getDate()).padStart(2, '0')}-${String(
        parsedDate.getMonth() + 1,
      ).padStart(2, '0')}-${parsedDate.getFullYear()}`
    })()
    : ''

export const getNextEmployeeId = (employees) => {
  const biggestId = employees.reduce((maxId, employee) => {
    const numericId = Number(employee.id.replace(/\D/g, ''))
    return Number.isNaN(numericId) ? maxId : Math.max(maxId, numericId)
  }, 1000)

  return `EMP-${String(biggestId + 1).padStart(4, '0')}`
}

export const validateEmployeeForm = ({ formData, employees, editingEmployeeId }) => {
  const errors = {}
  const salaryValue = Number(formData.salary)
  const phoneDigits = getPhoneDigits(formData.phone)
  const accountDigits = getDigitsOnly(formData.accountNumber)
  const emailPattern = /^\S+@\S+\.\S+$/
  const emailValid = emailPattern.test(formData.email)
  const workEmailValid = emailPattern.test(formData.workEmail)
  const ifscValid = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode.trim().toUpperCase())
  const isDuplicateId = employees.some(
    (employee) =>
      employee.id.toLowerCase() === formData.id.trim().toLowerCase() &&
      employee.id !== editingEmployeeId,
  )

  if (!formData.id.trim()) errors.id = 'Employee ID is required.'
  if (isDuplicateId) errors.id = 'Employee ID already exists.'
  if (!editingEmployeeId && !formData.profileImage) {
    errors.profileImage = 'Profile image is required.'
  }
  if (!formData.name.trim()) errors.name = 'Full name is required.'
  if (!emailValid) errors.email = 'Enter a valid email address.'
  if (!workEmailValid) errors.workEmail = 'Enter a valid work email address.'
  if (!formData.workPassword.trim()) errors.workPassword = 'Work password is required.'
  if (phoneDigits.length !== 10) errors.phone = 'Phone number must be exactly 10 digits.'
  if (!formData.department.trim()) errors.department = 'Department is required.'
  if (!formData.designation.trim()) errors.designation = 'Designation is required.'
  if (!salaryValue || salaryValue <= 0) errors.salary = 'Enter a valid salary.'
  if (!formData.salaryPeriod) errors.salaryPeriod = 'Select a salary period.'
  if (!formData.salaryMonth) errors.salaryMonth = 'Select a salary month.'
  if (!formData.joiningDate) errors.joiningDate = 'Joining date is required.'
  if (!editingEmployeeId && isPastDate(formData.joiningDate)) {
    errors.joiningDate = 'Joining date cannot be in the past.'
  }
  if (!formData.bankName.trim()) errors.bankName = 'Bank name is required.'
  if (accountDigits.length < 9 || accountDigits.length > 18) {
    errors.accountNumber = 'Account number must be 9 to 18 digits.'
  }
  if (!ifscValid) errors.ifscCode = 'Enter a valid IFSC code.'

  return errors;
}

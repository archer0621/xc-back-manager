export interface barCharts {
  totalMoney: number,
  date: Date
}

export interface lineCharts {
  money: number,
  date: Date
}

export interface pieCharts {
  name: string,
  count: number
}

export interface timeLogType {
  description: string,
  createTime: Date
}

export interface ratioType {
  title: string,
  date: Date,
  rate: number,
  flag: boolean,
  color: string
}
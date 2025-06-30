export interface MonthlyReport {
	_id: string;
	userId: string;
	month: number;
	year: number;
	income: number;
	expense: number;
	balance: number;
	createdAt: Date;
	updatedAt: Date;
}

export interface CreateMonthlyReport {
	userId: string;
	month: number;
	year: number;
	income: number;
	expense: number;
	balance: number;
}

export class BilingualError extends Error {
	constructor(
    public code: number,
    public message: string,
    public details: {
      [key: string]: unknown;
    },
	) {
		super(message);
	}
	toString() {
		return this.message;
	}
	toJSON() {
		return {
			code: this.code,
			message: this.message,
			details: this.details,
		};
	}
}

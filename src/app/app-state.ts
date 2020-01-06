export class STATE {
    private static ARGS: any;

    public static setArgs(args: any): void {
        this.ARGS = args;
    }

    public static getArgs(): any {
        const args = this.ARGS;
        this.ARGS = undefined;
        return args;
    }
}

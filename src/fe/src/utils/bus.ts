class _EventBus {
    private readonly bus: Record<string, ((params: unknown[]) => void)[]>;

    constructor() {
        this.bus = {};
    }

    unsubscribe(id: string) {
        this.bus[id] = [];
    }

    subscribe(id: string, callback: (...params: unknown[]) => void) {
        if (!this.bus[id]){
            this.bus[id] = []
        }

        this.bus[id].push(callback);
    }

    emit(id: string, ...params: unknown[]) {
        if(this.bus[id])
            { // @ts-ignore
                this.bus[id].forEach(f => f(...params));
            }
    }
}

export const bus = new _EventBus();

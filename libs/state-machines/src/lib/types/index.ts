export interface StateTransition<TStatus, TEvent, TRole> {
  allowedEvents: TEvent[];
  nextStatus: TStatus;
  condition?: (status: TStatus, role: TRole, amount: number, maxAmountForReview: number) => boolean;
}

// Ensure TStatus can be used as an index using keyof
export type StateTransitions<TStatus extends string | number, TEvent, TRole> = {
  [K in TStatus]: StateTransition<TStatus, TEvent, TRole>[];
};

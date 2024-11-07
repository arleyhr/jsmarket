import { StateTransitions } from "../types";

export function handleStateTransition<TStatus extends string | number, TEvent, TRole>(
  stateMachine: StateTransitions<TStatus, TEvent, TRole>,
  status: TStatus,
  event: TEvent,
  role: TRole,
  amount: number,
  maxAmountForReview: number,
): TStatus {
  // current status and possible transitions
  const possibleTransitions = stateMachine[status];

  // find transition that matches the event and condition
  const transition = possibleTransitions.find(
    t => t.allowedEvents.includes(event) && (!t.condition || t.condition(status, role, amount, maxAmountForReview))
  );

  // if no transition is found, throw an error
  if (!transition) {
    throw new Error(`Transition not allowed from ${String(status)} with event ${String(event)}`);
  }

  const nextStatus = transition.nextStatus;

  // if the transition does not produce changes in the status, throw an error
  if (nextStatus === status) {
    throw new Error('Transition does not produce changes in the status');
  }

  return nextStatus;
}

import { Address } from "./Address"
import { PatternProblem } from "./PatternProblem"

export type Problem = {
    id: number,
    PatternProblem: PatternProblem,
    startDate: string,
    endDate: string,
    Address: Address[],
}
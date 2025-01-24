import { Address } from "./Address"

export type User = {
    id: number,
    name: string,
    password: string,
    mail: string,
    address: Address,
}
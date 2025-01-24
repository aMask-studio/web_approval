import { User } from "./User"

export type Appeal = {
    id: number,
    title: string,
    description: string,
    createDate: string,
    answer?: string | undefined,
    owner?: User | undefined,

    adminOnClick?: Function
}
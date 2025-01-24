export type News = {
    id: number,
    title: string | undefined,
    description: string
    date: Date,

    onClick?: Function | undefined,
}
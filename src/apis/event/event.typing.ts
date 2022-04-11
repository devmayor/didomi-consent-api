import { ConsentType } from "../users/user.typing";

type User = {
    id: string
}
export type EventType = {
    user: User;
    consents: ConsentType[]
}
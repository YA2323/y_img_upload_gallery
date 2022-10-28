import {Tag} from "./Tag";

export type Image = {
    id: string
    publicId: string
    url: string
    name: string
    type: string
    tags: Array<Tag>
}

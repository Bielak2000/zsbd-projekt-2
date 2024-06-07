import { ObjectId } from 'mongodb';

export const objectIdOrNumber = (id: string): any => {
    if (/^\d+$/.test(id)) return +id;

    return new ObjectId(id);
};

import { v4 as uuidv4 } from 'uuid';

const generateId = () => {
    // return Math.random().toString(16).slice(2)
    return uuidv4();
}

export default generateId
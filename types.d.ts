import { Firestore } from "@firebase/firestore";

interface Message {
    text: string;
    createAt: Firestore.Timestamp;
    user: {
        _id: string;
        name: string;
        avatar: string;
    }
}
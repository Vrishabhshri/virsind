import {
    doc, serverTimestamp, setDoc
} from 'firebase/firestore';
import { db } from './firebase';

export type Connection = {

    connectionID: string;
    text: string;
    instagram?: string;
    createdAt: string;

}

export const connectionRef = (connectionID: string) => doc(db, 'connections', connectionID);

export async function createConnection(connectionID: string, connection: Connection) {

    console.log("Tried uploading")
    await setDoc(connectionRef(connectionID), {...connection, createdAtTs: serverTimestamp() });

}
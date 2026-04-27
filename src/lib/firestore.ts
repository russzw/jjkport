import { doc, getDoc, setDoc, onSnapshot, collection, addDoc, query, orderBy, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { PortfolioData, ContactMessage } from '../types/portfolio';

const DOC_REF = doc(db, 'portfolio', 'data');

/** Load portfolio data once from Firestore. Returns null if no document exists yet. */
export async function loadPortfolioData(): Promise<PortfolioData | null> {
  const snap = await getDoc(DOC_REF);
  if (snap.exists()) {
    return snap.data() as PortfolioData;
  }
  return null;
}

/** Save/overwrite portfolio data to Firestore. */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  await setDoc(DOC_REF, data);
}

/** Subscribe to real-time changes. Returns the unsubscribe function. */
export function subscribeToPortfolioData(
  callback: (data: PortfolioData) => void
): () => void {
  return onSnapshot(DOC_REF, (snap) => {
    if (snap.exists()) {
      callback(snap.data() as PortfolioData);
    }
  });
}

// ==========================================
// CONTACT MESSAGES
// ==========================================

const MESSAGES_REF = collection(db, 'messages');

export async function saveMessage(message: Omit<ContactMessage, 'id'>): Promise<void> {
  await addDoc(MESSAGES_REF, message);
}

export function subscribeToMessages(callback: (messages: ContactMessage[]) => void): () => void {
  const q = query(MESSAGES_REF, orderBy('createdAt', 'desc'));
  return onSnapshot(q, (snap) => {
    const msgs: ContactMessage[] = [];
    snap.forEach(d => {
      msgs.push({ id: d.id, ...d.data() } as ContactMessage);
    });
    callback(msgs);
  });
}

export async function markMessageRead(id: string): Promise<void> {
  const docRef = doc(db, 'messages', id);
  await updateDoc(docRef, { read: true });
}

export async function deleteMessage(id: string): Promise<void> {
  const docRef = doc(db, 'messages', id);
  await deleteDoc(docRef);
}

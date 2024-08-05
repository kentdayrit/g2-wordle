import { ref, get, set } from 'firebase/database';
import { database } from '../config/firebase';

export const createUser = async (userId, username, score) => {
  try {
    const userRef = ref(database, `/g2/users/${userId}`);
    await set(userRef, { 
      'username': username,
      'score': score
    });

  } catch (err) {
    console.error('Error creating user:', err);
  }
};

export const getUsers = async (limit = 5) => {
  try {
      const userRef = ref(database, `/g2/users`);
      const snapshot = await get(userRef);
      const data = snapshot.val() || {};
      const sortedUsers = Object.values(data).sort((user1, user2) => user2.score - user1.score);
      const users = sortedUsers.slice(0, limit);
      const lastKey = snapshot.val() ? Object.keys(users).pop() : null;
      return { users, lastKey }; 
  } catch (err) {
    console.error('Error creating user:', err);
  }
};    

export const getUsersById = async (userId) => {
  try {
  const userRef = ref(database, `/g2/users/${userId}`);
  const snapshot = await get(userRef);
  const data = snapshot.val();

  return { data }; 
  
  } catch (err) {
    console.error('Error creating user:', err);
    
  }
};

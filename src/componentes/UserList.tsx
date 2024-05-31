import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { db } from './firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const UserList = styled.ul`
  list-style: none;
  padding: 0;
`;

const UserItem = styled.li`
  padding: 10px;
  border-bottom: 1px solid #ccc;
`;

interface User {
  id: string;
  name: string;
  email: string;
  gender: string;
}

const UserListComponent: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Ajuste a consulta conforme necessário
        const q = query(collection(db, "users"), where("gender", "==", "female"));
        const querySnapshot = await getDocs(q);
        const usersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as User[];
        setUsers(usersData);
      } catch (error) {
        console.error("Error fetching users: ", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <Container>
      <Title>Lista de Usuários</Title>
      <UserList>
        {users.map(user => (
          <UserItem key={user.id}>
            <p>Nome: {user.name}</p>
            <p>Email: {user.email}</p>
            <p>Sexo: {user.gender}</p>
          </UserItem>
        ))}
      </UserList>
    </Container>
  );
};

export default UserListComponent;

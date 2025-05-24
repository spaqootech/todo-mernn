import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  TouchableOpacity
} from 'react-native';
import axios from 'axios';

interface Todo {
  _id: string;
  title: string;
  completed: boolean;
}

export default function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [title, setTitle] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');

  const API_URL = 'http://192.168.0.114:5000/api/todos'; // Change to match your server IP/port

  const loadTodos = async () => {
    try {
      const res = await axios.get<Todo[]>(API_URL);
      setTodos(res.data);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
  };

  const handleAdd = async () => {
    if (!title.trim()) return;
    await axios.post(API_URL, { title });
    setTitle('');
    loadTodos();
  };

  const handleToggle = async (id: string, completed: boolean) => {
    await axios.put(`${API_URL}/${id}`, { completed });
    loadTodos();
  };

  const handleDelete = async (id: string) => {
    await axios.delete(`${API_URL}/${id}`);
    loadTodos();
  };

  const handleEdit = (id: string, currentTitle: string) => {
    setEditingId(id);
    setEditingTitle(currentTitle);
  };

  const handleUpdate = async (id: string) => {
    if (!editingTitle.trim()) return;
    await axios.put(`${API_URL}/${id}`, { title: editingTitle });
    setEditingId(null);
    setEditingTitle('');
    loadTodos();
  };

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My To-Do List</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter task"
        value={title}
        onChangeText={setTitle}
      />
      <Button title="Add Task" onPress={handleAdd} />

      <FlatList
        data={todos}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <View style={styles.todoItem}>
            <TouchableOpacity onPress={() => handleToggle(item._id, !item.completed)}>
              {editingId === item._id ? (
                <TextInput
                  value={editingTitle}
                  onChangeText={setEditingTitle}
                  style={[styles.input, { flex: 1, marginBottom: 0 }]}
                />
              ) : (
                <Text style={[styles.todoText, item.completed && styles.completed]}>
                  {item.title}
                </Text>
              )}
            </TouchableOpacity>

            <View style={{ flexDirection: 'row' }}>
              {editingId === item._id ? (
                <Button title="Save" onPress={() => handleUpdate(item._id)} />
              ) : (
                <Button title="Edit" onPress={() => handleEdit(item._id, item.title)} />
              )}
              <Button title="Delete" onPress={() => handleDelete(item._id)} />
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  todoItem: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todoText: {
    fontSize: 18,
    maxWidth: 150,
  },
  completed: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
});

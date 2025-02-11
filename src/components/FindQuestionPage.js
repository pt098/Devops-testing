import React, { useEffect, useState } from 'react';
import { Card, Button, Input, Dropdown } from 'semantic-ui-react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from './firebase'; // Import Firebase db
import './FindQuestion.css';

const FindQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filter, setFilter] = useState({ title: '', tag: '', date: '' });

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const questionList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setQuestions(questionList);
      setFilteredQuestions(questionList);
    };

    fetchQuestions();
  }, []);

  useEffect(() => {
    let filtered = questions;
    if (filter.title) {
      filtered = filtered.filter((q) => q.title.toLowerCase().includes(filter.title.toLowerCase()));
    }
    if (filter.tag) {
      filtered = filtered.filter((q) => q.tags.includes(filter.tag));
    }
    if (filter.date) {
      filtered = filtered.filter((q) => new Date(q.createdAt).toLocaleDateString() === new Date(filter.date).toLocaleDateString());
    }
    setFilteredQuestions(filtered);
  }, [filter, questions]);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'questions', id));
    setFilteredQuestions(filteredQuestions.filter((q) => q.id !== id));
  };

  const handleFilterChange = (e, { name, value }) => {
    setFilter({ ...filter, [name]: value });
  };

  const tagOptions = [
    ...new Set(
      questions.flatMap(q => (Array.isArray(q.tags) ? q.tags : q.tags.split(',')))
    )
  ].map(tag => ({ text: tag.trim(), value: tag.trim() }));

  return (
    <div className="find-question-container">
      <h2>Find Questions</h2>
      <Input
        placeholder="Search by Title..."
        name="title"
        onChange={handleFilterChange}
        className="filter-input"
      />
      <Dropdown
        placeholder="Filter by Tag"
        selection
        options={tagOptions}
        name="tag"
        onChange={handleFilterChange}
        className="filter-dropdown"
      />
      <Input
        type="date"
        name="date"
        onChange={handleFilterChange}
        className="filter-input"
      />
      <Card.Group>
        {filteredQuestions.map((question) => (
          <Card key={question.id}>
            <Card.Content>
              <Card.Header>{question.title}</Card.Header>
              <Card.Meta>{new Date(question.createdAt).toLocaleDateString()}</Card.Meta>
              <Card.Description>{question.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Button onClick={() => handleDelete(question.id)} color="red">
                Delete
              </Button>
            </Card.Content>
          </Card>
        ))}
      </Card.Group>
    </div>
  );
};

export default FindQuestion;

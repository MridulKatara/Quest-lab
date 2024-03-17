import React, { useEffect, useState } from 'react';
import { DragDropContext} from 'react-beautiful-dnd';
import { Flex } from '@chakra-ui/react';
import Column from './components/list';
import AddCardModal from './components/newcard';

const initialData = {
  todo: [
    { id: '1', content: 'Project 1', description: '', comments: [] },
  ],
  inProgress: [
    { id: '2', content: 'Project 2', description: '', comments: [] },
  ],
  review: [
    { id: '3', content: 'Project 3', description: '', comments: [] },
  ],
  done: [
    { id: '4', content: 'Project 4', description: '', comments: [] },
  ],
};

const App = () => {
  const [data, setData] = useState(() => {
    const savedData = localStorage.getItem('data');
    return savedData ? JSON.parse(savedData) : initialData;
  });

  useEffect(() => {
    localStorage.setItem('data', JSON.stringify(data));
  }, [data]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');
  const [currentlist, setCurrentlist] = useState('');

  const openModal = (column) => {
    setCurrentlist(column);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setName('');
    setNewCardDescription('');
    setIsModalOpen(false);
  };

  const handleAddCard = () => {
    const newCard = {
      id: String(Date.now()),
      content: name,
      description: newCardDescription,
      comments: [],
    };
    setData((prevData) => ({
      ...prevData,
      [currentlist]: [...prevData[currentlist], newCard],
    }));
    closeModal();
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const start = data[source.droppableId];
    const finish = data[destination.droppableId];

    const newData = {
      ...data,
      [source.droppableId]: start.filter((_, index) => index !== source.index),
      [destination.droppableId]: [
        ...finish.slice(0, destination.index),
        start.find((task) => task.id === draggableId),
        ...finish.slice(destination.index),
      ],
    };
    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Flex>
        {Object.keys(data).map((key) => (
          <Column key={key} column={key} tasks={data[key]} openModal={openModal} />
        ))}
      </Flex>
      <AddCardModal
        isOpen={isModalOpen}
        onClose={closeModal}
        currentlist={currentlist}
        name={name}
        newCardDescription={newCardDescription}
        setName={setName}
        setNewCardDescription={setNewCardDescription}
        handleAddCard={handleAddCard}
      />
    </DragDropContext>
  );
};

export default App;

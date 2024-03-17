import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Box, Icon, IconButton, Tooltip, Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody } from '@chakra-ui/react';
import { FaBars, FaComment } from 'react-icons/fa';

const Card = ({ task, index }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [comment, setComment] = useState('');

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSave = () => {
    // Handle saving the comment here
    console.log('Comment saved:', comment);
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          p={4}
          bg="white"
          boxShadow="sm"
          mb={4}
          position="relative"
          minWidth={200}
          minHeight={100}
        >
          {/* Hamburger icon */}
          <Tooltip label="Description">
            <IconButton
              icon={<Icon as={FaBars} />}
              aria-label="Description"
              position="absolute"
              left={2}
              bottom={2}
              onClick={toggleDescription}
            />
          </Tooltip>

          {/* Comment icon */}
          <Tooltip label="Add Comment">
            <IconButton
              icon={<Icon as={FaComment} />}
              aria-label="Add Comment"
              position="absolute"
              right={2}
              bottom={2}
              onClick={toggleDescription}
            />
          </Tooltip>

          {/* Description popover */}
          <Popover isOpen={showDescription} onClose={toggleDescription}>
            <PopoverTrigger>
              <Box display="none" />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Description</PopoverHeader>
              <PopoverBody>
                {task.description || 'No description available'}
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {/* Comment popover */}
          <Popover isOpen={showDescription} onClose={toggleDescription}>
            <PopoverTrigger>
              <Box display="none" />
            </PopoverTrigger>
            <PopoverContent>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverHeader>Comments</PopoverHeader>
              <PopoverBody>
                <textarea
                  value={comment}
                  onChange={handleCommentChange}
                  rows={4}
                  cols={30}
                  placeholder="Add your comment..."
                  style={{ width: '100%' }}
                />
                <button onClick={handleCommentSave}>Save</button>
              </PopoverBody>
            </PopoverContent>
          </Popover>

          {task.content}
        </Box>
      )}
    </Draggable>
  );
};

export default Card;

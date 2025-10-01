// 代码生成时间: 2025-10-02 01:58:51
 * Includes error handling, documentation, and adherence to TypeScript best practices for maintainability and scalability.
 */

import { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';

// Interface for the item that can be dragged and dropped
interface DraggableItem {
  id: string;
  content: string;
}

// DragAndDrop component that manages the state and rendering of draggable items
const DragAndDrop: React.FC = () => {
  const [items, setItems] = useState<DraggableItem[]>([{
    id: uuidv4(),
    content: 'Item 1',
  }, {
    id: uuidv4(),
    content: 'Item 2',
  }, {
    id: uuidv4(),
    content: 'Item 3',
  }]);

  // Function to handle the onDragEnd event
  const onDragEnd = (result) => {
    // Check if the destination is valid
    if (!result.destination) {
      return; // No changes if destination is not valid
    }

    // Perform the reordering of items
    const newItems = Array.from(items);
    const [removed] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, removed);
    setItems(newItems);
  };

  // Render the draggable items
  return (
    <Droppable droppableId="items-list">
      {(provided) => (
        <div {...provided.droppableProps} ref={provided.innerRef}>
          {items.map((item, index) => (
            <Draggable
              key={item.id}
              draggableId={item.id}
              index={index}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  {item.content}
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

// Export the DragAndDrop component
export default DragAndDrop;
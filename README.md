# taskboard
### Configurable Kanban board with react-beautiful-dnd.


Example: A complex board with Swimlanes and nested columns:
![image](https://user-images.githubusercontent.com/2856350/44791251-7ec93500-aba1-11e8-9b46-824ce6ad3c94.png)

# Features:
- The board layout is defined in a JSON config object.
- Supports columns, column groups and Swimlanes.
- Supports conditoinal drop, based on a property in the config object.
- Simple (inspired by Redux) state management and mocked data model.

# Features to come:
## Should:
- WIP configuration and display.
- Implement (context sensitive) cards in both board and detail view.
- Include extendible 'New card' form.
- Proper data management including data API communication.

## Could
- Trello-like cards.
- Tags, ownership etc. and filters on them.
- ???

# How to ue
The configuration file is a JSON object and lives in src/boardlayout.js
- Swimlanes array (heigth not yet implemented)
- Columns object supproting a nested structure for columns groups.
-- allowedDragToColumns is an array of column ids that tasks in this column can be dragged to.
-- ColumnOrder is an array of column ids and specifies the order in witch the columns will be rendered.
- There is currently no server communication implemented. Board layout only...




### Please let me know if you use this code for your own board implementation.
### And please share :-)

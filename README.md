# Demo

## Prerequisites

- Hasura cli - `npm install --global hasura-cli@^1.3.3` (or just use the dev local one)
- Docker compose

## Steps

### Init new 

1. Go to `backend` folder and start docker-compose - `docker-compose up`
2. Init hasura - `hasura init <name>`
3. Start console - `cd <name> && hasura console`
4. Start gui - `yarn start dev`

### Use existing

1. `hasura migrate apply`
2. `hasura metadata apply`


### Presentation plan

1. Show TODO app
2. Start Hasura
3. Talk about and show GraphQL and Hasura
4. Implement the TODO backend with Hasura
5. Show ChatWindow example
6. Implement the ChatWindow backend with Hasura
7. Show the Strategy game example with pre-implemented backend
8. Maybe show a postgres function or view in use in the game?

# TODO

## Editor

- GUI elements: Add Top bar and Scene view
- Implemnt Editor "simulator" based on GameSimulator
  - localGameStateReducer -> localEditorStateReducer

Make nodes and edges constext reusable

Attempt 2:
- Turn th

Attempt 1:
- Split out nodesLookup and edgeLookup from LocalGameState
- Split the same from GameContext
- Adapt uses of the context in the game components
- Add MapStateContext
- Add MapState context to editor
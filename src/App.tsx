import React from 'react';
import './App.css';
import Button from '@material-ui/core/Button';

import { AppState } from './store'
import { SystemState } from './store/system/types'
import { updateSession } from './store/system/actions'
import { ChatState } from './store/chat/types'
import { sendMessage } from './store/chat/actions'

const mapStateToProps = (state: AppState) => ({
  system: state.system,
  chat: state.chat
});

interface AppProps {
  sendMessage: typeof sendMessage
  updateSession: typeof updateSession
  chat: ChatState
  system: SystemState
}

const App: React.FC = () => {
  return (
      <Button variant="contained" color="primary">
        Hola Mundo!
      </Button>
  );
};

export default App;

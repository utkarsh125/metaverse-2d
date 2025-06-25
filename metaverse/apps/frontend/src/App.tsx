import CanvasSpace from './components/CanvasSpace';
import React from 'react';

function App() {
  // hard-code for now (you’ll swap these out once you have real spaceIds + tokens)
  const dummySpaceId = 'cmc38rli8000ivl3ocmx8j76f'
  const jwtToken     = '123kasdk123'

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <CanvasSpace
        spaceId={dummySpaceId}
        token={jwtToken}
        wsUrl="ws://localhost:3001"
      />
    </div>
  );
}

export default App;

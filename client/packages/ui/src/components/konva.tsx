import { Stage, Layer } from 'react-konva';

const TypedStage: React.FC<React.ComponentProps<typeof Stage>> = (props) => (
  <Stage {...props} />
);
const TypedLayer: React.FC<React.ComponentProps<typeof Layer>> = (props) => (
  <Layer {...props} />
);

export const App = () => (
  <TypedStage width={500} height={500}>
    <TypedLayer />
  </TypedStage>
);

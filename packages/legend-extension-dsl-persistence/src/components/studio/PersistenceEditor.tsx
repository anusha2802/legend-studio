import { observer } from 'mobx-react-lite';
import {
  LEGEND_STUDIO_TEST_ID,
  MappingEditorState,
  useEditorStore,
} from '@finos/legend-studio';
import {
  ContextMenu,
  ResizablePanel,
  ResizablePanelGroup,
  ResizablePanelSplitter,
  ResizablePanelSplitterLine,
} from '@finos/legend-art';
import { PersistenceEditorState } from '../PersistenceEditorState';

export const PersistenceEditor = observer(() => {
  const editorStore = useEditorStore();
  const persistenceEditorState = editorStore.getCurrentEditorState(
    PersistenceEditorState,
  );
  //const persistence = persistenceEditorState.persistence;
  //const isReadOnly = persistenceEditorState.isReadOnly;

  return (
    <div className="persistence-editor">
      <button
        type="button"
        className="persistence-editor"
        tabIndex={0}
        onClick={() => alert('hello')}
        title="Hello"
      >
        Hello
      </button>
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel size={300} minSize={300}>
          <div className="persistence-editor__side-bar">
            <ResizablePanelGroup orientation="horizontal">
              <ResizablePanel size={400} minSize={28}></ResizablePanel>
              <button
                type="button"
                className="persistence-editor2"
                tabIndex={1}
                onClick={() => alert('hello')}
                title="Hello2"
              >
                Hello2
              </button>
              <ResizablePanelSplitter>
                <ResizablePanelSplitterLine color="var(--color-light-grey-400)" />
              </ResizablePanelSplitter>
              <ResizablePanel minSize={36}></ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
        <ResizablePanelSplitter />
      </ResizablePanelGroup>
    </div>
  );
});

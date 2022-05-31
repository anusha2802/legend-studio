import { observer } from 'mobx-react-lite';
import { LEGEND_STUDIO_TEST_ID, useEditorStore } from '@finos/legend-studio';
import {
  ContextMenu,
  ResizablePanel,
  ResizablePanelGroup,
  ResizablePanelSplitter,
  ResizablePanelSplitterLine,
} from '@finos/legend-art';
// eslint-disable-next-line @finos/legend-studio/no-cross-workspace-non-export-usage
import { MappingExplorer } from '@finos/legend-studio/lib/components/editor/edit-panel/mapping-editor/MappingExplorer';
// eslint-disable-next-line @finos/legend-studio/no-cross-workspace-non-export-usage
import { MappingTestsExplorer } from '@finos/legend-studio/lib/components/editor/edit-panel/mapping-editor/MappingTestsExplorer';
import { PersistenceEditorState } from '../PersistenceEditorState';

export const PersistenceEditor = observer(() => {
  const editorStore = useEditorStore();
  const persistenceEditorState = editorStore.getCurrentEditorState(
    PersistenceEditorState,
  );
  const persistence = persistenceEditorState.persistence;
  const isReadOnly = persistenceEditorState.isReadOnly;

  return (
    <div className="persistence-editor">
      <button
        className="persistence-editor"
        tabIndex={-1}
        onClick={() => alert('hello')}
        title="Hello"
      />
      <ResizablePanelGroup orientation="vertical">
        <ResizablePanel size={300} minSize={300}>
          <div className="mapping-editor__side-bar">
            <ResizablePanelGroup orientation="horizontal">
              <ResizablePanel size={400} minSize={28}>
                <MappingExplorer isReadOnly={isReadOnly} />
              </ResizablePanel>
              <ResizablePanelSplitter>
                <ResizablePanelSplitterLine color="var(--color-light-grey-400)" />
              </ResizablePanelSplitter>
              <ResizablePanel minSize={36}>
                <MappingTestsExplorer isReadOnly={isReadOnly} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        </ResizablePanel>
        <ResizablePanelSplitter />
        <ResizablePanel>
          <div className="panel">
            <ContextMenu
              className="panel__header mapping-editor__header"
              disabled={true}
            >
              <div
                data-testid={LEGEND_STUDIO_TEST_ID.EDITOR__TABS__HEADER}
                className="mapping-editor__header__tabs"
              />
              <button
                className="persistence-editor__header__tab__element__name"
                tabIndex={-1}
                onClick={() => alert('hello')}
                title="Abc"
              />
              )
            </ContextMenu>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
});

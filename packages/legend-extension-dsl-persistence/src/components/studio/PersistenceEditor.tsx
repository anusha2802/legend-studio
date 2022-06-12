import { observer } from 'mobx-react-lite';
import { useEditorStore } from '@finos/legend-studio';
import { PlayIcon, RefreshIcon } from '@finos/legend-art';
import { PersistenceEditorState } from '../PersistenceEditorState';
import { useApplicationStore } from '@finos/legend-application';
import { flowResult } from 'mobx';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { createContext, useContext } from 'react';
import { guaranteeNonNullable } from '@finos/legend-shared';
import type { PersistenceStore } from './PersistenceStore';

const StringEditor = observer(
  (props: {
    propertyName: string;
    description?: string;
    value: string | undefined;
    isReadOnly: boolean;
    update: (value: string | undefined) => void;
  }) => {
    const { value, propertyName, description, isReadOnly, update } = props;
    const displayValue = value ?? '';
    const changeValue: React.ChangeEventHandler<HTMLInputElement> = (event) => {
      const stringValue = event.target.value;
      const updatedValue = stringValue ? stringValue : undefined;
      update(updatedValue);
    };
    return (
      <div className="panel__content__form__section">
        <div className="panel__content__form__section__header__label">
          {propertyName}
        </div>
        <div className="panel__content__form__section__header__prompt">
          {description}
        </div>
        <input
          className="panel__content__form__section__input"
          spellCheck={false}
          disabled={isReadOnly}
          value={displayValue}
          placeholder={`${propertyName}`}
          onChange={changeValue}
        />
      </div>
    );
  },
);

const PersistenceStoreContext = createContext<PersistenceStore | undefined>(
  undefined,
);

export const usePersistenceStore = (): PersistenceStore =>
  guaranteeNonNullable(
    useContext(PersistenceStoreContext),
    `Can't find editor store in context`,
  );

export const PersistenceEditor = observer(() => {
  const applicationStore = useApplicationStore();
  const editorStore = useEditorStore();
  /*
  const persistenceStore = usePersistenceStore();
  const persistenceEditorState = persistenceStore.getCurrentEditorState(
    PersistenceEditorState,
  );
   */

  const persistenceEditorState = editorStore.getCurrentEditorState(
    PersistenceEditorState,
  );

  const trigger = (): void => {
    flowResult(persistenceEditorState.persistenceTrigger()).catch(
      applicationStore.alertUnhandledError,
    );
  };

  const monitor = (): void => {
    flowResult(persistenceEditorState.persistenceMonitor()).catch(
      applicationStore.alertUnhandledError,
    );
  };

  return (
    <div className="persistence-buttons">
      <div>
        Trigger Pipeline &nbsp;
        <button
          type="button"
          className="persistence-trigger"
          tabIndex={1}
          onClick={trigger}
          title="Trigger"
        >
          <PlayIcon style={{ color: 'white', fontSize: '1.6rem' }} />
        </button>
        <StringEditor
          isReadOnly={true}
          propertyName={''}
          value={persistenceEditorState.helloNew}
          update={(value: string | undefined): void => persistenceEditorState.setTriggerName(value)}
        />
      </div>
      <br />
      <br />
      <div>
        Refresh Pipelines &nbsp;
        <button
          className="persistence-refresh"
          tabIndex={-1}
          title="Refresh"
          onClick={monitor}
        >
          <RefreshIcon style={{ color: 'white', fontSize: '1.6rem' }} />
        </button>
      </div>
      <br />
      <div className="persistence-table">
        <table className="table">
          <thead>
            <tr>
              <th>Started On</th>
              <th>Completed On</th>
              <th>Job State</th>
              <th>Exception (if any)</th>
            </tr>
          </thead>
          <tbody>
			{persistenceEditorState?.currentMonitor?.map(item => {
				  return (
					<tr key={ item.startedOn + item.completedOn }>
					  <td>{ item.startedOn }</td>
					  <td>{ item.completedOn }</td>
					  <td>{ item.jobState }</td>
					  <td>{ item.exception }</td>
					</tr>
				  );
				})}
          </tbody>
        </table>
      </div>
    </div>
  );
});

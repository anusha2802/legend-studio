/**
 * Copyright (c) 2020-present, Goldman Sachs
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useState } from 'react';
import {
  clsx,
  Dialog,
  DropdownMenu,
  MenuContent,
  MenuContentItem,
  InfoCircleIcon,
  TimesIcon,
  BarsIcon,
} from '@finos/legend-art';
import { useApplicationStore } from '@finos/legend-application';
import type { LegendStudioConfig } from '../../../application/LegendStudioConfig';

const AboutModal: React.FC<{
  open: boolean;
  closeModal: () => void;
}> = (props) => {
  const { open, closeModal } = props;
  const applicationStore = useApplicationStore<LegendStudioConfig>();
  const config = applicationStore.config;

  return (
    <Dialog onClose={closeModal} open={open}>
      <div className="modal modal--dark about-modal">
        <div className="modal__header">
          <div className="modal__title">
            <div className="modal__title__icon">
              <InfoCircleIcon />
            </div>
            <div className="modal__title__label">About</div>
          </div>
          <div className="modal__header__actions">
            <button
              className="modal__header__action"
              tabIndex={-1}
              onClick={closeModal}
            >
              <TimesIcon />
            </button>
          </div>
        </div>
        <div className="modal__body">
          <div className="about-modal__info-entry">
            <div className="about-modal__info-entry__title">Version:</div>
            <div className="about-modal__info-entry__value">
              {config.appVersion}
            </div>
          </div>
          <div className="about-modal__info-entry">
            <div className="about-modal__info-entry__title">Build Time:</div>
            <div className="about-modal__info-entry__value">
              {config.appVersionBuildTime}
            </div>
          </div>
          <div className="about-modal__info-entry">
            <div className="about-modal__info-entry__title">Commit ID:</div>
            <div className="about-modal__info-entry__value">
              {config.appVersionCommitId}
            </div>
          </div>
          <div className="about-modal__info-entry">
            <div className="about-modal__info-entry__title">SDLC Server:</div>
            <div className="about-modal__info-entry__value">
              <a
                href={config.sdlcServerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {config.sdlcServerUrl}
              </a>
            </div>
          </div>
          <div className="about-modal__info-entry">
            <div className="about-modal__info-entry__title">
              Execution Server:
            </div>
            <div className="about-modal__info-entry__value">
              <a
                href={config.engineServerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {config.engineServerUrl}
              </a>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export const LegendStudioAppHeaderMenu: React.FC = () => {
  const applicationStore = useApplicationStore<LegendStudioConfig>();
  const appDocUrl = applicationStore.docRegistry.url;

  // menu
  const [openMenuDropdown, setOpenMenuDropdown] = useState(false);
  const showMenuDropdown = (): void => setOpenMenuDropdown(true);
  const hideMenuDropdown = (): void => setOpenMenuDropdown(false);
  // about modal
  const [openAboutModal, setOpenAboutModal] = useState(false);
  const showAboutModal = (): void => setOpenAboutModal(true);
  const hideAboutModal = (): void => setOpenAboutModal(false);
  // documentation
  const goToDocumentation = (): void => {
    if (appDocUrl) {
      applicationStore.navigator.openNewWindow(appDocUrl);
    }
  };

  return (
    <>
      <DropdownMenu
        className={clsx('app__header__action', {
          'menu__trigger--on-menu-open': openMenuDropdown,
        })}
        onClose={hideMenuDropdown}
        menuProps={{ elevation: 7 }}
        content={
          <MenuContent className="app__header__menu">
            <MenuContentItem
              className="app__header__menu__item"
              onClick={showAboutModal}
            >
              About
            </MenuContentItem>
            <MenuContentItem
              className="app__header__menu__item"
              disabled={!appDocUrl}
              onClick={goToDocumentation}
            >
              Documentation
            </MenuContentItem>
          </MenuContent>
        }
      >
        <button
          className="app__header__menu-btn"
          onClick={showMenuDropdown}
          title="Show more information about the application..."
          tabIndex={-1}
        >
          <BarsIcon />
        </button>
      </DropdownMenu>
      <AboutModal open={openAboutModal} closeModal={hideAboutModal} />
    </>
  );
};

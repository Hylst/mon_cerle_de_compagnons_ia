/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/**
 * Copyright 2024 Google LLC
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

import AgentEdit from './components/AgentEdit';
import CompanionDock from './components/CompanionDock';
import ErrorScreen from './components/demo/ErrorSreen';
import KeynoteCompanion from './components/demo/keynote-companion/KeynoteCompanion';
import Header from './components/Header';
import ThematicBackground from './components/ThematicBackground';
import UserSettings from './components/UserSettings';
import { LiveAPIProvider } from './contexts/LiveAPIContext';
import { useAgent, useUI, useAppConfig } from './lib/state';
import { useEffect } from 'react';
import { MAX_API_USES } from './lib/constants';

/**
 * Main application component that provides a streaming interface for Live API.
 * Manages video streaming state and provides controls for webcam/screen capture.
 */
function App() {
  const { showUserConfig, showAgentEdit } = useUI();
  const {
    apiKey,
    usageMode,
    usageCount,
    loadFromLocalStorage,
  } = useAppConfig();
  const { current: currentAgent } = useAgent();

  useEffect(() => {
    loadFromLocalStorage();
  }, [loadFromLocalStorage]);

  // Determine if the settings modal should be forced open.
  const isLimitedModeExhausted =
    usageMode === 'limited' && usageCount >= MAX_API_USES;
  const isUserModeWithoutKey = usageMode === 'user' && !apiKey;
  const isModeUnselected = usageMode === null;

  const forceShowUserSettings =
    isLimitedModeExhausted || isUserModeWithoutKey || isModeUnselected;

  if (forceShowUserSettings) {
    return (
      <div className="App">
        <ThematicBackground theme={currentAgent.theme} />
        <UserSettings />
      </div>
    );
  }

  return (
    <div className="App">
      <ThematicBackground theme={currentAgent.theme} />
      <LiveAPIProvider apiKey={apiKey!}>
        <ErrorScreen />
        <Header />

        {showUserConfig && <UserSettings />}
        {showAgentEdit && <AgentEdit />}
        <div className="streaming-console">
          <main>
            <div className="main-app-area">
              <KeynoteCompanion />
            </div>
            <CompanionDock />
          </main>
          <footer className="app-footer">
            <p>Propulsé par Gemini - Remixé par Geoffroy Streit</p>
          </footer>
        </div>
      </LiveAPIProvider>
    </div>
  );
}

export default App;

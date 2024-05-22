import { Route } from 'react-router';

import { IonRouterOutlet } from '@ionic/react';
import userEvent from '@testing-library/user-event';

import { APP_NAME, APP_VERSION } from '../constants';
import { act, createTestHistory, ionChange, render, safeAct, screen, waitFor } from '../test-utils';
import PlayPage from './Play';
import SettingsPage from './Settings';

describe('SettingsPage', () => {
  test('renders without crashing', async () => {
    const { baseElement } = render(<SettingsPage />);
    await safeAct();
    expect(baseElement).toBeDefined();
  });

  test('has proper texts and elements', async () => {
    render(<SettingsPage />);
    await safeAct();
    expect(screen.getByText('Settings')).toBeVisible();
    expect(screen.getByAltText(`${APP_NAME} logo`)).toBeVisible();
    expect(screen.getByText(APP_NAME)).toBeVisible();
    expect(screen.getByText(`version: ${APP_VERSION}`)).toBeVisible();
    expect(screen.getByText('Players names')).toBeVisible();
    expect(screen.getByText('Player 1')).toBeVisible();
    expect(screen.getByDisplayValue('Player 1')).toBeVisible();
    expect(screen.getByText('Player 2')).toBeVisible();
    expect(screen.getByDisplayValue('Player 2')).toBeVisible();
    expect(screen.getByText('Symbols')).toBeVisible();
    expect(screen.getByText('O')).toBeVisible();
    expect(screen.getByDisplayValue('O')).toBeVisible();
    expect(screen.getByText('X')).toBeVisible();
    expect(screen.getByDisplayValue('X')).toBeVisible();
    expect(screen.getByText('Number of Players')).toBeVisible();
    expect(screen.getByText('One Player')).toBeVisible();
    expect(screen.getByText('Two Players')).toBeVisible();
    expect(screen.getByText('Level')).toBeVisible();
    expect(screen.getByText('Easy')).toBeVisible();
    expect(screen.getByText('Medium')).toBeVisible();
    expect(screen.getByText('Hard')).toBeVisible();
    const saveButton = screen.getByText('Save', { selector: 'ion-button' });
    expect(saveButton).toBeVisible();
    expect(saveButton).toBeDisabled();
  });

  test('changes settings, saves, redirects to play page and checks updates', async () => {
    const user = userEvent.setup();
    const history = createTestHistory();
    const { container } = render(
      <IonRouterOutlet>
        <Route exact path="/play">
          <PlayPage />
        </Route>
        <Route>
          <SettingsPage />
        </Route>
      </IonRouterOutlet>,
      undefined,
      history,
    );
    await safeAct();
    await user.type(screen.getByDisplayValue('Player 1'), '{Backspace>8/}Dercilio');
    await user.type(screen.getByDisplayValue('Player 2'), '{Backspace>8/}Rodolfo');
    await user.type(screen.getByDisplayValue('O'), '{Backspace}😎');
    await user.type(screen.getByDisplayValue('X'), '{Backspace}🤓');
    const numberOfPlayersSegment = container.querySelectorAll('ion-segment')[0];
    ionChange(numberOfPlayersSegment, 'Two Players');
    await user.click(screen.getByText('Save', { selector: 'ion-button' }));
    act(() => {
      history.push('/play');
    });
    await waitFor(() => {
      expect(screen.getByText('New Game')).toBeVisible();
      expect(screen.getByDisplayValue('Dercilio')).toBeVisible();
      expect(screen.getByDisplayValue('Rodolfo')).toBeVisible();
      expect(screen.getAllByText('😎')).toHaveLength(2);
      expect(screen.getAllByText('🤓')).toHaveLength(2);
    });
  });
});

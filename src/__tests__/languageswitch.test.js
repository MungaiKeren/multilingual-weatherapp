import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Header from '../Components/Header'; 
import { I18nextProvider } from 'react-i18next';
import i18n from '../i18n'; // Corrected path to i18n instance

// Mock the entire i18next module
jest.mock('i18next', () => ({
  use: jest.fn(),
  init: jest.fn(),
  t: jest.fn(),
}));

// Define mock translations
const translations = {
  en: {
    Title: 'Weather App',
  },
  sw: {
    Title: 'Programu ya hali ya hewa',
  },
};

test('changes language when select option is changed', async () => {
  // Mock the 't' function to return translated text based on the language
  i18n.t.mockImplementation((key, { lng }) => translations[lng][key]);

render(
    <I18nextProvider i18n={i18n}>
        <Header />
    </I18nextProvider>
);

// Initial text before language change
expect(screen.getByText('Weather App')).toBeInTheDocument();

// Change language to Kiswahili
fireEvent.change(screen.getByLabelText('Change Language'), { target: { value: 'sw' } });

// Wait for translation to be loaded
const translatedText = await screen.findByText('Programu ya hali ya hewa');
expect(translatedText).toBeInTheDocument();
});

import DynamicDropDown from "./DynamicDropDown";
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import {getMetaData,getTableData} from '../../services/apiCall'



jest.mock('../../services/apiCall', () => ({
    getMetaData: jest.fn(() => Promise.resolve(['table1', 'table2', 'table3'])),
    getTableData: jest.fn(() => Promise.resolve([{ id: '1', name: 'John Doe' }])),
  }));
  






describe("DynamicDropDown component", () => {
    test('renders select element', () => {
        render(<DynamicDropDown />);
        const selectElement = screen.getByRole('combobox');
        expect(selectElement).toBeInTheDocument();
      });
    
      test('renders option elements', async () => {
        render(<DynamicDropDown />);
        const optionElement = await screen.findByText('table1');
        expect(optionElement).toBeInTheDocument();
      });

      test('select changes after option is clicked', async () => {
        render(<DynamicDropDown />);
        const selectElement = screen.getByRole('combobox');
        const optionElement = await screen.findByText('table1');
        userEvent.selectOptions(selectElement, [optionElement.value]);
        expect(selectElement.value).toBe(optionElement.value);
      });


      test('table is rendered after option is selected', async () => {
        render(<DynamicDropDown />);
        const selectElement = screen.getByRole('combobox');
        const optionElement = await screen.findByText('table1');
        userEvent.selectOptions(selectElement, [optionElement.value]);
        const tableElement = await screen.findByRole('table');
        expect(tableElement).toBeInTheDocument();
      });
    


})
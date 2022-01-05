import { render } from "@testing-library/react";
import * as reactRedux from 'react-redux';
import userEvent from '@testing-library/user-event'
import { GiveConsent } from "../GiveConsent";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

jest
  .spyOn(reactRedux, "useDispatch")
  .mockImplementation(() => jest.fn());

describe("GiveConsent", () => {
  test("renders correctly", () => {
    const { container } = render(
      <GiveConsent />
    );

    expect(container).toMatchSnapshot();
  });

  test("validates correct input", async () => {
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <GiveConsent />
    );

    await userEvent.type(getByPlaceholderText('Name'), 'John Doe', { delay: 1 });
    await userEvent.type(getByPlaceholderText('Email address'), 'john@doe.com', { delay: 1 });
    await userEvent.click(getByLabelText('Receive newsletter'), { delay: 1 });
    expect(getByText('Give consent')).not.toHaveAttribute('disabled');
  });

  test('dispatches action when Give Consent button is clicked', async () => {
    const dispatch = jest.fn();
    reactRedux.useDispatch.mockImplementation(() => dispatch);
    const { getByLabelText, getByPlaceholderText, getByText } = render(
      <GiveConsent />
    );

    await userEvent.type(getByPlaceholderText('Name'), 'John Doe', { delay: 1 });
    await userEvent.type(getByPlaceholderText('Email address'), 'john@doe.com', { delay: 1 });
    await userEvent.click(getByLabelText('Receive newsletter'), { delay: 1 });

    userEvent.click(getByText('Give consent'));
    expect(dispatch).toBeCalledTimes(1);
  });
})

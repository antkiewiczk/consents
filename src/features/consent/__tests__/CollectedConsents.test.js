import { render } from "../../../app/testUtils";
import * as reactRedux from 'react-redux';
import { CollectedConsents } from "../CollectedConsents";
import reducer from '../consentsSlice';
import { createStore } from "@reduxjs/toolkit";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockedUsedNavigate,
}));

const initialState = reducer({ consents: { ids: [1], entities: { 1: { id: 1, name: 'John Doe', email: 'some@email.com', consents: ['newsletter'] } } } }, { type: 'test/init' });

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn()
}));

describe("CollectedConsents", () => {
    beforeEach(() => {
        reactRedux.useSelector.mockImplementation(callback => {
            return callback(initialState);
        });
        reactRedux.useDispatch.mockImplementation(callback => {
            return callback({ ee: 'aa' });
        });
    });

    afterEach(() => {
        reactRedux.useSelector.mockClear();
        reactRedux.useDispatch.mockClear();
    })

    test("renders nothing when store is empty", () => {
        reactRedux.useSelector.mockImplementation(callback => {
            return callback({ consents: { ids: [], entities: {} } }, { type: 'test/init' });
        });

        const dispatch = jest.fn();
        reactRedux.useDispatch.mockImplementation(() => dispatch);
        const { container } = render(
            <CollectedConsents />
        );

        expect(container).toMatchSnapshot();
    });

    test("renders correctly", () => {
        const dispatch = jest.fn();
        reactRedux.useDispatch.mockImplementation(() => dispatch);
        const { container } = render(
            <reactRedux.Provider store={createStore(() => initialState)}>
                <CollectedConsents />
            </reactRedux.Provider>
        );

        expect(container).toMatchSnapshot();
    });

    // test("validates correct input", async () => {
    //     const { getByLabelText, getByPlaceholderText, getByText } = render(
    //         <GiveConsent />
    //     );

    //     await userEvent.type(getByPlaceholderText('Name'), 'John Doe', { delay: 1 });
    //     await userEvent.type(getByPlaceholderText('Email address'), 'john@doe.com', { delay: 1 });
    //     await userEvent.click(getByLabelText('Receive newsletter'), { delay: 1 });
    //     expect(getByText('Give consent')).not.toHaveAttribute('disabled');
    // });

    // test('dispatches action when Give Consent button is clicked', async () => {
    //     const dispatch = jest.fn();
    //     reactRedux.useDispatch.mockImplementation(() => dispatch);
    //     const { getByLabelText, getByPlaceholderText, getByText } = render(
    //         <GiveConsent />
    //     );

    //     await userEvent.type(getByPlaceholderText('Name'), 'John Doe', { delay: 1 });
    //     await userEvent.type(getByPlaceholderText('Email address'), 'john@doe.com', { delay: 1 });
    //     await userEvent.click(getByLabelText('Receive newsletter'), { delay: 1 });

    //     userEvent.click(getByText('Give consent'));
    //     expect(dispatch).toBeCalledTimes(1);
    // });
})
